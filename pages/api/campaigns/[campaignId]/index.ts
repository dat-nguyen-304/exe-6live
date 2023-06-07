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
      const campaignId = req.query.campaignId as string;
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: campaignId,
        },
      });
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }
}
