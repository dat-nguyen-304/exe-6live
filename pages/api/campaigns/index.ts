// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Campaign } from "@/types";
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
    if (req.method === "POST") {
      await addCampaign(req.body);
    } else if (req.method === "GET") {
      await getCampaigns();
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function addCampaign(newCampaign: Campaign) {
    const campaign = await prisma.campaign.create({
      data: newCampaign,
    });
    return res.status(200).json(campaign);
  }
  async function getCampaigns() {
    const campaigns = await prisma.campaign.findMany();
    return res.status(200).json(campaigns);
  }
}
