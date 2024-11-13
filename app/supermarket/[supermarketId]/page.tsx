import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search";
import { ProductList } from "@/components/product-list";
import supermarketStyles from "./styles/Supermarket.module.css";

const SupermarketPage = () => {
    const router = useRouter();
    const { supermarketId } = router.query;
    const [supermarket, setSupermarket] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch supermarket details and featured products
        fetchSupermarketData();
    }, [supermarketId]);

    const fetchSupermarketData = async () => {
        try {
            // Make API call to fetch supermarket details
            const response = await fetch(`/api/supermarkets/${supermarketId}`);
            const data = await response.json();
            setSupermarket(data.supermarket);
            setFeaturedProducts(data.featuredProducts);
        } catch (err) {
            setError("Failed to fetch supermarket data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductSearch = async (query) => {
        try {
            // Make API call to search for products in the supermarket
            const response = await fetch(
                `/api/supermarkets/${supermarketId}/products?q=${query}`,
            );
            const data = await response.json();
            setSearchResults(data.products);
        } catch (err) {
            setError("Failed to search for products");
        }
    };

    const handleCreateList = () => {
        // Redirect to the New List page with the current supermarket pre-selected
        router.push(`/new-list?supermarketId=${supermarketId}`);
    };

    return (
        <div className={supermarketStyles.container}>
            <Card className={supermarketStyles.card}>
                <CardHeader>
                    <div className={supermarketStyles.header}>
                        <div className={supermarketStyles.supermarketInfo}>
                            {isLoading ? (
                                <div className={supermarketStyles.loading}>
                                    Loading...
                                </div>
                            ) : error ? (
                                <div className={supermarketStyles.error}>
                                    {error}
                                </div>
                            ) : (
                                <>
                                    <div
                                        className={
                                            supermarketStyles.supermarketName
                                        }
                                    >
                                        {supermarket?.name}
                                    </div>
                                    <div
                                        className={
                                            supermarketStyles.supermarketAddress
                                        }
                                    >
                                        {supermarket?.address}
                                    </div>
                                    <div
                                        className={
                                            supermarketStyles.supermarketHours
                                        }
                                    >
                                        {supermarket?.openingHours ||
                                            "Opening hours not available"}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={supermarketStyles.supermarketLogo}>
                            {/* Supermarket logo */}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={supermarketStyles.productSearch}>
                        <SearchInput
                            placeholder="Search products"
                            onSearch={handleProductSearch}
                            className={supermarketStyles.searchInput}
                        />
                    </div>
                    {searchResults.length > 0 && (
                        <div className={supermarketStyles.searchResults}>
                            <ProductList products={searchResults} />
                        </div>
                    )}
                    {featuredProducts.length > 0 && (
                        <div className={supermarketStyles.featuredProducts}>
                            <h3>Featured Products</h3>
                            <ProductList products={featuredProducts} />
                        </div>
                    )}
                    <Button
                        onClick={handleCreateList}
                        className={supermarketStyles.createListButton}
                    >
                        Create Shopping List
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SupermarketPage;
