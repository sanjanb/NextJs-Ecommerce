"use client";

import { collections } from "@wix/stores";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

interface CategoryDetailProps {
  slug: string;
}

const CategoryDetail = ({ slug }: CategoryDetailProps) => {
  const [category, setCategory] = useState<collections.Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const wixClient = createWixClient();
        const res = await wixClient.collections.queryCollections().find();
        const foundCategory = res.items.find((item) => item.slug === slug);
        if (foundCategory) {
          setCategory(foundCategory);
        }
        setLoading(false);
      } catch (err) {
        setError("Error loading category. Please try again later.");
        setLoading(false);
        console.error("Error fetching category:", err);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return <div className="mt-12">Loading category...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  if (!category) {
    return <div className="mt-12">Category not found</div>;
  }

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-semibold mb-8">{category.name}</h1>
      <ProductList categoryId={category._id!} limit={12} />
    </div>
  );
};

export default CategoryDetail; 