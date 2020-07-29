import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

//  constants
import { SCREEN_WIDTH, CARD_WIDTH, CARD_HEIGHT } from '../constants/constants';

//  utils
import { getCardOrigin } from '../utils/helperFunctions';

function useOpacityAnimations(cardPosition) {
  const cardOrigin = getCardOrigin(CARD_WIDTH, CARD_HEIGHT);

  const likeAnimValue = useRef(new Animated.Value(0)).current;
  const dislikeAnimValue = useRef(new Animated.Value(0)).current;
  const superlikeAnimValue = useRef(new Animated.Value(0)).current;

  const iconFadeInAnimation = useCallback((iconOpacity) => {
    // Will change icon opacity value to 1 in 0.1 seconds
    return Animated.timing(iconOpacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: false,
    });
  }, []);

  const handleSwipeRigthOpacity = useCallback(() => {
    const swipeRightOpacity = cardPosition.x.interpolate({
      inputRange: [cardOrigin.x, SCREEN_WIDTH],
      outputRange: [0, 1],
    });

    return swipeRightOpacity;
  }, [cardPosition, cardOrigin.x]);

  const handleSwipeLeftOpacity = useCallback(() => {
    const swipeLeftOpactiy = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH, cardOrigin.x],
      outputRange: [1, 0],
    });

    return swipeLeftOpactiy;
  }, [cardPosition, cardOrigin.x]);

  const handleSwipeTopOpacity = useCallback(() => {
    const swipeTopOpacity = Animated.add(
      cardPosition.y,
      cardPosition.x
    ).interpolate({
      inputRange: [-SCREEN_WIDTH / 2, cardOrigin.x],
      outputRange: [1, 0],
    });

    return swipeTopOpacity;
  }, [cardPosition, cardOrigin.x]);

  return {
    likeAnimValue,
    dislikeAnimValue,
    superlikeAnimValue,
    iconFadeInAnimation,
    handleSwipeLeftOpacity,
    handleSwipeRigthOpacity,
    handleSwipeTopOpacity,
  };
}

export default useOpacityAnimations;
