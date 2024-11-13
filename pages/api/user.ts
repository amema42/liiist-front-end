import { NextApiRequest, NextApiResponse } from "next";

// Mocked user data
const user = {
    id: "1",
    name: "Mario Rossi",
    location: "Via Bernardino Lotti 7, Roma",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        // Return user data
        res.status(200).json({ user });
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
