import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { Button, Text, View } from 'react-native';
import AppTour from 'rn-app-tour/lib/src/AppTour';
import AppTourModal from '../Components/AppTourModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const highlightRef = useRef<View>(null);

  const appTourModal = useMemo(
    () => <AppTourModal onContinueBtnPress={() => AppTour.hide()} />,
    [],
  );

  const showAppTour = () => {
    AppTour.show({
      navigation,
      borderRadiusInPercent: 100,
      modalComponent: appTourModal,
      ref: highlightRef,
      yOffset: 0,
      onBackgroundPress: () => AppTour.hide(),
    });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text ref={highlightRef} style={{ color: 'black', padding: 40 }}>
        To be highlighted
      </Text>
      <Button title="show App Tour" onPress={showAppTour} />
    </View>
  );
};

export default HomeScreen;
