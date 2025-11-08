import { Whitespace } from '@components/styles/view';
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface ButtonContainerProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

// Button container replacement
export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: Whitespace.LARGE,
          borderRadius: Whitespace.TINY,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

// Styled action button replacement
interface StyledActionButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

// TouchableOpacity replacement
export const StyledActionButton: React.FC<StyledActionButtonProps> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

// Styled native feedback button replacement
interface StyledButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

// TouchableNativeFeedback replacement
export const StyledButton: React.FC<StyledButtonProps> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  );
};

// StrikeThrough container replacement
interface StrikeThroughProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const StyledStrikeThrough: React.FC<StrikeThroughProps> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
};