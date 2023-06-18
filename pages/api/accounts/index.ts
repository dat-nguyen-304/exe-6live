// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRole } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

type Data = {
  name: string;
};

const defaultAvatarLink =
  "https://res.cloudinary.com/dngl8ihk7/image/upload/v1686238514/iucytgcnxgecsfwaj2s9.jpg";

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      //GET ALL USERS
      const users = await getAllUsers();
      return res.status(200).json(users);
    } else if (req.method === "POST") {
      if (req.body.role) {
        //Register
        const { email, name, image, role, password } = req.body;
        const isExist = await getUserByEmailPassword(email, "");
        if (!isExist) {
          if (!password) await createUserWithGoogle(email, name, image, role);
          else
            await createUserWithEmailAndPassword(email, name, role, password);
        } else return res.status(200).json({ err: 1, msg: "Email exist" });
      } else {
        //Login
        let user;
        if (req.body.email) {
          user = await getUserByEmailPassword(
            req.body.email as string,
            req.body.password as string
          );
          if (user) return res.status(200).json(user);
          else
            return res
              .status(200)
              .json({ err: 1, msg: "Wrong email or password" });
        }
      }
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function createUserWithGoogle(
    email: string,
    name: string,
    image: string,
    role: UserRole
  ) {
    const user = await prisma.account.create({
      data: { email, role },
    });
    const userWithoutPassword = exclude(user, ["password"]);

    if (role === "kol") {
      const kol = await prisma.kol.create({
        data: { id: user.id, email, name, image },
      });
      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          kol,
        },
      });
    } else if (role === "company") {
      const company = await prisma.company.create({
        data: { id: user.id, email, name, image },
      });
      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          company,
        },
      });
    }
  }

  async function createUserWithEmailAndPassword(
    email: string,
    name: string,
    role: UserRole,
    password: string
  ) {
    let hashPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.account.create({
      data: { email, role, password: hashPassword },
    });
    const userWithoutPassword = exclude(user, ["password"]);
    if (role === "kol") {
      const kol = await prisma.kol.create({
        data: {
          id: user.id,
          email,
          name,
          image: defaultAvatarLink,
        },
      });
      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          kol,
        },
      });
    } else if (role === "company") {
      const company = await prisma.company.create({
        data: { id: user.id, email, name, image: defaultAvatarLink },
      });
      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          company,
        },
      });
    }
  }
}

async function getUserByEmailPassword(email: string, password: string) {
  const user = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  if (password) {
    let check = bcrypt.compareSync(password, user.password as string);
    if (!check) return null;
  }
  let kol = null;
  let company = null;
  const userWithoutPassword = exclude(user, ["password"]);
  if (user?.role === "kol") {
    kol = await prisma.kol.findUnique({
      where: {
        id: user.id,
      },
    });
    return {
      ...userWithoutPassword,
      kol,
    };
  } else if (user?.role === "company") {
    company = await prisma.company.findUnique({
      where: {
        id: user.id,
      },
    });
    return {
      ...userWithoutPassword,
      company,
    };
  }
  return userWithoutPassword;
}

async function getAllUsers() {
  const users = await prisma.account.findMany();
  const usersWithoutPassword = users.map((user) => exclude(user, ["password"]));
  return usersWithoutPassword;
}
