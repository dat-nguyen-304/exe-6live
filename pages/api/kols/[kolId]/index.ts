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
    if (req.method === "GET") {
      const kolId = req.query.kolId as string;
      const kol = await prisma.kol.findUnique({
        where: {
          id: kolId,
        },
      });
      res.status(200).json(kol);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }
}
