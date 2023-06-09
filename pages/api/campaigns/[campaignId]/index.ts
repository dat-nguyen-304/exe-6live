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
    const campaignId = req.query.campaignId as string;

    if (req.method === "GET") {
      const campaign = await prisma.campaign.findUnique({
        where: {
          id: campaignId,
        },
        include: {
          company: true,
        },
      });
      res.status(200).json(campaign);
    } else if (req.method === "PUT") {
      const data = req.body;
      const campaign = await prisma.campaign.update({
        where: {
          id: campaignId,
        },
        data,
      });
      res.status(200).json(campaign);
    } else if (req.method === "DELETE") {
      const campaign = await prisma.campaign.delete({
        where: {
          id: campaignId,
        },
      });
      setTimeout(() => {
        res.status(200).json(campaign);
      }, 3000);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }
}
