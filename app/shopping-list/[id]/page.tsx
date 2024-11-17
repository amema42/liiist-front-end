"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import shoppingListStyles from "./styles/ShoppingList.module.css";
import { Button } from "@/components/ui/button";

const ShoppingListPage: React.FC = () => {
    const router = useRouter();
    const params = useParams(); // Usa useParams per ottenere l'ID dalla rotta dinamica
    const listId = params.id; // Ottieni l'ID dalla rotta dinamica

    const [listTitle, setListTitle] = useState<string>("");
    const [products, setProducts] = useState<string[]>([]);
    const [budget, setBudget] = useState<string>("");
    const [mode, setMode] = useState<string>("convenience");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (listId) {
            // Effettua la chiamata API per recuperare la lista specifica
            fetch(`/api/shopping-lists/${listId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("List not found");
                    }
                    return response.json();
                })
                .then((data) => {
                    setListTitle(data.name);
                    setProducts(data.products || []);
                    setBudget(data.budget);
                    setMode(data.mode);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("Failed to fetch shopping list");
                    setIsLoading(false);
                });
        }
    }, [listId]);

    const handleEditList = () => {
        router.push(`/edit-list?id=${listId}`);
    };

    const handleNavigateToSavingsMode = () => {
        router.push(
            `/savings-mode?id=${listId}&listTitle=${listTitle}&budget=${budget}&products=${JSON.stringify(
                products,
            )}`,
        );
    };

    const handleNavigateToConvenienceMode = () => {
        router.push(
            `/convenience-mode?id=${listId}&listTitle=${listTitle}&budget=${budget}&products=${JSON.stringify(
                products,
            )}`,
        );
    };

    return (
        <div className={shoppingListStyles.container}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card className={shoppingListStyles.card}>
                    <CardHeader>
                        <CardTitle>{listTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className={shoppingListStyles.error}>
                                {error}
                            </div>
                        )}
                        <div className={shoppingListStyles.details}>
                            <p>Budget: €{budget}</p>
                            <p>Prodotti: {products.join(", ")}</p>
                            <p>Modalità Corrente: {mode}</p>
                        </div>
                        <div className={shoppingListStyles.actions}>
                            <Button onClick={handleEditList}>
                                Modifica Lista
                            </Button>
                            <Button onClick={handleNavigateToSavingsMode}>
                                Vai a Modalità Risparmio
                            </Button>
                            <Button onClick={handleNavigateToConvenienceMode}>
                                Vai a Modalità Comodità
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ShoppingListPage;
