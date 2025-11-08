import AppModal from '@components/app-modal';
import OfferAppliedModal from '@components/cart/offer-applied-modal';
import OZCashForCart from '@components/cart/oziva-cash-cart';
import useCart from '@hooks/cart';
import { FetchCartParam } from '@models/cart/fetchcart';
import { trackMoEngageAppEvent } from '@utils/common';
import { height } from '@utils/constants';
import {
    convertToRupees,
    formatCurrencyWithSymbol,
} from '@utils/currency-utils';
import { useCheckoutState } from 'context/checkout';
import { useModalsState } from 'context/modals';
import { useNotificationState } from 'context/notifications';
import React, { useEffect, useState } from 'react';
import { Keyboard, ListRenderItem, Pressable, ScrollView, View } from 'react-native';

import { Box, Text } from '@components/base/foundation';
import TextInput from '@components/base/textInput';
import WhiteCard from '@components/elements/card/white-card';
import Loader from '@components/elements/loader/loader';
import LoginModal from '@components/login/standard/login-modal';
import { useCartState } from '@context/cart/CartContext';
import { Offer } from '@models/offers';
import crashlytics from '@react-native-firebase/crashlytics';
import { commonStyles } from '@styles/common';

const ShopOffersContainer = ({ navigation,route }) => {
  const {
    cartItems,
    isOzivaCashSelected,
    cartLoading,
    totalDiscount,
    offerList
  } = useCartState();
  const { trackingTransparency } = useNotificationState();
  const { discount_code: discountCode } = useCheckoutState();
  const [customDiscountCode, setcustomDiscountCode] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getCart } = useCart();
  const { loginModalVisbility } = useModalsState();
  
  const showConfetti = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      navigation.navigate('CartScreen');
      setShowSuccessModal(false);
    }, 4000);
  };

  useEffect(() => {
    if (
      (isOzivaCashSelected || discountCode?.code) &&
      Number(totalDiscount) > 0
    ) {
      showConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOzivaCashSelected, totalDiscount, discountCode]);

  const renderOffer: ListRenderItem<any> = (item) => {
    const applyCode = () => {
      crashlytics().log(`Applied coupon : ${item.code}, ${JSON.stringify(cartItems)}`);
      let input: FetchCartParam = { code: item?.code };
      getCart(input);
      trackMoEngageAppEvent({
        event: `applied_coupon_app`,
        values: [
          { eventAttribute: 'coupon_code_applied', value: item?.code },
          { eventAttribute: 'coupon_id', value: item?.id ?? '' },
          {
            eventAttribute: 'coupon_code_type',
            value: item?.type,
          },
          {
            eventAttribute: 'coupon_code_description',
            value: item?.description,
          },
        ],
        trackingTransparency,
      });
    };
    return (
      <>
        <Box pt={3} key={item?.code} style={[commonStyles.pt0]} />
        <View style={[commonStyles.offerCardBox]}>
          <View style={[commonStyles.borderLeftGreen, commonStyles.mr8]}></View>
          <View style={[commonStyles.pad8, { flex: 0.7 }]}>
            <Text style={[commonStyles.h3Tag, commonStyles.mb0]}>
              {item.description}
            </Text>
            {item.validOn ? (
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.grayColor,
                  commonStyles.mt4,
                ]}
              >
                {item.validOn}
              </Text>
            ) : null}
            <Text style={[commonStyles.fs13, commonStyles.mt8]}>
              <Text
                style={[
                  commonStyles.lightGreenColor,
                  commonStyles.fwBold,
                  commonStyles.fs14,
                ]}
              >
                {item.code}
              </Text>
            </Text>
          </View>
          <View
            style={[
              commonStyles.pt8,
              { flex: 0.3, alignItems: 'flex-end', marginRight: 15 },
            ]}
          >
            <Pressable onPress={applyCode}>
              <View>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fwBold,
                    {color: '#FF6F00'}
                  ]}
                >
                  APPLY
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  const handleChange = text => {
    setcustomDiscountCode(text.trim().toUpperCase());
  };
  const handleApplyOffers = () => {
    Keyboard.dismiss();
    if(customDiscountCode){
      let input: FetchCartParam = { code: customDiscountCode.toUpperCase() };
      getCart(input);
    }
  };

  return (
    <Box flex={1} backgroundColor="levelOneBg">
      <Box>
        <WhiteCard noBorderRadius>
          <View
            style={{
              borderRadius: 2,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <TextInput
                style={[
                  commonStyles.border0,
                  commonStyles.pl16,
                  commonStyles.fs14,
                ]}
                value={customDiscountCode}
                onChangeText={handleChange}
                placeholder="Enter Coupon/Gift card code"
                placeholderTextColor="#7E7E7E"
              />
            </View>
            <View style={[commonStyles.pr16]}>
              <Pressable onPress={handleApplyOffers}>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fwBold,
                    {color: '#FF6F00'}
                  ]}
                >
                  APPLY
                </Text>
              </Pressable>
            </View>
          </View>
          <Text
            style={[
              commonStyles.fs14,
              commonStyles.mt16,
              commonStyles.grayColor,
            ]}
          >
            You can either apply OZiva Cash or Offer
          </Text>
          <View
            style={[
              commonStyles.mt16,
              commonStyles.borderAll,
              commonStyles.radius4,
            ]}
          >
            <Text
              style={[
                commonStyles.h2Tag,
                commonStyles.pad8,
                commonStyles.borderBottom,
              ]}
            >
              OZiva Cash
            </Text>
            <View style={[commonStyles.pad8, commonStyles.pt0]}>
              <OZCashForCart fetchOffersLoading={loading} />
            </View>
          </View>
          {loading || cartLoading ? (
            <Loader />
          ) : (
            <>
              <Text style={[commonStyles.h2Tag, commonStyles.mt16]}>
                Offers
              </Text>
              <View style={{ height: height * 0.5 }}>
                <ScrollView>
                  {offerList && offerList.map((item: Offer) => renderOffer(item))}
                </ScrollView>
              </View>
            </>
          )}
        </WhiteCard>
      </Box>
      <AppModal
        animateFrom="center"
        modalVisible={showSuccessModal}
        component={() => (
          <OfferAppliedModal
            text1={`${
              isOzivaCashSelected ? `'OZiva Cash'` : `${discountCode?.code}`
            } Applied`}
            text2={`You save ${formatCurrencyWithSymbol(
              convertToRupees(
                Number(totalDiscount)
              ),
            )} on your purchase`}
            isLoginFailed={false}
          />
        )}
        style={{ borderRadius: 10 }}
        onBackButtonPress={() => {
          setShowSuccessModal(false);
          navigation.navigate('CartScreen');
        }}
      />
      {loginModalVisbility ? <LoginModal /> : null}
    </Box>
  );
};

export default ShopOffersContainer;
