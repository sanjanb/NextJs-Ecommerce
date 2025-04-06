"use client";

import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders, currentCart } from "@wix/ecom";
import { members } from '@wix/members';
import { redirects } from '@wix/redirects';
import Cookies from "js-cookie";

export const createWixClient = () => {
  const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
      currentCart,
      redirects,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
}; 