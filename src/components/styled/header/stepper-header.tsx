import { setIsCartUpgraded } from '@actions/cart';
import { commonStyles } from '@styles/common';
import { width } from '@utils/constants';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import SvgRenderer from 'react-native-svg-renderer';

const stepperVisibility = ['CartScreen', 'AddressOrderSummaryScreen', 'PaymentMethodScreen'];
const routeArray = [{ screenName: 'CartScreen', name: 'Cart', isActive: false }, { screenName: 'AddressOrderSummaryScreen', name: 'Address', isActive: false }, { screenName: 'PaymentMethodScreen', name: 'Payment', isActive: false }];

const StepperHeader = ({ navigation }) => {
    const navState = navigation?.getState();
    const currentRouteName = navState ? navState?.routes[navState.index]?.name : null;
    const [updateRouteList, setUpdateRouteList] = useState(routeArray);
    const { orderSubtotal, orderTotalMRP, totalDiscount, cartItems, cartLoading } = useCartState();
    const cartDispatch = useCartDispatch();

    const savings = orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0);

    const getSteppers = () => {
        const indexOfCurrentScreen = routeArray.findIndex(route => route.screenName === currentRouteName);
        if (indexOfCurrentScreen > -1) {
            const activeSteppersList = routeArray.slice(0, indexOfCurrentScreen + 1).map(route => {
                return { ...route, isActive: true }
            });
            const inActiveSteppersList = routeArray.slice(indexOfCurrentScreen + 1, routeArray.length).map(route => {
                return { ...route, isActive: false }
            });
            setUpdateRouteList([...activeSteppersList, ...inActiveSteppersList]);
        };
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getSteppers();
        });
        cartDispatch(setIsCartUpgraded(false));

        return unsub;
    }, [navigation]);

    return (
        <>
            {(cartItems && cartItems.length > 0) ?
                <Shadow
                    distance={(currentRouteName == 'CartScreen' && savings > 0 && !cartLoading) ? 20 : 0}
                    style={[styles.shadowContainer, { height: (savings > 0 && currentRouteName == 'CartScreen' && !cartLoading) ? 110 : 'auto' }]}>
                    <View style={[commonStyles.flex, commonStyles.flexRow, commonStyles.alignCenter, { width: width }]}>
                        <View>
                            <TouchableOpacity
                                style={commonStyles.pl16}
                                onPress={() => navigation.goBack()}>
                                <SvgRenderer
                                    style={styles.leftArrowIcon}
                                    source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/arrow.svg?v=1755707998' }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[commonStyles.flex, commonStyles.flexRow, commonStyles.alignCenter, styles.stepperContainer, commonStyles.justifySpaceAround]}>
                            <View>
                                <TouchableOpacity style={styles.stepItem}
                                    onPress={() => { navigation.navigate('CartScreen') }}>
                                    <Image
                                        source={{
                                            uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Cart`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[commonStyles.alignCenter, styles.activeNavLine, currentRouteName == 'CartScreen' ? commonStyles.borderLeftGreenDisabled : styles.activeColor]}></View>
                            <View>
                                <TouchableOpacity style={styles.stepItem}
                                    onPress={() => {
                                        if (currentRouteName === 'PaymentMethodScreen')
                                            navigation.navigate('AddressOrderSummaryScreen')
                                    }}>
                                    <Image
                                        source={{
                                            uri: currentRouteName != 'CartScreen' ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/greytick.png?v=1756792233'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Address`}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[commonStyles.alignCenter, styles.activeNavLine, currentRouteName == 'PaymentMethodScreen' ? styles.activeColor : commonStyles.borderLeftGreenDisabled]}></View>
                            <View>
                                <View style={styles.stepItem}>
                                    <Image
                                        source={{
                                            uri: currentRouteName == 'PaymentMethodScreen' ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/greentick.png?v=1756792234' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/greytick.png?v=1756792233'
                                        }} style={styles.stepIcon} />
                                    <Text>{`Payment`}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {currentRouteName === 'CartScreen' && (cartItems && cartItems.length > 0 && savings > 0 && !cartLoading) ? <View style={styles.cashbackContainer}>
                        <View style={styles.cashbackTextContainer}>
                            <SvgRenderer
                                source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/discount_icon_2.svg?v=1749714933' }}
                                style={styles.cashbackIcon}
                            />
                            <Text style={styles.savedText}>
                                <Text style={styles.highlightedText}>You saved ₹{savings / 100}</Text> on this order today!
                            </Text>
                        </View>
                    </View>
                        : <></>}
                </Shadow> :
                <View style={commonStyles.pl16}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <SvgRenderer
                            style={styles.leftArrowIcon}
                            source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/arrow.svg?v=1755707998' }}
                        />
                    </TouchableOpacity>
                </View>}
        </>
    );
};

const styles = StyleSheet.create({
    shadowContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#ffffff'
    },
    stepperContainer: {
        marginRight: 8,
    },
    activeNavLine: {
        height: 2,
        width: width * 0.15
    },
    activeColor: {
        backgroundColor: '#6BBD58',
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    leftArrowIcon: {
        width: 24,
    },
    stepIcon: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    cashbackContainer: {
        width: width,
        // paddingTop: 12,
        paddingHorizontal: 18,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 10,
        borderRadius: 20,
        zIndex: 1,
    },
    cashbackTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cashbackIcon: {
        width: 20,
        height: 20,
        marginRight: 2,
    },
    savedText: {
        fontSize: 14,
    },
    highlightedText: {
        fontWeight: 'bold',
        color: '#6BBD58'
    },

});

export default React.memo(StepperHeader);
