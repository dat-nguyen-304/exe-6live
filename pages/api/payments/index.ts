// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRole } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { addDays } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { months, ...data } = req.body;
      await createPayment(data);
      const account = await getAccount(data.accountId);
      let newExpiredDate: Date;
      if (account?.isVip) {
        newExpiredDate = addDays(account?.expiredVipDate as Date, months * 30);
      } else {
        newExpiredDate = addDays(new Date(), months * 30);
      }
      await updateVipAccount(newExpiredDate, data.accountId);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function createPayment(data: {
    bank: string;
    packageId: string;
    accountId: string;
    price: number;
  }) {
    const newPackage = await prisma.payment.create({
      data,
    });
    res.status(200).json(newPackage);
  }
}

async function updateVipAccount(expiredVipDate: Date, accountId: string) {
  await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      expiredVipDate,
      isVip: true,
    },
  });
}

async function getAccount(accountId: string) {
  const user = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });
  return user;
}
