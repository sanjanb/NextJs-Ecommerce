import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  try {
    const wixClient = await wixClientServer();

    let productQuery = wixClient.products.queryProducts();

    // Build query step by step
    if (searchParams?.name) {
      productQuery = productQuery.startsWith("name", searchParams.name);
    }

    if (categoryId?.trim()) {
      productQuery = productQuery.eq("collectionIds", categoryId);
    }

    if (searchParams?.type) {
      productQuery = productQuery.hasSome("productType", [searchParams.type]);
    } else {
      productQuery = productQuery.hasSome("productType", [
        "physical",
        "digital",
      ]);
    }

    if (searchParams?.min) {
      productQuery = productQuery.gt("priceData.price", searchParams.min);
    }

    if (searchParams?.max) {
      productQuery = productQuery.lt("priceData.price", searchParams.max);
    }

    // Apply sorting if specified
    if (searchParams?.sort) {
      const [sortType, sortBy] = searchParams.sort.split(" ");
      productQuery =
        sortType === "asc"
          ? productQuery.ascending(sortBy)
          : productQuery.descending(sortBy);
    }

    // Apply pagination
    productQuery = productQuery
      .limit(limit || PRODUCT_PER_PAGE)
      .skip(
        searchParams?.page
          ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
          : 0
      );

    const res = await productQuery.find();

    return (
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
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
            <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))}
        {searchParams?.cat || searchParams?.name ? (
          <Pagination
            currentPage={res.currentPage || 0}
            hasPrev={res.hasPrev()}
            hasNext={res.hasNext()}
          />
        ) : null}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="mt-12">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
};

export default ProductList;
