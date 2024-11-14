import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const { products, budget, mode } = req.body;

        if (!products || typeof budget === "undefined" || !mode) {
            return res
                .status(400)
                .json({
                    error: "Missing required fields: products, budget, mode",
                });
        }

        // Genera prodotti consigliati con prezzi casuali per simulare una risposta
        const recommendedProducts = products.map((product, index) => ({
            id: `${index}`,
            name: `${product} - Recommended`,
            price: Math.round(Math.random() * 10 + 5), // Prezzo casuale tra 5 e 15€
        }));

        // Calcola il costo totale dei prodotti consigliati
        const totalCost = recommendedProducts.reduce(
            (total, product) => total + product.price,
            0,
        );

        // Verifica se il budget è sufficiente
        if (totalCost > budget) {
            return res.status(200).json({
                message:
                    "The budget is not enough to cover all the recommended products. This is the best possible combination we found.",
                recommendedProducts,
                totalCost,
                withinBudget: false,
            });
        }

        // Risposta se il budget è sufficiente
        res.status(200).json({
            message: "The recommended products are within your budget.",
            recommendedProducts,
            totalCost,
            withinBudget: true,
        });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
