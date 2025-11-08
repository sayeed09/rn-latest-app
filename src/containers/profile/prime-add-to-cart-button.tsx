import { addProduct } from '@actions/cart';
import PrimaryButton from '@components/elements/button/primary-Button';
import { ProductCatalogResponse } from '@models/product-details/product';
import { fetchProductById } from '@services/product';
import { trackMoEngageAppEvent } from '@utils/common';
import { ozivaPrimeProductId } from '@utils/constants';
import { useCartDispatch } from 'context/cart/CartContext';
import { useNotificationState } from 'context/notifications';
import React, { useEffect, useState } from 'react';

interface IProps {
    text?: string;
    navigation: any;
}

const PrimeAddToCartButton = ({navigation, text}: IProps) => {

    const [primeProductDetails, setPrimeProductDetails] =
        useState<ProductCatalogResponse>();
    const { trackingTransparency } = useNotificationState();
    const cartDispatch = useCartDispatch();
    const getPrimeProductDetails = async () => {
        const productDetails = await fetchProductById(
            ozivaPrimeProductId.toString(),
        );
        setPrimeProductDetails(productDetails);
    };

    useEffect(() => {
        getPrimeProductDetails();
    }, []);
    return (
        <>
            <PrimaryButton
                accentColor="#FF6F00"
                style={{ width: 255 }}
                title={text ? text : "ADD TO CART NOW!"}
                onAction={() => {
                    trackMoEngageAppEvent({
                        event: `never_prime_screen_add_to_cart_app`,
                        values: [
                            {
                                eventAttribute: 'product_id',
                                value: ozivaPrimeProductId,
                            },
                            {
                                eventAttribute: 'price',
                                value: primeProductDetails && primeProductDetails.data.variants[0].price || 49,
                            },
                        ],
                        trackingTransparency,
                    });
                    cartDispatch(
                        addProduct({
                            id: Number(primeProductDetails?.data.variants[0].id),
                            quantity: 1
                        }),
                    );
                    navigation.navigate('CartScreen');
                }}
            />
        </>
    )
}

export default PrimeAddToCartButton