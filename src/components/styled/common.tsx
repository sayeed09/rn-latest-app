import { width } from '@utils/constants';
import React from 'react';
import { Text, TextProps, TextStyle, View, ViewProps } from 'react-native';

// ------------------- Helper -------------------
const getFontFamily = (fWeight?: number) => {
  switch (fWeight) {
    case 100:
      return 'ProximaNovaT-Thin';
    case 300:
      return 'ProximaNovaA-Light';
    case 400:
      return 'ProximaNova-Regular';
    case 500:
    case 600:
      return 'ProximaNova-Bold';
    case 700:
    case 800:
      return 'ProximaNova-Extrabld';
    default:
      return 'ProximaNova-Bold';
  }
};

// ------------------- View Components -------------------
interface ModalProps extends ViewProps {
  white?: boolean;
  topLeftRadius?: boolean;
  topRightRadius?: boolean;
  noBorderBottom?: boolean;
  checked?: boolean;
}

export const ModalDetails: React.FC<ModalProps> = ({ white, style, children, ...rest }) => (
  <View
    style={[
      { paddingHorizontal: 26, paddingBottom: 35, backgroundColor: white ? '#ffffff' : '#b5e8ff' },
      style,
    ]}
    {...rest}
  >
    {children}
  </View>
);

export const ModalHeader: React.FC<ModalProps> = ({
  white,
  topLeftRadius,
  topRightRadius,
  noBorderBottom,
  style,
  children,
  ...rest
}) => (
  <View
    style={[
      {
        paddingVertical: 22,
        paddingHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: topLeftRadius ? 12 : 0,
        borderTopRightRadius: topRightRadius ? 12 : 0,
        backgroundColor: white ? '#ffffff' : '#b5e8ff',
        borderBottomWidth: noBorderBottom ? 0 : 1,
        borderBottomColor: '#d9d9d9',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </View>
);

export const DetailsContent: React.FC<ViewProps> = ({ style, children, ...rest }) => (
  <View style={[{ paddingVertical: 30 }, style]} {...rest}>
    {children}
  </View>
);

export const ListWrapper: React.FC<ModalProps> = ({ checked, style, children, ...rest }) => (
  <View
    style={[
      {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(151,151,151,0.23)',
        borderTopWidth: 1,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: checked ? '#fff' : '#F2F2F2',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </View>
);

export const RatingWrapper: React.FC<ViewProps> = ({ style, children, ...rest }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }, style]} {...rest}>
    {children}
  </View>
);

export const ViewWrapper: React.FC<ViewProps> = ({ style, children, ...rest }) => (
  <View
    style={[{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 10 }, style]}
    {...rest}
  >
    {children}
  </View>
);

export const FiltersWrapper: React.FC<ViewProps> = ({ style, children, ...rest }) => (
  <View
    style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 10, elevation: 2 }, style]}
    {...rest}
  >
    {children}
  </View>
);

export const ButtonWrapper: React.FC<ViewProps> = ({ style, children, ...rest }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...rest}>
    {children}
  </View>
);

// ------------------- Text Components -------------------
interface TextPropsExtended extends TextProps {
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  spacing?: string | number;
  center?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  padding?: string | number;
  margin?: string | number;
  fontSize?: number;
  textDecorationLine?: TextStyle['textDecorationLine'];
  defaultLetterSpacing?: boolean;
}

export const ModalHeaderTitle: React.FC<TextPropsExtended> = ({
  center,
  uppercase,
  underline,
  defaultLetterSpacing,
  style,
  children,
  ...rest
}) => (
  <Text
    style={[
      {
        flex: 1,
        textAlign: center ? 'center' : 'left',
        color: '#172643',
        fontSize: 16,
        textTransform: uppercase ? 'uppercase' : 'none',
        fontFamily: getFontFamily(600),
        fontWeight: '600',
        letterSpacing: defaultLetterSpacing ? 0 : 1.5,
        lineHeight: 20,
        textDecorationLine: underline ? 'underline' : 'none',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

export const ListText: React.FC<TextPropsExtended> = ({
  color,
  fontWeight,
  spacing,
  center,
  uppercase,
  underline,
  padding,
  margin,
  style,
  children,
  ...rest
}) => (
  <Text
    style={[
      {
        color: color || '#2f6079',
        fontSize: 14,
        fontWeight: fontWeight ? `${fontWeight}` : '500',
        letterSpacing: spacing ?? 0.24,
        lineHeight: 28,
        textAlign: center ? 'center' : 'left',
        textTransform: uppercase ? 'uppercase' : 'none',
        textDecorationLine: underline ? 'underline' : 'none',
        padding: padding ?? 0,
        margin: margin ?? 0,
        textDecorationColor: '#fff',
        fontFamily: 'Roboto-Bold',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

export const ProductPrice: React.FC<TextPropsExtended> = ({
  color,
  textDecorationLine,
  fontSize,
  style,
  children,
  ...rest
}) => (
  <Text
    style={[
      {
        color: color || '#000',
        textDecorationLine: textDecorationLine || 'none',
        marginBottom: 4,
        fontSize: fontSize || 13,
        textAlign: 'center',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </Text>
);

export const Label: React.FC<TextPropsExtended> = ({ style, children, ...rest }) => (
  <Text style={[{ overflow: 'hidden', maxWidth: width / 2.5, marginBottom: 10 }, style]} {...rest}>
    {children}
  </Text>
);

export const BoldText: React.FC<TextPropsExtended> = ({ style, children, ...rest }) => (
  <Text style={[{ fontSize: 16, lineHeight: 26, color: '#000', fontWeight: 'bold' }, style]} {...rest}>
    {children}
  </Text>
);

export const MediumText: React.FC<TextPropsExtended> = ({ style, children, ...rest }) => (
  <Text style={[{ fontSize: 16, color: '#000', fontWeight: '400' }, style]} {...rest}>
    {children}
  </Text>
);

export const SmallText: React.FC<TextPropsExtended> = ({ color, fontSize, style, children, ...rest }) => (
  <Text style={[{ fontSize: fontSize || 14, color: color || '#000', fontWeight: '400' }, style]} {...rest}>
    {children}
  </Text>
);

export const ExtraSmallText: React.FC<TextPropsExtended> = ({ color, style, children, ...rest }) => (
  <Text style={[{ fontSize: 12, color: color || '#969696' }, style]} {...rest}>
    {children}
  </Text>
);