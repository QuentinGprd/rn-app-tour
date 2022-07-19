import React, { useCallback, useRef, useImperativeHandle } from 'react';
import { AppTourUI } from './components/AppTourUI';
import { useAppTour } from './hooks/useAppTour';
import { AppTourOptions, AppTourRef } from './types';

type AppTourRefObj = {
  current: AppTourRef | null;
};

let appTourRef: AppTourRefObj;

const AppTour = () => {
  appTourRef = useRef<AppTourRef>(null);

  const { show, hide, isVisible, options } = useAppTour();

  // This must use useCallback to ensure the ref doesn't get set to null and then a new ref every render.
  useImperativeHandle(
    appTourRef,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show],
    ),
  );

  return <AppTourUI isVisible={isVisible} options={options} />;
};

AppTour.show = (params: AppTourOptions) => {
  appTourRef?.current?.show(params);
};

AppTour.hide = () => {
  appTourRef?.current?.hide();
};

export default AppTour;
