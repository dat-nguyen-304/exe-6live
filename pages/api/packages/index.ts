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
      await getAllPackages();
    } else if (req.method === "POST") {
      const { numberOfMonth } = req.body;
      const isExist = await isExistPackage(numberOfMonth);
      if (!isExist) await createPackage(req.body);
      else return res.status(200).json({ err: 1, msg: "Email exist" });
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function getAllPackages() {
    const packages = await prisma.package.findMany();
    res.status(200).json(packages);
  }

  async function createPackage(data: { numberOfMonth: number; price: number }) {
    const newPackage = await prisma.package.create({
      data,
    });
    res.status(200).json(newPackage);
  }
}

async function isExistPackage(numberOfMonth: number) {
  const foundedPackage = await prisma.package.findUnique({
    where: {
      numberOfMonth,
    },
  });
  if (foundedPackage) return true;
  else return false;
}
