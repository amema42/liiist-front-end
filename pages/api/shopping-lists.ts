import { NextApiRequest, NextApiResponse } from "next";

// Mocked shopping lists data - In-memory store
let shoppingLists = [
    {
        id: "1",
        name: "Lista di Pasqua",
        createdAt: "2024-10-10",
        updatedAt: "2024-10-11",
        budget: 100,
    },
    {
        id: "2",
        name: "Lista di Spesa Weekend",
        createdAt: "2024-10-12",
        updatedAt: "2024-10-13",
        budget: 50,
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        // Recupera tutte le liste di spesa
        res.status(200).json({ lists: shoppingLists });
    } else if (req.method === "POST") {
        // Aggiunge una nuova lista di spesa
        const { name, budget, mode, products } = req.body;

        if (!name || typeof budget === "undefined" || !products) {
            return res
                .status(400)
                .json({
                    error: "Missing required fields: name, budget, products",
                });
        }

        const newList = {
            id: (shoppingLists.length + 1).toString(),
            name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            budget,
            mode,
            products,
        };

        // Aggiungi la nuova lista a quelle esistenti
        shoppingLists.push(newList);

        // Risposta con la lista appena creata
        res.status(201).json({ list: newList });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
