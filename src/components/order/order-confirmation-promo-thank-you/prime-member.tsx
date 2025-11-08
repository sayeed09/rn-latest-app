import { setChatWootModal } from '@actions/modals';
import WhiteCard from '@components/elements/card/white-card';
import { trackMoEngageAppEvent } from '@utils/common';
import { useModalsDispatch } from 'context/modals';
import { useNotificationState } from 'context/notifications';
import React from 'react';
import { Image, Pressable } from 'react-native';

export const PrimeThankYou = ({
  userDetails,
  orderDetails,
}): React.ReactElement => {
  const modalsDispatch = useModalsDispatch();
  const { trackingTransparency } = useNotificationState();
  return (
    <WhiteCard noBorderRadius style={{ marginBottom: 10 }}>
        <Pressable
          onPress={() => {
            trackMoEngageAppEvent({
              event: `thankyou_page_chat_with_expert_app`,
              values: [
                {
                  eventAttribute: 'Order ID',
                  value: orderDetails?.store_order_id,
                },
                { eventAttribute: 'Email ID', value: userDetails?.email },
                {
                  eventAttribute: 'Phone Number',
                  value: userDetails?.phone,
                },
              ],
              trackingTransparency,
            });
            modalsDispatch(setChatWootModal(true));
          }}
        >
        <Image
          source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_CWE.png?v=1698659549' }}
          style={{width: '100%', height: 180}}
        />
        </Pressable>
    </WhiteCard>
  );
};
