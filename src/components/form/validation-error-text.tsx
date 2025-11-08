import { commonStyles } from '@styles/common';
import React from 'react';
import { CustomText } from '../../../AndroidFontFix';

const ErrorText = ({ children }): React.ReactElement => (
  <CustomText style={[commonStyles.fs12, commonStyles.redColor]}>
    {children}
  </CustomText>
);

export default ErrorText;
