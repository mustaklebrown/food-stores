import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, price, imageUrl, category, rate } = req.body;

  const session = await getSession({ req });
  if (session) {
    try {
      const result = await prisma.food.create({
        data: {
          name,
          rate,
          description,
          price,
          imageUrl,
          category,
          author: { connect: { email: session?.user?.email } },
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
