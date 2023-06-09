// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRole } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const user = await getUserByEmail(req.query.email as string);
      if (user) return res.status(200).json(user);
      else return res.status(200).json({ err: 1, msg: "Email does not exist" });
    } else if (req.method === "POST") {
      const { email, name, image, role } = req.body;
      const isExist = await getUserByEmail(email);
      if (!isExist) await createUser(email, name, image, role);
      else return res.status(200).json({ err: 1, msg: "Email exist" });
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function createUser(
    email: string,
    name: string,
    image: string,
    role: UserRole
  ) {
    const user = await prisma.account.create({
      data: { email, role },
    });
    if (role === "kol") {
      const kol = await prisma.kol.create({
        data: { id: user.id, email, name, image },
      });
      return res.status(200).json({
        user: {
          ...user,
          kol,
        },
      });
    } else if (role === "company") {
      const company = await prisma.company.create({
        data: { id: user.id, email, name, image },
      });
      return res.status(200).json({
        user: {
          ...user,
          company,
        },
      });
    }
  }
}

async function getUserByEmail(email: string) {
  const user = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });
  let kol = null;
  let company = null;
  if (user?.role === "kol") {
    kol = await prisma.kol.findUnique({
      where: {
        id: user.id,
      },
    });
    return {
      ...user,
      kol,
    };
  } else if (user?.role === "company") {
    company = await prisma.company.findUnique({
      where: {
        id: user.id,
      },
    });
    return {
      ...user,
      company,
    };
  }
  return user;
}
