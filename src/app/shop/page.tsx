"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";

type Product = products.Product;

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const wixClient = await wixClientServer();
        const res = await wixClient.products.queryProducts().find();
        setProducts(res.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductList
                key={product._id}
                categoryId={product.collectionIds?.[0] || ""}
                limit={1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage; 