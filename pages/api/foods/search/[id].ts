import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const searchInObject = (obj, searchKey) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === searchKey || key === searchKey) {
        return true;
      }
      if (typeof value === 'object') {
        if (searchInObject(value, searchKey)) {
          return true;
        }
      }
    }
  }
  return false;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fs.promises.readFile('../../../db.json', 'utf-8');
    const properties = JSON.parse(data);
    const searchKey = req.query.id;
    let foundProperties = properties.filter((property) => {
      return searchInObject(property, searchKey);
    });
    if (foundProperties.length) {
      res.status(200).json(foundProperties);
    } else {
      res
        .status(404)
        .send(`No property found with the key or value ${searchKey}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
