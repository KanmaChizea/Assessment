import React, {useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

type Size = {
  width: number;
  height: number;
};

export const useCarousel = (
  flatListRef: React.MutableRefObject<FlatList<any> | null>,
  activeSlideIdx: number,
  setActiveSlideIdx:
    | React.Dispatch<React.SetStateAction<number>>
    | ((slideIdx: number) => void),
) => {
  const [size, setSize] = useState<Size>({width: 0, height: 0});

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    const {width, height} = nativeEvent.layout;
    if (width !== size.width || height !== size.height) {
      // Set new width to update rendering of pages
      setSize({width, height});
      // Set new scroll position
      const func = () => {
        flatListRef?.current?.scrollToOffset({
          offset: activeSlideIdx * width,
          animated: false,
        });
      };
      setTimeout(func, 0);
    }
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / size.width);

    if (newIndex === activeSlideIdx) {
      return;
    }

    setActiveSlideIdx(newIndex);
  };

  return {onLayout, onMomentumScrollEnd, size, setSize};
};
