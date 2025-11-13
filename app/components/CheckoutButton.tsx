'use client'

import { Button } from "@/components/ui/button";
import { useCheckout } from "../contexts/AuthContext";

export const CheckoutButton: React.FC = () => {
    const { handleCheckoutRedirect } = useCheckout();

    const handleProceedToCheckout = () => {
        if (handleCheckoutRedirect()) {
            // If user is authenticated, proceed with checkout logic
            console.log("Proceeding to checkout...");
            // Add your checkout logic here
        }
        // If not authenticated, the hook will automatically redirect to signup
    };

    return (
        <Button 
            onClick={handleProceedToCheckout}
            className="w-full"
        >
            Proceed to Checkout
        </Button>
    );
};
