"use client";

import { products } from "@wix/stores";
import { createWixClient } from "@/lib/wixClient";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import Add from "./Add";
import { useEffect, useState } from "react";

const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit: number;
  searchParams?: any;
}) => {
  const [productList, setProductList] = useState<products.Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const wixClient = createWixClient();
        const res = await wixClient.products
          .queryProducts()
          .eq("collectionIds", categoryId)
          .limit(limit)
          .find();
        setProductList(res.items);
        setLoading(false);
      } catch (err) {
        setError("Error loading products. Please try again later.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categoryId, limit]);

  if (loading) {
    return <div className="mt-12">Loading products...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {productList.map((product: products.Product) => (
        <div
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <Link href={"/" + product.slug} className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt={product.name || "Product image"}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              priority={true}
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt={product.name || "Product image"}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </Link>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        </div>
      ))}
      {productList.length > 0 && (
        <Pagination
          currentPage={1}
          hasPrev={false}
          hasNext={productList.length === limit}
        />
      )}
    </div>
  );
};

export default ProductList;
