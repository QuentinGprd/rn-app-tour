import { NativeMethods, ViewStyle } from 'react-native';

type highlightRef = {
  current: NativeMethods | null;
};

export type AppTourOptions = {
  /**
   * The element highlighted by the app tour component
   */
  ref: highlightRef;
  /**
   * App tour modal container style
   */
  modalContainerStyle?: ViewStyle;
  /**
   * App tour modal content
   */
  modalComponent?: JSX.Element;
  /**
   * Border radius of the highlighted zone
   * default: 100 (ellipse)
   */
  borderRadiusInPercent: number;
  /**
   * Vertical offset of the highlighted zone
   * Default value: `0`
   */
  yOffset: number;
  /**
   * navigation prop to use for transition animation events (optional)
   */
  navigation?: any;
  /**
   * Called when the app tour background is pressed
   */
  onBackgroundPress?: () => void;
};

export type AppTourMeasure = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AppTourUIProps = {
  isVisible: boolean;
  options: AppTourOptions;
};

export type AppTourRef = {
  show: (params: AppTourOptions) => void;
  hide: () => void;
};
