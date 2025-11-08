import { Box } from '@components/base/foundation';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { AppStackDefinition } from 'routes/definitions';
import SVGImg from '../../../assets/images/OZiva_logo_svg';

const styles = {
  logo: { width: 95, height: 33 },
};

const HeaderLeft = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AppStackDefinition>;
}): React.ReactElement => {
  return (
    <Box py={Platform.OS === 'ios' ? 1 : 3} style={{marginLeft: 8}}>
      <Pressable
        onPress={() =>
          navigation.reset({
            index: 1,
            routes: [{ name: 'Home' }],
          })
        }
      >
        <SVGImg Height={33} Width={100} />
      </Pressable>
    </Box>
  );
};

export default HeaderLeft;
