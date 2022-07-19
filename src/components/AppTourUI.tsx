import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, Mask, Rect, Use } from 'react-native-svg';
import { AppTourMeasure, AppTourUIProps } from '../types';

export const AppTourUI = ({ isVisible, options }: AppTourUIProps) => {
  const {
    ref,
    navigation,
    modalContainerStyle,
    modalComponent,
    borderRadiusInPercent,
    yOffset,
    onBackgroundPress,
  } = options;

  const [measure, setMeasure] = useState<AppTourMeasure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [animIsFinished, setAnimIsFinished] = useState(false);

  const measureRef = useCallback(
    () =>
      ref?.current?.measureInWindow((x, y, width, height) => {
        if (x && y && width && height) {
          setMeasure({ x, y: y - yOffset, width, height });
        }
      }),
    [ref, yOffset],
  );

  const modalTopPosition = useMemo(() => {
    if (!measure) {
      return 0;
    }

    if (measure.y < Dimensions.get('screen').height / 2) {
      // place modal under mask
      return measure.y + measure.height + 10;
    }

    return 'auto';
  }, [measure]);

  const modalBottomPosition = useMemo(() => {
    if (!measure) {
      return 0;
    }

    if (measure.y >= Dimensions.get('screen').height / 2) {
      // place modal over the mask
      return Dimensions.get('screen').height - measure.y + 10;
    }

    return 'auto';
  }, [measure]);

  const arrowOrientation = modalTopPosition !== 'auto' ? 'top' : 'bottom';

  const arrowLeftOffset = useMemo(() => {
    if (measure) {
      return (
        -Dimensions.get('screen').width / 2 + measure.x + measure.width / 2
      );
    }

    return 0;
  }, [measure]);

  const arrowStyle = useMemo(() => {
    return { ...styles.triangleVertical, left: arrowLeftOffset };
  }, [arrowLeftOffset]);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('transitionEnd', () => {
      if (ref?.current) {
        measureRef();
      }
    });

    return unsubscribe;
  }, [navigation, ref, measureRef]);

  useEffect(() => {
    if (ref?.current) {
      measureRef();
    }
  }, [ref, measureRef]);

  useEffect(() => {
    setAnimIsFinished(false);

    if (measure) {
      Animated.timing(fadeAnim, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!isVisible) {
          setAnimIsFinished(finished);
        }
      });
    }
  }, [fadeAnim, isVisible, measure]);

  if (animIsFinished || !measure) {
    return <></>;
  }

  return (
    <Animated.View
      ref={ref}
      style={{
        opacity: fadeAnim,
        position: 'absolute',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}>
      <Svg
        height={'100%'}
        viewBox={`0 0 ${Dimensions.get('screen').width} ${
          Dimensions.get('screen').height
        }`}
        width={'100%'}
        onPress={onBackgroundPress}>
        <Defs>
          <Mask
            height="100%"
            id="mask"
            /* wait for merge: https://github.com/react-native-svg/react-native-svg/pull/1774
            @ts-ignore */
            maskUnits="userSpaceOnUse"
            width="100%"
            x={0}
            y={0}>
            <Rect fill="white" height="100%" width="100%" />
            <Rect
              fill="black"
              height={measure.height}
              rx={
                measure
                  ? (measure.width * (borderRadiusInPercent / 100)) / 2
                  : 0
              }
              width={measure.width}
              x={measure.x}
              y={measure.y}
            />
          </Mask>
          <Rect
            fill="rgba(0, 0, 0, 0.5)"
            height={'100%'}
            id="bg"
            width={'100%'}
          />
        </Defs>
        <Use fill="none" href="#bg" mask="url(#mask)" />
      </Svg>
      {modalComponent ? (
        <View
          style={{
            bottom: modalBottomPosition,
            left: 10,
            position: 'absolute',
            right: 10,
            top: modalTopPosition,
          }}>
          <View>
            {arrowOrientation === 'top' && <View style={arrowStyle} />}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ ...styles.container, ...modalContainerStyle }}>
                {modalComponent}
              </View>
            </View>
            {arrowOrientation === 'bottom' && (
              <View
                style={{ ...arrowStyle, transform: [{ rotate: '180deg' }] }}
              />
            )}
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    marginTop: -StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  triangleVertical: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
  triangleHorizontal: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'white',
  },
});
