import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shopId } = req.query;

  // Percorso al file JSON che contiene i dati dei prodotti
  const filePath = path.join(process.cwd(), 'db.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);

  // Troviamo i prodotti per il supermercato specificato
  const products = data.products.filter((product: any) => product.SHOP.uniqueShopId === shopId);

  if (products.length === 0) {
    return res.status(404).json({ error: 'No products found for this supermarket' });
  }

  return res.status(200).json(products);
}
