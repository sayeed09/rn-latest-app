import { Article as ArticleModel } from "@models/product-details/productv2";
import { height, width } from "@utils/constants";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SvgRenderer from "react-native-svg-renderer";
import { ArticlesStyle } from "styles/productv2";
import PDFReader from "./pdf-reader";


interface Props {
    selectedArticle: ArticleModel;
    onBack: () => void;
}
const Article = ({ selectedArticle, onBack }: Props) => {
    return <View>
        <View style={{ height: height - 250, width }}>
            {onBack ?
                <Pressable onPress={() => onBack()} style={ArticlesStyle.backArrow}>
                    <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_left_black.svg?v=1724078330' }} height={24} width={24} />
                    <Text>Back</Text>
                </Pressable> : null}
            <PDFReader source={selectedArticle.src} />
        </View>
    </View>
}
export default Article;