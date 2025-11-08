import {
    convertToRupees,
    formatCurrencyWithSymbol,
} from '@utils/currency-utils';
import { useCartState } from 'context/cart/CartContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InfoIcon from '@assets//images/icons/info-icon';
import OzivaCashWalletIconComponent from '@assets//images/icons/oziva-cash-icons/oziva-cash-wallet-icon';
import OZPrimeLogo from '@assets//images/icons/prime-icons/oziva-prime-logo';
import { PrimeMemberShipType } from '@models/prime';
import { commonStyles } from '@styles/common';
import { checkIfPrimeItemAddedInCart } from '@utils/cart';
import { useAuthState } from 'context/auth';
import { useCheckoutState } from 'context/checkout';
import { Tooltip } from 'react-native-elements';
import { CustomText } from '../../../../../AndroidFontFix';

const styles = StyleSheet.create({
  cartSubtotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

const CartPriceDetails = (): React.ReactElement | null => {
  const {
    cartItems,
    orderSubtotal,
    orderTotal,
    shippingCharges,
    totalDiscount,
    orderTotalMRP,
    cashback,
    isOzivaCashSelected,
    isSubscriptionItem,
  } = useCartState();
  const { discount_code: discountCode } = useCheckoutState();
  const { userData } = useAuthState();

  if (cartItems.length === 0) {
    return null;
  }
  const isPrime = userData?.prime?.current_status == PrimeMemberShipType.Prime;
  const totalCashBack = isPrime
    ? convertToRupees(cashback) + Math.floor(convertToRupees(orderTotal) * 0.15)
    : convertToRupees(cashback);

  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 4,
          margin: 4,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            padding: 8,
            marginBottom: 2,
            borderBottomWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <CustomText style={[commonStyles.fs16, commonStyles.fwBold]}>
            Price Details
          </CustomText>
        </View>
        <View style={{ padding: 8 }}>
          <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.fs14]}>Total MRP</Text>
            <Text style={[commonStyles.fs14]}>
              {formatCurrencyWithSymbol(convertToRupees(orderTotalMRP))}
            </Text>
          </View>
          {orderTotalMRP - orderSubtotal > 0 ? (
            <View style={styles.cartSubtotalItem}>
              <Text style={[commonStyles.fs14]}>Discount on MRP</Text>
              <Text style={[commonStyles.fs14]}>
                -
                {formatCurrencyWithSymbol(
                  convertToRupees(orderTotalMRP - orderSubtotal),
                )}
              </Text>
            </View>
          ) : null}
          <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.fs14, commonStyles.fwBold, commonStyles.darkGreenText]}>{checkIfPrimeItemAddedInCart(cartItems) ? '3 Months' : '1 Month'}  Consultation</Text>
            <Text style={[commonStyles.fs14, commonStyles.fwBold, commonStyles.darkGreenText]}>
              <>
                <Text style={[commonStyles.strikeText, commonStyles.darkGreenText]}>
                  {checkIfPrimeItemAddedInCart(cartItems) ? formatCurrencyWithSymbol(2449) : formatCurrencyWithSymbol(1449)}
                </Text>
                <Text style={[commonStyles.darkGreenText]}>{` FREE`}</Text>
              </>
            </Text>
          </View>
          {!isSubscriptionItem && (discountCode?.code || isOzivaCashSelected) ? (
            <View style={styles.cartSubtotalItem}>
              <View
                style={[
                  commonStyles.flexD,
                  { justifyContent: 'space-between', flex: 1 },
                ]}
              >
                <Text style={[commonStyles.fs14]}>
                  Discount{' '}
                  <Text style={[commonStyles.darkGreenText, commonStyles.fwBold]}>
                    {isOzivaCashSelected
                      ? 'OZiva Cash applied'
                      : discountCode?.code}
                  </Text>
                </Text>
                <Text style={[commonStyles.fs14, commonStyles.darkGreenText]}>
                  {totalDiscount > 0 ? (
                    <>
                      -
                      {formatCurrencyWithSymbol(
                        convertToRupees(totalDiscount),
                      )}
                    </>
                  ) : (
                    '00'
                  )}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.cartSubtotalItem}>
            <View style={[commonStyles.flexD, {marginBottom: 8}]}>
              <Text style={[commonStyles.fs14]}>Delivery Charges</Text>
            </View>
            <Text style={[commonStyles.fs14]}>
              <>
                <Text style={[commonStyles.strikeText]}>
                  {formatCurrencyWithSymbol(99)}
                </Text>
                <Text style={[commonStyles.darkGrayColor]}>{` FREE`}</Text>
              </>
            </Text>
          </View>
          {shippingCharges !== 0 ? <View style={styles.cartSubtotalItem}>
            <View style={[commonStyles.flexD]}>
              <Text style={[commonStyles.fs14]}>COD Charges
              </Text>
            </View>
            <Text style={[commonStyles.fs14]}>
              {shippingCharges !== 0 ? (
                <Text>
                  {formatCurrencyWithSymbol(
                  convertToRupees(Number(shippingCharges)),
                  )}
                </Text>
              ) : null}
            </Text>
          </View> : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 4,
              paddingHorizontal: 8,
              borderTopWidth: 1,
              borderColor: '#E0E0E0',
              marginHorizontal: -8,
            }}
          >
            <Text style={[commonStyles.fs16, commonStyles.fwBold]}>Total</Text>
            <Text style={[commonStyles.fs16, commonStyles.fwBold]}>
              {formatCurrencyWithSymbol(convertToRupees(orderTotal))}
            </Text>
          </View>
          {totalCashBack > 0 ? (
            <View
              style={[
                commonStyles.flexD,
                {
                  paddingHorizontal: 8,
                  borderTopWidth: 1,
                  borderColor: '#E0E0E0',
                  marginHorizontal: -8,
                  marginTop: 4,
                  paddingTop: 4,
                  alignItems: 'center',
                },
              ]}
            >
              <View style={[commonStyles.mr8]}>
                {isPrime ? (
                  <OZPrimeLogo />
                ) : (
                  <>
                    <OzivaCashWalletIconComponent width={24} height={24} />
                  </>
                )}
              </View>
              <View style={[commonStyles.flexD]}>
                <Text style={[commonStyles.fs14, commonStyles.darkGreenText]}>
                  You earn{' '}
                  <Text style={[commonStyles.fw500]}>
                    {totalCashBack} OZiva Cash
                  </Text>{' '}
                  on this order
                </Text>
                <Tooltip
                  overlayColor="rgba(250, 250, 250, 0)"
                  containerStyle={{
                    width: 'auto',
                    minHeight: 40,
                    height: 'auto',
                    borderRadius: 2,
                  }}
                  popover={
                    <Text style={[commonStyles.textWhite, commonStyles.fs12]}>
                      {isPrime && (
                        <>
                          <Text>
                            Prime Member Discount:{' '}
                            {Math.floor(convertToRupees(orderTotal) * 0.15)}
                          </Text>
                          {cashback ? '\n' : null}
                        </>
                      )}
                      {cashback ? (
                        <Text>
                          {isPrime ? '+' : ''} {discountCode?.code} Discount:{' '}
                          {convertToRupees(cashback)}
                        </Text>
                      ) : null}
                    </Text>
                  }
                  backgroundColor="#000"
                  withOverlay={false}
                  skipAndroidStatusBar={true}
                >
                  <InfoIcon />
                </Tooltip>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default CartPriceDetails;
