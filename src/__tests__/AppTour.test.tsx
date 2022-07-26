import { act, render, renderHook } from '@testing-library/react-native';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import AppTour from '../AppTour';
import { AppTourOptions } from '../types';

describe('test AppTour component', () => {
  it('creates imperative handle', () => {
    const { result: mockedRefHook } = renderHook(() => useRef(null));

    const AppTourModal = (
      <View>
        <Text>App Tour Modal</Text>
      </View>
    );

    const { queryByText } = render(<AppTour />);

    expect(AppTour.show).toBeInstanceOf(Function);
    expect(AppTour.hide).toBeInstanceOf(Function);

    const appTourOptions: AppTourOptions = {
      ref: mockedRefHook.current,
      modalComponent: AppTourModal,
      borderRadiusInPercent: 100,
      yOffset: 0,
    };

    act(() => AppTour.show(appTourOptions));

    expect(queryByText('App Tour Modal')).toBeTruthy();

    act(AppTour.hide);
  });
});
