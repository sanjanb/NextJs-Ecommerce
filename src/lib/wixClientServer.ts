import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
import { members } from '@wix/members';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';

export const wixClientServer = async () => {
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
        refreshToken: {
          value: process.env.WIX_REFRESH_TOKEN,
          expiresAt: 0,
        },
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
