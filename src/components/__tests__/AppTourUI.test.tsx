/* eslint-env jest */

import '@testing-library/jest-native/extend-expect';
import { act, cleanup } from '@testing-library/react-native';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import { AppTourUI } from '../AppTourUI';
import { renderHook } from '@testing-library/react-hooks';
import { AppTourOptions } from '../../types';

let imp: any;

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');

  jest
    .spyOn(rn.Animated, 'View', 'get')
    .mockImplementation(() => jest.fn(({ children }) => children));

  imp = jest.spyOn(rn.View.prototype, 'measureInWindow');

  return rn;
});

jest.useRealTimers();
jest.setTimeout(10000);

afterEach(cleanup);

describe('test AppTourUI component', () => {
  it('renders correctly when hidden', async () => {
    const { result: mockedRefHook } = renderHook(() => useRef(null));

    const AppTourModal = (
      <View>
        <Text>App Tour Modal</Text>
      </View>
    );

    const appTourOptions: AppTourOptions = {
      ref: mockedRefHook.current,
      modalComponent: AppTourModal,
      borderRadiusInPercent: 100,
      yOffset: 0,
    };

    let tree;
    await act(async () => {
      tree = renderer.create(
        <View>
          <View ref={mockedRefHook.current}>
            <Text>Hello world!</Text>
          </View>
          <AppTourUI isVisible={false} options={appTourOptions} />
        </View>,
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with modal on top', async () => {
    imp.mockImplementation(cb => cb(0, 0, 150, 50));

    const { result: mockedRefHook } = renderHook(() => useRef(null));

    const AppTourModal = (
      <View>
        <Text>App Tour Modal</Text>
      </View>
    );

    const appTourOptions: AppTourOptions = {
      ref: mockedRefHook.current,
      modalComponent: AppTourModal,
      borderRadiusInPercent: 100,
      yOffset: 0,
    };

    let tree;
    await act(async () => {
      tree = renderer.create(
        <View>
          <View ref={mockedRefHook.current}>
            <Text>Hello world!</Text>
          </View>
          <AppTourUI isVisible={true} options={appTourOptions} />
        </View>,
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with modal at bottom', async () => {
    imp.mockImplementation(cb => cb(1000, 1000, 100, 100));

    const { result: mockedRefHook } = renderHook(() => useRef(null));

    const AppTourModal = (
      <View>
        <Text>App Tour Modal</Text>
      </View>
    );

    const appTourOptions: AppTourOptions = {
      ref: mockedRefHook.current,
      modalComponent: AppTourModal,
      borderRadiusInPercent: 100,
      yOffset: 0,
    };

    let tree;
    await act(async () => {
      tree = renderer.create(
        <View>
          <View ref={mockedRefHook.current}>
            <Text>Hello world!</Text>
          </View>
          <AppTourUI isVisible={true} options={appTourOptions} />
        </View>,
      );
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
