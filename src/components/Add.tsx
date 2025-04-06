"use client";

import { currentCart } from "@wix/ecom";
import { createWixClient } from "@/lib/wixClient";
import { useState } from "react";

interface AddProps {
  productId: string;
  variantId: string;
  stockNumber: number;
}

const Add = ({ productId, variantId, stockNumber }: AddProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const wixClient = createWixClient();
      await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
              catalogItemId: productId,
              options: { variantId },
            },
            quantity: 1,
          },
        ],
      });
    } catch (err) {
      setError("Error adding to cart. Please try again later.");
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAddToCart}
        disabled={loading || stockNumber <= 0}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading || stockNumber <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : stockNumber <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Add;
