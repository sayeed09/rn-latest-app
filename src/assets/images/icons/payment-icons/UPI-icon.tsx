import { UPI } from '@utils/images';
import * as React from 'react';
import { Image, Platform } from 'react-native';

const UPIIconComponent = () => {
  return <>
    {Platform.OS == "android" ?
      <Image source={{ uri: UPI }} style={{ height: 30, width: 30 }} /> :
      <Image source={{ uri: UPI }} style={{ height: 30, width: 30 }} />
    }

  </>
}
export default UPIIconComponent;
