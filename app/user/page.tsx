"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import userStyles from "./styles/UserHomepage.module.css";

const UserHomepage = () => {
    const router = useRouter();
    const [userLocation, setUserLocation] = useState("");
    const [shoppingLists, setShoppingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchShoppingLists();
    }, []);

    const fetchShoppingLists = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Make API call to fetch the user's shopping lists
            const response = await fetch("/api/shopping-lists");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setShoppingLists(data.lists);
        } catch (err) {
            setError("Failed to fetch shopping lists");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationClick = () => {
        router.push("/location-selection");
    };

    const handleListClick = (listId) => {
        router.push(`/supermarket/${listId}`);
    };

    const handleNewListClick = () => {
        router.push("/new-list");
    };

    const handleProfileClick = () => {
        router.push("/profile");
    };

    return (
        <div className={userStyles.container}>
            <Card className={userStyles.card}>
                <CardHeader>
                    <div className={userStyles.header}>
                        <Button
                            onClick={handleLocationClick}
                            className={userStyles.locationButton}
                        >
                            {userLocation || "Set location"}
                        </Button>
                        <div
                            className={userStyles.avatar}
                            onClick={handleProfileClick}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleProfileClick();
                                }
                            }}
                            aria-label="Go to user profile"
                        >
                            {/* User avatar */}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div
                            className={userStyles.loading}
                            role="status"
                            aria-live="polite"
                        >
                            Loading...
                        </div>
                    ) : error ? (
                        <div className={userStyles.error} role="alert">
                            {error}
                        </div>
                    ) : shoppingLists.length > 0 ? (
                        <div className={userStyles.lists}>
                            {shoppingLists.map((list) => (
                                <div
                                    key={list.id}
                                    className={userStyles.listItem}
                                    onClick={() => handleListClick(list.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            handleListClick(list.id);
                                        }
                                    }}
                                    aria-label={`Open shopping list ${list.name}`}
                                >
                                    <div className={userStyles.listName}>
                                        {list.name}
                                    </div>
                                    <div className={userStyles.listDetails}>
                                        <div className={userStyles.listDate}>
                                            Created: {list.createdAt}, Last
                                            modified: {list.updatedAt}
                                        </div>
                                        <div className={userStyles.listBudget}>
                                            Budget: {list.budget}€
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={userStyles.noLists}>
                            <p>You don't have any shopping lists yet.</p>
                            <Button onClick={handleNewListClick}>
                                Create New List
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserHomepage;
