import { setLoginModal } from '@actions/modals';
import OzivaCashWalletIconComponent from '@assets//images/icons/oziva-cash-icons/oziva-cash-wallet-icon';
import { Text as CustomText } from '@components/base/foundation';
import { BaseView } from '@components/base/view';
import Loader from '@components/elements/loader/loader';
import { gray7E } from '@components/styles/colors';
import useCart from '@hooks/cart';
import useLogin from '@hooks/login';
import { FetchCartParam } from '@models/cart/fetchcart';
import { cartService } from '@services/cart';
import { width } from '@utils/constants';
import {
    convertToRupees,
    formatCurrencyWithSymbol,
} from '@utils/currency-utils';
import { useAuthState } from 'context/auth';
import { useCartState } from 'context/cart/CartContext';
import { useModalsDispatch } from 'context/modals';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    // paddingHorizontal: 0,
  },
});

const OZCashForCart = ({ fetchOffersLoading }): React.ReactElement | null => {
  const modalsDispatch = useModalsDispatch();
  const { isOzivaCashSelected, cartItems, orderSubtotal, shippingCharges } =
    useCartState();
  const { getCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [ozivaCash, setOzivaCash] = useState()
  const { handleLogout } = useLogin();

  const { user, isAuthenticated } = useAuthState();

  const ozivaCashValue = () => {
    setLoading(true);
    const payload =  {
      cartValue: convertToRupees(
        Number(orderSubtotal) - Number(shippingCharges),
      ),
      phone: user?.phone,
    };
    cartService.ozivaCashValueService(payload).then(response => {
      setOzivaCash(response);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      if(err?.response?.status === 401){
        handleLogout();
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      ozivaCashValue();
    }
  }, [isAuthenticated]);

  if (cartItems.length === 0 || fetchOffersLoading) {
    return null;
  }
  return (
    <>
      {user ? (
        loading ? (
          <Loader />
        ) : (
          <View
            style={[
              styles.container,
              [
                !ozivaCash?.redeemable_cash
                  ? { opacity: 0.3 }
                  : {},
              ],
            ]}
          >
            <BaseView row AlignLeft style={{ justifyContent: 'space-between' }}>
              <BaseView AlignLeft row>
                <OzivaCashWalletIconComponent />
                <BaseView AlignLeft style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 14,
                      maxWidth: width * 0.5,
                    }}
                  >
                    Use {ozivaCash?.redeemable_cash ?? 0} OZiva
                    Cash to get{' '}
                    {formatCurrencyWithSymbol(
                      Number(ozivaCash?.redeemable_cash ?? 0),
                    )}{' '}
                    off
                  </Text>
                  <Text style={{ fontFamily: 'Roboto-Regular', color: gray7E }}>
                    Your OZiva Cash balance is{' '}
                    {formatCurrencyWithSymbol(
                      ozivaCash?.oziva_cash,
                    ) ?? 0}
                  </Text>
                </BaseView>
              </BaseView>
              <BaseView AlignRight>
                <BaseView style={{ marginBottom: 5 }}>
                  <Pressable
                    onPress={() => {
                      if (+ozivaCash?.redeemable_cash) {
                        let input: FetchCartParam = {
                          code: '',
                          cashApply: true,
                        };
                        getCart(input);
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#FF6F00',
                        fontWeight: 'bold',
                      }}
                    >
                      APPLY
                    </Text>
                  </Pressable>
                </BaseView>
              </BaseView>
            </BaseView>
          </View>
        )
      ) : cartItems.length > 0 ? (
          <BaseView row style={{ justifyContent: 'space-between' }}>
            <BaseView row>
              <OzivaCashWalletIconComponent />
              <BaseView AlignLeft>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 14,
                    maxWidth: width * 0.5,
                    marginLeft: 10,
                  }}
                >
                  Use 375 OZiva Cash to get ₹375 off{' '}
                </Text>
                <Text
                  style={{ color: '#7E7E7E', fontSize: 12, marginLeft: 10 }}
                >
                  Save up to 15% by using OZiva Cash
                </Text>
              </BaseView>
            </BaseView>
            <BaseView style={{}}>
              <Pressable
                onPress={() => {
                  modalsDispatch(setLoginModal(true));
                }}
              >
                <CustomText
                  variant="heading3"
                  color="brandPrimary"
                  style={{
                    textTransform: 'uppercase',
                    color: '#FF6F00',
                  }}
                >
                  LOGIN
                </CustomText>
              </Pressable>
            </BaseView>
          </BaseView>
      ) : null}
    </>
  );
};

export default OZCashForCart;
