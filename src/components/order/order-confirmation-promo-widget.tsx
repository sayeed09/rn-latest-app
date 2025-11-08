import { setChatWootModal } from '@actions/modals';
import ChatlineAccessRestriction from '@components/chatwoot/chatline-access-restriction';
import Loader from '@components/elements/loader/loader';
import useLogin from '@hooks/login';
import { UserDetails, UserProfileResponseModel } from '@models/auth';
import { ICustomAttributes } from '@models/chatwoot';
import {
    ChatWootUser
} from '@models/prime';
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfileDataService, userAuthCheckService } from '@services/user';
import {
    chatWootBaseURL,
    chatWootWebsiteToken,
    ozivaPrimeProductId,
} from '@utils/constants';
import { useAuthState } from 'context/auth';
import { useCartState } from 'context/cart/CartContext';
import { useModalsDispatch, useModalsState } from 'context/modals';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { PrimeThankYou } from './order-confirmation-promo-thank-you/prime-member';
const OrderConfirmationPopupWidget = ({
  orderDetails,
  navigation,
}): React.ReactElement => {
  const modalsDispatch = useModalsDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authCheckLoading, setAuthCheckLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfileResponseModel>();
  const { chatWootModalVisibility } = useModalsState();
  const { user: authUser } = useAuthState();
  const { cartItems } = useCartState();
  const { handleLogout } = useLogin();
  const isPrime = cartItems.some(
    data => data.productId === ozivaPrimeProductId,
  );
  const [userCustomAttributes, setUserCustomAttributes] =
    useState<ICustomAttributes>({
      identifier_hash: '',
      user_phone_no: '',
      initiated_from: '',
      chatting_from: '',
    });

  const getUserProfile = () => {
    setLoading(true);
    getUserProfileDataService()
      .then((data: UserProfileResponseModel) => {
        userAuthCheck();
        setUserProfileData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 401){
          handleLogout();
          navigation.navigate('CartScreen');
        }
      });
  }


  const getDelayedUserProfile = ms => {
    setTimeout(() => {
      getUserProfile();
      setLocalLoading(false);
    }, ms);
  };

  useEffect(() => {
    if (isPrime) {
      setLocalLoading(true);
      getDelayedUserProfile(5000);
    } else {
      getUserProfile();
    }
  }, []);
  
  const userAuthCheck = () => {
    setAuthCheckLoading(true);
    const payload = {
      phone: authUser?.phone,
      productID: null,
      orderID: null,
      hash: authUser?.authToken,
    };
    userAuthCheckService(payload).then(response => {
      setAuthCheckLoading(false);
    }).catch(err => {
      console.log("Error : ", err);
      setAuthCheckLoading(false);
    })
  }
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('focus', async () => {
        getDelayedUserProfile(5000);
      });

      return unsubscribe;
    }, [navigation]),
  );
  const [primeUserDetails, setPrimeUserDetails] = useState<ChatWootUser>({
    avatar_url: '',
    email: '',
    identifier: '',
    identityHash: '',
    phone: '',
    name: '',
  });

  useEffect(() => {
    
    if (userProfileData?.userDetails) {
      const user: UserDetails = userProfileData?.userDetails;
      const customAttributes: ICustomAttributes = {
        identifier_hash: userProfileData?.identityHash ?? '',
        user_phone_no: authUser?.phone ?? '',
        initiated_from: `thankyou_screen_${Platform.OS}_app`,
        chatting_from: `thank_you_page_${Platform.OS}_app`,
      };

      //To make it future proof, once deeplink available for the app;
      if (false) {
        customAttributes.campaign_source = 'campaign_source';
      }
      setUserCustomAttributes(customAttributes);
      setPrimeUserDetails({
        avatar_url: '',
        identifier: authUser?.phone ?? '',
        name: `${user.firstName} ${user.lastName}`,
        phone: authUser?.phone ?? '',
        identifier_hash: userProfileData?.identityHash ?? '',
      });
    }
  }, [userProfileData, authUser?.phone]);
  return !localLoading && !loading ? (
    <>
      <PrimeThankYou
        userDetails={userProfileData?.userDetails}
        orderDetails={orderDetails}
      />
      {chatWootModalVisibility && !authCheckLoading ? (
        <ChatlineAccessRestriction
          locale="en"
          websiteToken={chatWootWebsiteToken}
          baseUrl={chatWootBaseURL}
          closeModal={() => modalsDispatch(setChatWootModal(false))}
          isModalVisible={chatWootModalVisibility}
          user={primeUserDetails}
          customAttributes={userCustomAttributes}
          isConsult={false}
          chatlineAccess={userProfileData?.chatlineAccess}
          screenName="OrderConfirmationScreen"
        />
      ) : null}
    </>
  ) : (
    <Loader />
  );
};

export default OrderConfirmationPopupWidget;
