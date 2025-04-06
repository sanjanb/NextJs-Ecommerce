"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Filter from "@/components/Filter";

type Product = products.Product;

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const wixClient = await wixClientServer();
        let query = wixClient.products.queryProducts();

        if (selectedCategory) {
          query = query.eq("collectionIds", selectedCategory);
        }

        if (searchQuery) {
          query = query.startsWith("name", searchQuery);
        }

        const res = await query.find();
        setProducts(res.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lama"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Filter
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found. Try adjusting your search or filters.
          </div>
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