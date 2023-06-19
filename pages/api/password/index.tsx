// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRole } from "@/types";
import prisma from "@/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "PUT") {
            const user = await getUserByEmailPassword(
                req.body.email as string,
                req.body.oldPassword as string
            );
            if (user) {
                await prisma.account.update({
                    where: {
                        email: req.body.email,
                    },
                    data: {
                        password: bcrypt.hashSync(req.body.newPassword, 10)
                    }
                })
                return res.status(200).json({ err: 0, msg: 'Update successfully!' });
            } else {
                return res.status(200).json({ err: 1, msg: "Email or password is wrong" })
            }
        } else {
            res.status(404).json({ err: 1, msg: "Not found!" });
        }
    } catch (error) {
        console.log("-- error: ", error);
    }
}

async function getUserByEmailPassword(email: string, password: string) {
    const user = await prisma.account.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) return null;
    if (password) {
        if (user.password) {
            let check = bcrypt.compareSync(password, user.password as string);
            console.log("VAN VAO DAY", check);
            if (!check) return null;
        } else return null;
    } else if (user.password) return null;
    return user;
}
