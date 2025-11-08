import { BaseView } from '@components/base/view';
import Loader from '@components/elements/loader/loader';
import crashlytics from '@react-native-firebase/crashlytics';
import { webviewStyles } from 'containers/profile/styles/webview';
import React from 'react';
import WebView from 'react-native-webview';

const OZivaBlog = ({ navigation, route }) => (
  <WebView
    androidHardwareAccelerationDisabled
    source={{ uri: 'https://blog.oziva.in' }}
    renderLoading={() => (
      <BaseView style={webviewStyles.loadingIndicator}>
        <Loader />
      </BaseView>
    )}
    startInLoadingState
    javaScriptEnabled
    injectedJavaScript={`document.getElementById('header').style.display = 'none';document.getElementById('footer').style.display = 'none';document.getElementById('amp-mobile-version-switcher').style.display = 'none'`}
    onError={() => {
      crashlytics().log('Webview error in blog component');
    }}
  />
);

export default OZivaBlog;
