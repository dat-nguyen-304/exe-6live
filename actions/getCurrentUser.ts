import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/server/db/client";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    // const session = await getSession();
    // console.log("SESSION AT GETUSER: ", session);
    // if (!session?.user?.email) {
    //   return null;
    // }
    // let currentUser = await prisma.account.findUnique({
    //   where: {
    //     email: session.user.email as string,
    //   },
    // });
    // if (!currentUser) {
    // const currentUser = await prisma.account.create({
    //   data: {
    //     email: session.user.email as string,
    //     role: "kol",
    //     image: session.user.image as string,
    //     name: session.user.image as string,
    //   },
    // });
    // }
    // console.log("final current userL ", currentUser);
    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    // };
    return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
