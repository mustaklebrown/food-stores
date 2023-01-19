import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../db.json';
import { Food } from '../../../typing';
import prisma from '../../../lib/prisma';

type Data = {
  foods: Food[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const category = req.query.category;
  const foods = await prisma.food.findMany({
    where: { category: category as string },
  });

  // const foods = data.foods.filter((item) => item.category === category);

  if (foods.length) {
    res.json(foods);
  } else {
    res.status(404).json({ error: 'No data found for category ' + category });
  }
}
