import { BaseView } from '@components/base/view';
import Loader from '@components/elements/loader/loader';
import React from 'react';
import WebView from 'react-native-webview';

import crashlytics from '@react-native-firebase/crashlytics';
import { webviewStyles } from './styles/webview';

const webViewSource = {
  uri: 'https://www.oziva.in/pages/terms-conditions?embedded=true',
};

const Terms = () => (
  <WebView
    androidHardwareAccelerationDisabled
    source={webViewSource}
    renderLoading={() => (
      <BaseView style={webviewStyles.loadingIndicator}>
        <Loader />
      </BaseView>
    )}
    startInLoadingState
    onError={() => {
      crashlytics().log('Webview error in profile terms component');
    }}
  />
);

export default Terms;
