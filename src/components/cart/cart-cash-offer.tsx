import { setOfferList, toggleOzivaCashSelection } from '@actions/cart';
import { setDiscountCode } from '@actions/checkout';
import AppModal from '@components/app-modal';
import { StyledActionButton } from '@components/base/button/styled';
import TextInput from '@components/base/textInput';
import { BaseView } from '@components/base/view';
import Loader from '@components/elements/loader/loader';
import { gray7E } from '@components/styles/colors';
import useCart from '@hooks/cart';
import useLogin from '@hooks/login';
import { FetchCartParam } from '@models/cart/fetchcart';
import { Offer } from '@models/offers';
import { cartService } from '@services/cart';
import { commonStyles } from '@styles/common';
import {
    convertToRupees,
    formatCurrencyWithSymbol,
} from '@utils/currency-utils';
import { useAuthState } from 'context/auth';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';
import OfferAppliedModal from './offer-applied-modal';

const CashCartOffer = ({ navigation }): React.ReactElement | null => {
  const [customDiscountCode, setCustomDiscountCode] = useState('');
  const {
    isOzivaCashSelected,
    cartItems,
    orderSubtotal,
    shippingCharges,
    totalDiscount,
    orderTotalMRP,
    offerList
  } = useCartState();
  const totalSavings = orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0);
  const { discount_code: discountCode } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ozivaCash, setOzivaCash] = useState();
  const [couponList, setCouponList] = useState<Offer[]>([]);
  const cartDispatch = useCartDispatch();
  const { user, isAuthenticated } = useAuthState();
  const { getCart } = useCart();
  const { handleLogout } = useLogin();

  const getOfferList = () => {
    const variables = {
      category: 'CART',
      productIds: cartItems
        .filter(item => item?.productId)
        .map(item => item.productId ? item.productId.toString() : '') ?? '',
      variantIds: cartItems.map(item => item.id.toString()),
    };
    cartService.fetchOffersService(variables).then(response => {
      if (response && response?.data?.length > 0) {
        setCouponList(response.data);
        cartDispatch(setOfferList(response.data));
      } else {
        setCouponList([]);
        cartDispatch(setOfferList([]));
      }
    }).catch(err => {
      console.log("Error while fetching offers : ", err);
    })
  }

  const ozivaCashValue = () => {
    setLoading(true);
    const payload = {
      cartValue: convertToRupees(
        Number(orderSubtotal) - Number(shippingCharges),
      ),
      phone: user?.phone,
    };
    cartService.ozivaCashValueService(payload).then(response => {
      setOzivaCash(response);
      setLoading(false);
    }).catch(err => {
      console.log("Error : ", err);
      setLoading(false);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        handleLogout();
      }
    })
  }
  const handleApplyOffers = () => {
    Keyboard.dismiss();
    if (customDiscountCode) {
      let input: FetchCartParam = {
        code: customDiscountCode.toUpperCase(),
      };
      getCart(input).then(data => {
        if (data?.total_discount) {
          showConfetti();
        }
      });
      setCustomDiscountCode('');
    }
  };

  const showConfetti = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 4000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      ozivaCashValue();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getOfferList();
  }, []);

  if (cartItems.length === 0) {
    return null;
  }

  const couponDescriptionText = offerList.length > 0 ? offerList.filter(offers => offers.code === discountCode?.code)[0]?.description : ''

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={[
            commonStyles.borderAll,
            commonStyles.radius4,
            commonStyles.bgWhite,
            commonStyles.mh4,
            commonStyles.mb8,
            commonStyles.mt8,
          ]}
        >
          {totalSavings ? <View style={[
            commonStyles.borderBottom,
            commonStyles.flex,
            commonStyles.flexRow,
            commonStyles.alignCenter,
            commonStyles.pb10,
            commonStyles.pt10,
            commonStyles.pl8
          ]}>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>
              Savings Corner
            </Text>
            <Text style={[commonStyles.ml4, styles.totalSavings]}>Total Savings: ₹{totalSavings / 100}</Text>
          </View> : <></>}
          <BaseView
            row
            AlignLeft
            style={[
              commonStyles.pad8,
              { justifyContent: 'space-between' },
            ]}
          >
            <View
              style={[
                commonStyles.flexD,
                { flex: 1, justifyContent: 'space-between', marginTop: 8 },
              ]}
            >
              <View
                style={[commonStyles.flexD, commonStyles.pr16, { flex: 0.8 }]}
              >
                <View style={[commonStyles.mr4]}>
                  {discountCode?.code ? <SvgRenderer
                    source={{
                      uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Coupon.svg?v=1751538407',
                    }}
                  /> : <Image source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/OZiva_Cash.png?v=1756808006' }} width={24} height={24} />}
                </View>
                <View>
                  <Text style={{ fontSize: 14 }}>
                    {
                      discountCode?.code ? (
                        <>
                          <Text>{couponDescriptionText ?? ''}</Text>
                          <Text style={[commonStyles.grayColor]}> with {discountCode?.code}</Text>
                        </>
                      ) : isOzivaCashSelected ? (
                        <>
                          <Text>₹{ozivaCash?.redeemable_cash} saved</Text>
                          <Text style={[commonStyles.grayColor]}> with OZiva Cash</Text>
                        </>
                      ) : 'Apply OZiva Cash & Offers'
                    }

                  </Text>
                  {!discountCode?.code && !isOzivaCashSelected ? (
                    <Text
                      style={{ fontFamily: 'Roboto-Regular', color: gray7E }}
                    >
                      Save{' '}
                      {ozivaCash?.redeemable_cash
                        ? `₹${ozivaCash?.redeemable_cash}`
                        : '₹375'}{' '}
                      by using OZiva Cash
                    </Text>
                  ) : null}
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    if (
                      totalDiscount &&
                      (discountCode?.code || isOzivaCashSelected)
                    ) {
                      cartDispatch(toggleOzivaCashSelection(false));
                      let input: FetchCartParam = { code: '' };
                      getCart(input);
                      checkoutDispatch(setDiscountCode({ code: '' }));
                    } else {
                      navigation.push('ShopOffersScreen');
                    }
                  }}
                >
                  <Text
                    style={{
                      color: '#FF6F00',
                      fontWeight: 'bold',
                    }}
                  >
                    {discountCode?.code || isOzivaCashSelected
                      ? 'REMOVE'
                      : 'VIEW OFFERS'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </BaseView>
          {(orderSubtotal && (orderTotalMRP - orderSubtotal > 0)) ? <View style={styles.mrpSavingContainer}>
            <View style={styles.mrpSaving}>
              <SvgRenderer
                source={{
                  uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Coupon.svg?v=1751538407',
                }}
              />
              <Text style={styles.mrpSavingText}>
                ₹{(orderTotalMRP - orderSubtotal) / 100} saved with product price drop!
              </Text>
            </View>
            <View style={styles.appliedTextContainer}>
              <SvgRenderer
                source={{
                  uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/done.svg?v=1751376837',
                }}
              />
              <Text style={styles.appliedText}>Applied</Text>
            </View>
          </View> : <></>}

          <View
            style={styles.offerInputBox}
          >
            <View>
              <TextInput
                style={[
                  commonStyles.border0,
                  commonStyles.pl8,
                  commonStyles.fs14,
                ]}
                value={customDiscountCode}
                onChangeText={text => setCustomDiscountCode(text.trim())}
                placeholder="Enter Coupon/Gift card code"
                placeholderTextColor="#7E7E7E"
                autoCorrect={false}
                autoCapitalize="characters"
              />
            </View>
            <View style={[commonStyles.pr8]}>
              <StyledActionButton onPress={handleApplyOffers}>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fwBold,
                    { color: '#FF6F00' }
                  ]}
                >
                  APPLY
                </Text>
              </StyledActionButton>
            </View>
          </View>
        </View>
      )}
      <AppModal
        animateFrom="center"
        modalVisible={showSuccessModal}
        component={() => (
          <OfferAppliedModal
            text1={`${isOzivaCashSelected ? `'OZiva Cash'` : `${discountCode?.code}`
              } Applied`}
            text2={`You save ${formatCurrencyWithSymbol(
              convertToRupees(totalDiscount),
            )} on your purchase`}
            isLoginFailed={false}
          />
        )}
        style={{ borderRadius: 10 }}
        onBackButtonPress={() => {
          setShowSuccessModal(false);
        }}
      />
    </>
  );
};

export default CashCartOffer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  totalSavings: {
    backgroundColor: '#E7FFE1',
    color: '#006E5A',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 400,
  },
  offerInputBox: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  mrpSavingText: {
    fontSize: 14,
    marginLeft: 4
  },
  mrpSavingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 8
  },
  mrpSaving: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedText: {
    fontWeight: '500',
    color: '#5EB24B',
  },
  appliedTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});