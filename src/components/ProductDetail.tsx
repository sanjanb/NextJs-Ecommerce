"use client";

import { products } from "@wix/stores";
import { createWixClient } from "@/lib/wixClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import Add from "./Add";

interface ProductDetailProps {
  slug: string;
}

const ProductDetail = ({ slug }: ProductDetailProps) => {
  const [product, setProduct] = useState<products.Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const wixClient = createWixClient();
        const res = await wixClient.products.queryProducts().eq("slug", slug).find();
        if (res.items.length > 0) {
          setProduct(res.items[0]);
        }
        setLoading(false);
      } catch (err) {
        setError("Error loading product. Please try again later.");
        setLoading(false);
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="mt-12">Loading product...</div>;
  }

  if (error) {
    return <div className="mt-12 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="mt-12">Product not found</div>;
  }

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.media?.mainMedia?.image?.url || "/product.png"}
            alt={product.name || "Product image"}
            fill
            className="object-cover rounded-md"
            priority={true}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-2xl font-medium">${product.price?.price}</p>
          {product.additionalInfoSections && (
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "description"
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
      </div>
    </div>
  );
};

export default ProductDetail; 