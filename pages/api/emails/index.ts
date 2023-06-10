// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Campaign, Company, Kol } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      sendEmail(req.body.kol, req.body.campaign, req.body.company);
      res.status(200).json({ msg: "success" });
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }
}

let sendEmail = async (kol: Kol, campaign: Campaign, company: Company) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "6Live", // sender address
    to: company.email, // list of receivers
    subject: "KOL/KOC muốn kết nối với bạn", // Subject line
    html: `
    <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://res.cloudinary.com/dngl8ihk7/image/upload/v1686238514/iucytgcnxgecsfwaj2s9.jpg" style="width: 100px; height: 100px; object-fit: contain;">
</div>
<h3 style="color: #333333; font-size: 24px; margin-bottom: 10px;">Xin chào, ${company.name}!</h3>
<p style="color: #555555; font-size: 16px; margin-bottom: 20px;">Chúng tôi vừa nhắn được một quan tâm từ một KOL/KOC <span style="color: #000; font-weight: 700;">${kol.name}</span> với chiến dịch <span style="color: #000; font-weight: 700;">${campaign.title}</span> của bạn!</p>
<a href="https://exe-6live.vercel.app/kols/${kol.id}" target="_blank" style="display: inline-block; background-color: #0066cc; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;">Xem KOL/KOC ngay</a>
<hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
<div style="font-size: 16px;">From 6Live with love.</div>
        `,
  });
};
