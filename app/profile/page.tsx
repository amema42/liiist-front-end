import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import profileStyles from "./styles/Profile.module.css";

const UserProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [shoppingLists, setShoppingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user profile data and shopping lists
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Make API call to fetch user profile data
            const response = await fetch("/api/user");
            const data = await response.json();
            setUser(data.user);

            // Fetch the user's shopping lists
            const listsResponse = await fetch("/api/shopping-lists");
            const listsData = await listsResponse.json();
            setShoppingLists(listsData.lists);
        } catch (err) {
            setError("Failed to fetch user data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleListClick = (listId) => {
        router.push(`/supermarket/${listId}`);
    };

    const handleLogoutClick = () => {
        // Implement logout functionality
    };

    const handlePasswordChange = () => {
        // Implement password change functionality
    };

    const handleLoyaltyCardManagement = () => {
        // Implement loyalty card management functionality
    };

    return (
        <div className={profileStyles.container}>
            <Card className={profileStyles.card}>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className={profileStyles.loading}>Loading...</div>
                    ) : error ? (
                        <div className={profileStyles.error}>{error}</div>
                    ) : (
                        <>
                            <div className={profileStyles.userInfo}>
                                <div className={profileStyles.userName}>
                                    {user?.name}
                                </div>
                                <Button onClick={handleLoyaltyCardManagement}>
                                    Manage Loyalty Cards
                                </Button>
                                <Button onClick={handlePasswordChange}>
                                    Change Password
                                </Button>
                                <Button onClick={handleLogoutClick}>
                                    Logout
                                </Button>
                            </div>
                            <div className={profileStyles.listOverview}>
                                <h3>Your Shopping Lists</h3>
                                {shoppingLists.length > 0 ? (
                                    <div className={profileStyles.lists}>
                                        {shoppingLists.map((list) => (
                                            <div
                                                key={list.id}
                                                className={
                                                    profileStyles.listItem
                                                }
                                                onClick={() =>
                                                    handleListClick(list.id)
                                                }
                                            >
                                                <div
                                                    className={
                                                        profileStyles.listName
                                                    }
                                                >
                                                    {list.name}
                                                </div>
                                                <div
                                                    className={
                                                        profileStyles.listDetails
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            profileStyles.listDate
                                                        }
                                                    >
                                                        Created:{" "}
                                                        {list.createdAt}, Last
                                                        modified:{" "}
                                                        {list.updatedAt}
                                                    </div>
                                                    <div
                                                        className={
                                                            profileStyles.listBudget
                                                        }
                                                    >
                                                        Budget: {list.budget}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={profileStyles.noLists}>
                                        You don't have any shopping lists yet.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfilePage;
