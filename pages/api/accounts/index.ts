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
    switch (req.method) {
      case "POST":
        const { email, name, image, role } = req.body;
        const user = await checkUserExist(email);
        console.log("check user: ", user);
        if (!user) await createUser(email, name, image, role);
        else return res.status(200).json({ err: 1, msg: "Email exist" });
        break;
      default:
        console.log("YES");
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
      data: { email, name, image, role },
    });
    return res.status(200).json(user);
  }
}

async function checkUserExist(email: string) {
  const user = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
