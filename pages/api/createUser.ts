// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prismadb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await prisma.account.create({
    data: {
      email: "abc",
      role: "kol",
    },
  });
  const { email, name, image } = user as User;
  const objB: User = { email, name, image };
  console.log(req.method);
  res.status(200).json(objB);
}
