import PrimaryButton from '@components/elements/button/primary-Button';
import { useRemoteConfig } from '@hooks/useRemoteConfig';
import { width } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNModal from 'react-native-modal';
// import SpInAppUpdates, {
//     IAUUpdateKind,
//     StartUpdateOptions,
// } from 'sp-react-native-in-app-updates';
import { commonStyles } from '@styles/common';
import { offersStyles } from '@styles/offers';


// const inAppUpdates = new SpInAppUpdates(
//   false, // isDebug
// );
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    margin: 0,
    padding: 0,
  },
});
const ForceUpdate = () => {
  const [showForceUpdatePopup, setForceUpdatePopup] = useState(false);
  const [isNewUpdateAvailable, setIsNewUpdateAvailable] = useState(false);
  useRemoteConfig(setForceUpdatePopup);

  useEffect(() => {

    // try {
    //   inAppUpdates.checkNeedsUpdate().then((result) => {
    //     if (result.shouldUpdate) {
    //       setIsNewUpdateAvailable(true)
    //     }
    //   });
    // }
    // catch (err) {
    //   console.log("remote config initialize failed")
    // }
  }, []);
  const ModalContent = () => (
    <>
      <View style={[offersStyles.offerPopupDtls]}>
        <View
          style={[
            commonStyles.pad16,
            { backgroundColor: '#F1FFEE', margin: -16, marginBottom: 16 },
          ]}
        >
          <Text style={[commonStyles.fs16, commonStyles.fwBold]}>
            App Update Required
          </Text>
        </View>

        <View style={[commonStyles.mb16]}>
          <Text style={[commonStyles.fs14, commonStyles.fw500]}>
            A new version of application is available. Please continue to update
            to the latest version.
          </Text>
        </View>
        <View
          style={[
            commonStyles.mb0,
            commonStyles.pad16,
            {
              margin: -16,
            },
          ]}
        >
          <PrimaryButton
            accentColor="#FF6F00"
            style={{ width: '100%' }}
            title="UPDATE NOW"
            onAction={() => handleUpdateNow()}
          />
        </View>
      </View>
    </>
  );
  const handleUpdateNow = () => {
    // let updateOptions: StartUpdateOptions = {};
    // if (Platform.OS === 'android') {
    //   // android only, on iOS the user will be promped to go to your app store page
    //   updateOptions = {
    //     updateType: IAUUpdateKind.IMMEDIATE,
    //   };
    //   inAppUpdates.startUpdate(updateOptions);
    // } else {
    //   Linking.openURL('itms-apps://itunes.apple.com/app/id1579866575');
    // }

  };
  return (
    <>
      <View style={{ position: 'absolute' }}>
        <RNModal
          isVisible={showForceUpdatePopup && isNewUpdateAvailable}
          style={styles.centeredView}
          onBackButtonPress={() => { }}
        >
          <View
            style={[
              {
                backgroundColor: 'white',
                minHeight: '20%',
                maxHeight: '100%',
                width: width,
              },
            ]}
          >
            <ModalContent />
          </View>
        </RNModal>
      </View>
    </>
  );
};
export default ForceUpdate;
