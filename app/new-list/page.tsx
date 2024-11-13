import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/tag-input";
import { ProductList } from "@/components/product-list";
import newListStyles from "./styles/NewList.module.css";

const NewListPage = () => {
    const router = useRouter();
    const { supermarketId } = router.query;
    const [listTitle, setListTitle] = useState("");
    const [products, setProducts] = useState([]);
    const [budget, setBudget] = useState(0);
    const [mode, setMode] = useState("convenience");
    const [recommendedProducts, setRecommendedProducts] = useState([]);
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

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    const handleModeToggle = () => {
        setMode(mode === "convenience" ? "savings" : "convenience");
    };

    const handleCalculate = async () => {
        setIsLoading(true);
        try {
            // Make API call to calculate the list based on the selected mode
            const response = await fetch("/api/calculate-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ products, budget, mode, supermarketId }),
            });
            const data = await response.json();
            setRecommendedProducts(data.recommendedProducts);
        } catch (err) {
            setError("Failed to calculate the list");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateList = async () => {
        try {
            // Make API call to create the new shopping list
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
                }),
            });
            const data = await response.json();
            // Redirect to the specific list page
            router.push(`/supermarket/${data.listId}`);
        } catch (err) {
            setError("Failed to create the shopping list");
        }
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
                            onChange={handleBudgetChange}
                            suffix="€"
                        />
                    </div>
                    <div className={newListStyles.modeToggle}>
                        <Button
                            onClick={handleModeToggle}
                            className={`${newListStyles.modeButton} ${
                                mode === "convenience"
                                    ? newListStyles.convenienceMode
                                    : newListStyles.savingsMode
                            }`}
                        >
                            {mode === "convenience"
                                ? "Convenience Mode"
                                : "Savings Mode"}
                        </Button>
                    </div>
                    <div className={newListStyles.actions}>
                        <Button onClick={handleCalculate} disabled={isLoading}>
                            {isLoading ? "Calculating..." : "Calculate"}
                        </Button>
                        <Button
                            onClick={handleCreateList}
                            disabled={
                                isLoading || recommendedProducts.length === 0
                            }
                        >
                            Create List
                        </Button>
                    </div>
                    {recommendedProducts.length > 0 && (
                        <div className={newListStyles.recommendedProducts}>
                            <h3>Recommended Products</h3>
                            <ProductList products={recommendedProducts} />
                        </div>
                    )}
                    {error && (
                        <div className={newListStyles.error}>{error}</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default NewListPage;
