import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Marker } from "@/components/map";
import { ProductList } from "@/components/product-list";
import savingsModeStyles from "./styles/SavingsMode.module.css";

const SavingsModePage = () => {
    const router = useRouter();
    const { listId } = router.query;
    const [supermarkets, setSupermarkets] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the supermarkets and product details for the selected list in Savings Mode
        fetchSavingsModeData();
    }, [listId]);

    const fetchSavingsModeData = async () => {
        try {
            // Make API call to fetch the data for the Savings Mode
            const response = await fetch(
                `/api/shopping-lists/${listId}/savings-mode`,
            );
            const data = await response.json();
            setSupermarkets(data.supermarkets);
            setProducts(data.products);
            setTotalCost(data.totalCost);
        } catch (err) {
            setError("Failed to fetch Savings Mode data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToList = () => {
        router.push(`/new-list?listId=${listId}`);
    };

    return (
        <div className={savingsModeStyles.container}>
            <Card className={savingsModeStyles.card}>
                <CardHeader>
                    <CardTitle>Savings Mode</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className={savingsModeStyles.loading}>
                            Loading...
                        </div>
                    ) : error ? (
                        <div className={savingsModeStyles.error}>{error}</div>
                    ) : (
                        <>
                            {supermarkets.map((supermarket, index) => (
                                <div
                                    key={supermarket.id}
                                    className={
                                        savingsModeStyles.supermarketSection
                                    }
                                >
                                    <div
                                        className={
                                            savingsModeStyles.supermarketInfo
                                        }
                                    >
                                        <div
                                            className={
                                                savingsModeStyles.supermarketName
                                            }
                                        >
                                            {supermarket.name}
                                        </div>
                                        <div
                                            className={
                                                savingsModeStyles.supermarketAddress
                                            }
                                        >
                                            {supermarket.address}
                                        </div>
                                        <div
                                            className={
                                                savingsModeStyles.supermarketHours
                                            }
                                        >
                                            {supermarket.openingHours ||
                                                "Opening hours not available"}
                                        </div>
                                        <div className={savingsModeStyles.map}>
                                            <Map
                                                center={[
                                                    supermarket.latitude,
                                                    supermarket.longitude,
                                                ]}
                                                zoom={13}
                                            >
                                                <Marker
                                                    position={[
                                                        supermarket.latitude,
                                                        supermarket.longitude,
                                                    ]}
                                                    onClick={() => {}}
                                                />
                                            </Map>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            savingsModeStyles.productList
                                        }
                                    >
                                        <h3>Products at {supermarket.name}</h3>
                                        <ProductList
                                            products={products.filter(
                                                (p) =>
                                                    p.supermarketId ===
                                                    supermarket.id,
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className={savingsModeStyles.totalCost}>
                                <h3>Total Cost: {totalCost.toFixed(2)}€</h3>
                            </div>
                            <Button
                                onClick={handleBackToList}
                                className={savingsModeStyles.backButton}
                            >
                                Back to List
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SavingsModePage;
