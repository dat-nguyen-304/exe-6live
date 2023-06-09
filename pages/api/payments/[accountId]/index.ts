// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
      const accountId = req.query.accountId as string;
      const payments = await prisma.payment.findMany({
        where: {
          accountId: accountId,
        },
        include: {
          package: true,
        },
      });
      res.status(200).json(payments);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }
}
