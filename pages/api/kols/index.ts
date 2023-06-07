// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Kol, Platform, User, UserRole } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { Gender, Industry, Location } from "@prisma/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      await updateKol(req.body);
    } else if (req.method === "GET") {
      const kols = await prisma.kol.findMany({
        where: {
          status: true,
        },
      });
      res.status(200).json(kols);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function updateKol(newKol: Kol) {
    const { email, age, salary, ...data } = newKol;
    const kol = await prisma.kol.update({
      where: {
        email: email,
      },
      data: {
        age: parseInt(age as string),
        salary: parseInt(salary as string),
        ...data,
      },
    });
    return res.status(200).json(kol);
  }
}
