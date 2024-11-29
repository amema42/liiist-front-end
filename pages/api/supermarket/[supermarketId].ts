import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { supermarketId } = req.query;

  // Percorso al file JSON che contiene i dati del supermercato
  const filePath = path.join(process.cwd(), 'db.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);

  // Troviamo il supermercato con l'ID specificato
  const supermarket = data.supermarkets.find(
    (shop: any) => shop.uniqueShopId === supermarketId
  );

  if (!supermarket) {
    return res.status(404).json({ error: 'Supermarket not found' });
  }

  return res.status(200).json(supermarket);
}
