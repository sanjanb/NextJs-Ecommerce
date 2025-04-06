"use client";

import { currentCart } from "@wix/ecom";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cart, setCart] = useState<currentCart.Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const wixClient = createWixClient();
        const res = await wixClient.currentCart.getCurrentCart();
        setCart(res);
        setLoading(false);
      } catch (err) {
        setError("Error loading cart. Please try again later.");
        setLoading(false);
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const wixClient = createWixClient();
      const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart();
      const { redirectSession } = await wixClient.redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: {
          postFlowUrl: window.location.origin,
          thankYouPageUrl: `${window.location.origin}/thank-you`,
        },
      });
      setCheckoutUrl(redirectSession?.fullUrl || null);
    } catch (err) {
      setError("Error creating checkout. Please try again later.");
      console.error("Error creating checkout:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  if (loading) {
    return <div className="mt-12">Loading checkout...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = cart.lineItems.reduce((total, item) => {
    const itemPrice = Number(item.price?.amount) || 0;
    const itemQuantity = Number(item.quantity) || 1;
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-8">Checkout</h2>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 