import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../db.json';
import prisma from '../../../lib/prisma';
import { Food } from '../../../typing';


type Data = {
  foods: Food[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const foods = await prisma.food.findMany({
    include: {
      author: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(foods);
}
