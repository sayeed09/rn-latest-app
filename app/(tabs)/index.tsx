import AppProviders from '@/src/context';
import { CartContextProvider } from '@/src/context/cart/CartContext';
import { CheckoutProvider } from '@/src/context/checkout';
import DeepLinkProvider from '@/src/context/deeplink-provider';
import { ModalsProvider } from '@/src/context/modals';
import { NotificationProvider } from '@/src/context/notifications';
import { ProductProvider } from '@/src/context/product';
import { SearchProvider } from '@/src/context/search';
import { ShopProvider } from '@/src/context/shop';
import HomePage from "containers/home/index";
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function HomeScreen() {
  const [navigationRefReady, setNavigationRefReady] = useState(false);

  return (
    <SafeAreaView>
      <ShopProvider>
        <CheckoutProvider>
          <ModalsProvider>
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <AppProviders>
                  <SearchProvider>
                    <DeepLinkProvider navigationRefReady={navigationRefReady}>
                      <CartContextProvider>
                        <ProductProvider>
                          <HomePage navigation={undefined} />

                        </ProductProvider>

                      </CartContextProvider>
                    </DeepLinkProvider>

                  </SearchProvider>


                </AppProviders>

              </QueryClientProvider>

            </NotificationProvider>

          </ModalsProvider>

        </CheckoutProvider>

      </ShopProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
