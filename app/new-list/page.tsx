"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ActionButton } from "@/components/ui/ActionButton";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import newListStyles from "./styles/NewList.module.css";

const NewListPage = () => {
    const router = useRouter();
    const [listTitle, setListTitle] = useState("");
    const [products, setProducts] = useState([]);
    const [budget, setBudget] = useState("");
    const [mode, setMode] = useState("convenience");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProductAdd = (product) => {
        setProducts([...products, product]);
    };

    const handleProductRemove = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const handleSaveList = async () => {
        if (listTitle.trim() === "" || products.length === 0) {
            setError("Please enter a list title and add at least one product.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Salva la lista facendo una chiamata POST
            const response = await fetch("/api/shopping-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: listTitle,
                    products,
                    budget,
                    mode,
                    userId: "12345", // Placeholder, sostituire con l'ID utente effettivo
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save the shopping list");
            }

            // Dopo aver salvato la lista, torna alla homepage
            router.push("/user");
        } catch (err) {
            setError("Failed to save the shopping list");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCalculate = async () => {
        if (listTitle.trim() === "" || products.length === 0) {
            setError("Please enter a list title and add at least one product.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Salva la lista prima di calcolare
            const response = await fetch("/api/shopping-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: listTitle,
                    products,
                    budget,
                    mode,
                    userId: "12345", // Questo è un placeholder, sostituire con ID utente effettivo
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save the shopping list");
            }

            const data = await response.json();

            // Naviga alla modalità corretta con l'ID della lista salvata
            const route =
                mode === "savings" ? "/savings-mode" : "/convenience-mode";
            router.push(
                `${route}?id=${data.id}&listTitle=${listTitle}&budget=${budget}&products=${JSON.stringify(
                    products,
                )}`,
            );
        } catch (err) {
            setError("Failed to save and calculate the shopping list");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMode = () => {
        setMode(mode === "convenience" ? "savings" : "convenience");
    };

    return (
        <div className={newListStyles.container}>
            <Card className={newListStyles.card}>
                <CardHeader>
                    <CardTitle>Create New Shopping List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={newListStyles.listTitle}>
                        <Input
                            placeholder="List Title"
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                        />
                    </div>
                    <div className={newListStyles.productInput}>
                        <TagInput
                            placeholder="Add product"
                            onAdd={handleProductAdd}
                            onRemove={handleProductRemove}
                            tags={products}
                        />
                    </div>
                    <div className={newListStyles.budget}>
                        <Input
                            type="number"
                            placeholder="Budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            suffix="€"
                        />
                    </div>
                    <div className={newListStyles.modeToggle}>
                        <ToggleSwitch
                            checked={mode === "savings"}
                            onChange={handleToggleMode}
                            labels={["Convenience", "Savings"]}
                        />
                    </div>
                    <div className={newListStyles.actions}>
                        <ActionButton
                            onClick={handleSaveList}
                            disabled={
                                isLoading ||
                                products.length === 0 ||
                                listTitle.trim() === ""
                            }
                        >
                            {isLoading ? "Saving..." : "Save List"}
                        </ActionButton>
                        <ActionButton
                            onClick={handleCalculate}
                            disabled={
                                isLoading ||
                                products.length === 0 ||
                                budget === ""
                            }
                        >
                            {isLoading ? "Calculating..." : "Calculate"}
                        </ActionButton>
                    </div>
                    {error && (
                        <div className={newListStyles.error}>{error}</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default NewListPage;
