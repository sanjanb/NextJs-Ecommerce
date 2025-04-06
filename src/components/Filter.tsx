"use client";

import { collections } from "@wix/stores";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import Link from "next/link";

const Filter = () => {
  const [collectionsList, setCollectionsList] = useState<collections.Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const wixClient = createWixClient();
        const res = await wixClient.collections.queryCollections().find();
        setCollectionsList(res.items);
        setLoading(false);
      } catch (err) {
        setError("Error loading collections. Please try again later.");
        setLoading(false);
        console.error("Error fetching collections:", err);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <div className="mt-12">Loading collections...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-12 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Collections</h2>
      <div className="flex flex-col gap-2">
        {collectionsList.map((collection) => (
          <Link
            key={collection._id}
            href={`/category/${collection.slug}`}
            className="text-gray-600 hover:text-gray-900"
          >
            {collection.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Filter;
