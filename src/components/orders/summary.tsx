import { PrimaryButton, SecondaryButton } from '@components/base/buttons';
import { Box, Hr, Image, Text } from '@components/base/foundation';
import ListItem from '@components/elements/lists/item';
import { Order } from '@models/orders';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { formatCurrencyWithSymbol } from '@utils/currency-utils';
import { isEmpty } from 'lodash';
import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { AppStackDefinition } from 'routes/definitions';

const styles = {
  image: {
    width: 50,
    height: 50,
  },
};

const OrderSummary = ({ order }: { order: Order }) => {
  const navigation = useNavigation<StackNavigationProp<AppStackDefinition>>();
  const {
    orderNumber,
    total,
    financialStatus,
    confirmationStatus,
    createdAt,
    cancelledAt,
    lineItems,
    trackingURL,
  } = order;
  const track = () => Linking.openURL(trackingURL);
  return (
    <ScrollView>
      <Box backgroundColor="levelOneBg" pb={3}>
        <Box px={4} py={3}>
          <ListItem
            right={
              <Box alignItems="flex-end">
                <Text variant="body2" color="hintText">
                  Total:
                </Text>
                <Text variant="heading3">{formatCurrencyWithSymbol(total)}</Text>
              </Box>
            }
          >
            <Text variant="body1">Order Number: #{orderNumber}</Text>
            <Text variant="body2" color="hintText">
              Order Date: {createdAt}
            </Text>
          </ListItem>
        </Box>
        <Hr />
        {!isEmpty(lineItems) &&
          lineItems?.map((item, index) => (
            <Box
              flexDirection="row"
              alignItems="center"
              key={index.toString()}
              mx={4}
              py={2}
              borderColor="levelOneBorder"
              borderTopWidth={index === 0 ? 0 : 1}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text
                variant="heading3"
                ml={2}
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ flexWrap: 'wrap', flex: 1 }}
              >
                {item.name}
              </Text>
            </Box>
          ))}
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          mx={4}
          borderTopWidth={1}
          borderColor="levelOneBorder"
          pt={3}
          style={{ gap: 8 }}
        >
          <SecondaryButton
            title="VIEW DETAILS"
            onPress={() => {
              crashlytics().log(`navigating on order details : ${order.id}`);
              navigation.push('OrderDetails', { order })
            }}
          />
          <PrimaryButton
            title={
              cancelledAt
                ? 'CANCELLED'
                : confirmationStatus === 'CANCELLED'
                  ? 'CANCELLED'
                  : trackingURL
                    ? 'Track Order'
                    : financialStatus?.toUpperCase()
            }
            onPress={trackingURL ? track : undefined}
            disabled={
              cancelledAt || confirmationStatus === 'CANCELLED' ? true :
                trackingURL
                  ? false
                  : true}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default OrderSummary;
