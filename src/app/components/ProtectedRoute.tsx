"use client";
import useAuth from "@/hooks/useAuth";
import LoginModal from "../components/modals/LoginModal";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            setShowLoginModal(true);
        }
    }, [user, isLoading]);

    return (
        <>
            <LoginModal showModal={showLoginModal} setModal={setShowLoginModal} />
            {user ? children : null}
        </>
    );
};

export default ProtectedRoute;
