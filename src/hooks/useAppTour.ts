import { createRef, useCallback, useState } from 'react';
import { AppTourOptions } from '../types';

export const useAppTour = () => {
  const [options, setOptions] = useState<AppTourOptions>({
    ref: createRef(),
    yOffset: 0,
    borderRadiusInPercent: 0,
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hide = useCallback(() => setIsVisible(false), []);

  const show = useCallback((params: AppTourOptions) => {
    setOptions(params);
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    options,
    show,
    hide,
  };
};
