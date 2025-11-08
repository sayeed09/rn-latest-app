import { width } from "@utils/constants";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

export const ShimmerButtonWrapper = ({ children, onAction }) => {
  const shimmerTranslate = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerTranslate]);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <Pressable onPress={() => onAction()}>
      <View style={[styles.container]}>
        {children}

        {/* shimmer overlay */}
        <Animated.View
          pointerEvents={"none"}
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [
                { translateX },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,255,255,0.5)",
              "transparent",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shimmer}
          />
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 8,
  },
  shimmer: {
    flex: 1,
    width: "100%",
  },
});
