import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../db.json';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const food = await prisma.food.findFirst({
      where: { id: Number(id) },
      include: {
        author: true,
      },
    });

    res.status(200).json(food);
  }
  if (req.method === 'DELETE') {
    if (session) {
      const food = await prisma.food.delete({
        where: { id: Number(id) },
      });
      res.json(food);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
  if (req.method === 'PUT') {
    const { name, description, category, price } = req.body;
    if (session) {
      const food = await prisma.food.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          category,
          price,
        },
      });
      res.json(food);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
