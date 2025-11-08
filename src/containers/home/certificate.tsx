import { CERTIFICATE2, CERTIFICATE3, CERTIFICATE_FSSAI } from '@utils/images';
import React from 'react';
import { Image, View } from 'react-native';

const Certificate = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

      <Image
        source={CERTIFICATE2}
        // resizeMode={FastImage.resizeMode.contain}
        style={{
          height: 100,
          width: 100,
        }}
      />
      <Image
        source={CERTIFICATE3}
        // resizeMode={FastImage.resizeMode.contain}
        style={{
          height: 100,
          width: 100,
        }}
      />
      <Image
        source={CERTIFICATE_FSSAI}
        // resizeMode={FastImage.resizeMode.contain}
        style={{
          height: 100,
          width: 100,
        }}
      />
    </View>
  );
};

export default Certificate;
