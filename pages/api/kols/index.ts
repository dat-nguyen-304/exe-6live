// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Kol, Platform, User, UserRole } from "@/types";
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
    if (req.method === "PUT") {
      await updateKol(req.body);
    } else if (req.method === "GET") {
      const condition = getParams(req);
      // console.log(condition);

      const kols = await prisma.kol.findMany({
        where: {
          ...condition,
          status: true,
        },
      });
      res.status(200).json(kols);
    } else {
      res.status(404).json({ err: 1, msg: "Not found!" });
    }
  } catch (error) {
    console.log("-- error: ", error);
  }

  async function updateKol(newKol: Kol) {
    const { email, age, salary, ...data } = newKol;
    const kol = await prisma.kol.update({
      where: {
        email: email,
      },
      data: {
        age: parseInt(age as string),
        salary: parseInt(salary as string),
        ...data,
      },
    });
    return res.status(200).json(kol);
  }
}

function getParams(req: NextApiRequest) {
  const properties = ["location", "gender"];
  let condition = {};
  for (const property of properties) {
    if (req.query[property])
      condition = {
        ...condition,
        [property]: req.query[property],
      };
  }

  if (req.query.industry) {
    condition = {
      ...condition,
      industries: {
        has: req.query.industry,
      },
    };
  }

  const ageCondition = getCondition(
    req.query.minAge as string,
    req.query.maxAge as string,
    "age"
  );

  const salaryCondition = getCondition(
    req.query.minSalary as string,
    req.query.maxSalary as string,
    "salary"
  );

  return {
    ...condition,
    ...salaryCondition,
    ...ageCondition,
  };
}

function getCondition(min: string, max: string, field: string) {
  let minValue: number, maxValue: number;
  if (min) minValue = parseInt(min);
  else minValue = -1;

  if (max) maxValue = parseInt(max);
  else maxValue = 1e18;
  return {
    [field]: {
      gte: minValue,
      lte: maxValue,
    },
  };
}
