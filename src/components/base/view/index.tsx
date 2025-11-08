import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface AppViewProps extends ViewProps {
  row?: boolean;
  Center?: boolean;
  Right?: boolean;
  AlignRight?: boolean;
  AlignLeft?: boolean;
  wrap?: boolean;
  flex?: number;
}

export const BaseView: React.FC<AppViewProps> = ({
  row,
  Center,
  Right,
  AlignLeft,
  AlignRight,
  wrap,
  flex,
  style,
  children,
  ...rest
}) => {
  const computedStyle: StyleProp<ViewStyle> = {
    maxWidth: '100%',
    flex: flex ?? 0,
    flexDirection: row ? 'row' : 'column',
    alignItems: AlignLeft
      ? 'flex-start'
      : AlignRight
      ? 'flex-end'
      : 'center',
    justifyContent: Center ? 'center' : Right ? 'flex-end' : 'flex-start',
    flexWrap: wrap ? 'wrap' : 'nowrap',
  };

  return (
    <View style={[computedStyle, style]} {...rest}>
      {children}
    </View>
  );
};