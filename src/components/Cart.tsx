"use client";

import { currentCart } from "@wix/ecom";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cart, setCart] = useState<currentCart.Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const handleRemoveItem = async (lineItemId: string) => {
    try {
      setLoading(true);
      const wixClient = createWixClient();
      await wixClient.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
      const updatedCart = await wixClient.currentCart.getCurrentCart();
      setCart(updatedCart);
    } catch (err) {
      setError("Error removing item. Please try again later.");
      console.error("Error removing item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    try {
      setLoading(true);
      const wixClient = createWixClient();
      await wixClient.currentCart.updateCurrentCart({
        lineItems: [
          {
            _id: lineItemId,
            quantity,
          },
        ],
      });
      const updatedCart = await wixClient.currentCart.getCurrentCart();
      setCart(updatedCart);
    } catch (err) {
      setError("Error updating quantity. Please try again later.");
      console.error("Error updating quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-12">Loading cart...</div>;
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
      <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>
      <div className="flex flex-col gap-8">
        {cart.lineItems.map((item) => (
          <div key={item._id} className="flex gap-4 border-b pb-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image || "/product.png"}
                alt={item.productName?.original || "Product image"}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.productName?.original}</h3>
              <p className="text-gray-500">${item.price?.amount}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item._id!, (item.quantity || 1) - 1)
                  }
                  disabled={item.quantity === 1}
                  className="px-2 py-1 border rounded-md disabled:opacity-50"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item._id!, (item.quantity || 1) + 1)
                  }
                  className="px-2 py-1 border rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item._id!)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 