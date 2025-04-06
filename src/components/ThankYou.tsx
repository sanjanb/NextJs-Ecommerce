"use client";

import { orders } from "@wix/ecom";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ThankYou = () => {
  const [order, setOrder] = useState<orders.Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const wixClient = createWixClient();
        const orderId = searchParams.get("orderId");
        if (orderId) {
          const res = await wixClient.orders.getOrder(orderId);
          setOrder(res);
        }
        setLoading(false);
      } catch (err) {
        setError("Error loading order. Please try again later.");
        setLoading(false);
        console.error("Error fetching order:", err);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) {
    return <div className="mt-12">Loading order details...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  if (!order) {
    return (
      <div className="mt-12 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Order not found</h2>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = order.lineItems?.reduce((total, item) => {
    const itemPrice = Number(item.price?.amount) || 0;
    const itemQuantity = Number(item.quantity) || 1;
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-8">Thank You for Your Order!</h2>
      <div className="flex flex-col gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Order Number</p>
              <p className="font-medium">{order.number}</p>
            </div>
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium">
                {new Date(order._createdDate!).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-medium">${totalPrice?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{order.status}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 