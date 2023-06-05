// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRole } from "@/types";
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
      const {
        email,
        name,
        phone,
        description,
        location,
        salary,
        gender,
        status,
        industries,
        age,
        image,
      } = req.body;
      await updateKol(
        email,
        name,
        phone,
        description,
        location,
        salary,
        gender,
        status,
        industries,
        age,
        image
      );
    } else if (req.method === "GET") {
      const kols = await prisma.kol.findMany({
        where: {
          status: true,
        },
      });
      res.status(200).json({ kols });
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function updateKol(
    email: string,
    name: string,
    phone: string,
    description: string,
    location: Location,
    salary: string,
    gender: Gender,
    status: boolean,
    industries: Industry[],
    age: string,
    image: string
  ) {
    const kol = await prisma.kol.update({
      where: {
        email: email,
      },
      data: {
        name,
        phone,
        description,
        location,
        salary: parseInt(salary),
        gender,
        status,
        industries,
        age: parseInt(age),
        image,
      },
    });
    return res.status(200).json(kol);
  }
}
