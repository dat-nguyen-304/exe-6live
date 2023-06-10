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
      const condition = getParams(req);
      await getCampaigns(condition);
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
  async function getCampaigns(condition: any) {
    const campaigns = await prisma.campaign.findMany({
      where: {
        ...condition,
        status: true,
      },
    });
    return res.status(200).json(campaigns);
  }
}

function getParams(req: NextApiRequest) {
  let condition = {};
  let properties = ["industry", "companyId"];
  for (const property of properties) {
    if (req.query[property])
      condition = {
        ...condition,
        [property]: req.query[property],
      };
  }

  properties = ["gender", "location"];
  for (const property of properties) {
    if (req.query[property]) {
      condition = {
        ...condition,
        [`${property}s`]: {
          has: req.query[property],
        },
      };
    }
  }

  return condition;
}
