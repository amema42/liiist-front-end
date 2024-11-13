import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Marker } from "@/components/map";
import { ProductList } from "@/components/product-list";
import convenienceModeStyles from "./styles/ConvenienceMode.module.css";

const ConvenienceModePage = () => {
    const router = useRouter();
    const { listId } = router.query;
    const [supermarket, setSupermarket] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (listId) {
            fetchConvenienceModeData();
        }
    }, [listId]);

    const fetchConvenienceModeData = async () => {
        try {
            // Make API call to fetch the data for the Convenience Mode
            const response = await fetch(
                `/api/shopping-lists/${listId}/convenience-mode`,
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSupermarket(data.supermarket);
            setProducts(data.products);
            setTotalCost(data.totalCost);
        } catch (err) {
            setError("Failed to fetch Convenience Mode data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToList = () => {
        router.push(`/new-list?listId=${listId}`);
    };

    return (
        <div className={convenienceModeStyles.container}>
            <Card className={convenienceModeStyles.card}>
                <CardHeader>
                    <CardTitle>Convenience Mode</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div
                            className={convenienceModeStyles.loading}
                            role="status"
                            aria-live="polite"
                        >
                            Loading...
                        </div>
                    ) : error ? (
                        <div
                            className={convenienceModeStyles.error}
                            role="alert"
                        >
                            {error}
                        </div>
                    ) : (
                        <>
                            <div
                                className={
                                    convenienceModeStyles.supermarketInfo
                                }
                            >
                                <div
                                    className={
                                        convenienceModeStyles.supermarketName
                                    }
                                >
                                    {supermarket?.name}
                                </div>
                                <div
                                    className={
                                        convenienceModeStyles.supermarketAddress
                                    }
                                >
                                    {supermarket?.address}
                                </div>
                                <div
                                    className={
                                        convenienceModeStyles.supermarketHours
                                    }
                                >
                                    {supermarket?.openingHours ||
                                        "Opening hours not available"}
                                </div>
                                <div className={convenienceModeStyles.map}>
                                    <Map
                                        center={[
                                            supermarket?.latitude,
                                            supermarket?.longitude,
                                        ]}
                                        zoom={13}
                                    >
                                        <Marker
                                            position={[
                                                supermarket?.latitude,
                                                supermarket?.longitude,
                                            ]}
                                            onClick={() => {}}
                                            aria-label={`Location of ${supermarket?.name}`}
                                        />
                                    </Map>
                                </div>
                            </div>
                            <div className={convenienceModeStyles.productList}>
                                <h3>Product List</h3>
                                <ProductList products={products} />
                            </div>
                            <div className={convenienceModeStyles.totalCost}>
                                <h3>Total Cost: {totalCost.toFixed(2)}€</h3>
                            </div>
                            <Button
                                onClick={handleBackToList}
                                className={convenienceModeStyles.backButton}
                                aria-label="Back to modify the shopping list"
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

export default ConvenienceModePage;
