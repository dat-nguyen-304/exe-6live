// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Company, Platform, User, UserRole } from "@/types";
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
    if (req.method === "PUT") {
      await updateCompany(req.body);
    } else if (req.method === "GET") {
      const companies = await prisma.company.findMany();
      res.status(200).json(companies);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function updateCompany(newCompany: Company) {
    const { email, id, campaigns, ...data } = newCompany;
    console.log("da vao day: ", data);
    const company = await prisma.company.update({
      where: {
        email: email,
      },
      data,
    });
    return res.status(200).json(company);
  }
}
