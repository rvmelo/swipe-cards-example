import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

function useOpacityAnimations(cardPosition) {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const imageOrigin = {
    x:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width * 0.9) / 2,
    y:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').height * 0.6) / 2,
  };

  const likeAnimValue = useRef(new Animated.Value(0)).current;
  const dislikeAnimValue = useRef(new Animated.Value(0)).current;
  const superlikeAnimValue = useRef(new Animated.Value(0)).current;

  const iconFadeInAnimation = (iconOpacity) => {
    // Will change icon opacity value to 1 in 0.1 seconds
    return Animated.timing(iconOpacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: false,
    });
  };

  const handleSwipeRigthOpacity = () => {
    const swipeRightOpacity = cardPosition.x.interpolate({
      inputRange: [imageOrigin.x, SCREEN_WIDTH],
      outputRange: [0, 1],
    });

    return swipeRightOpacity;
  };

  const handleSwipeLeftOpacity = () => {
    const swipeLeftOpactiy = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH, imageOrigin.x],
      outputRange: [1, 0],
    });

    return swipeLeftOpactiy;
  };

  const handleSwipeTopOpacity = () => {
    const swipeTopOpacity = Animated.add(
      cardPosition.y,
      cardPosition.x
    ).interpolate({
      inputRange: [-SCREEN_WIDTH / 2, imageOrigin.x],
      outputRange: [1, 0],
    });

    return swipeTopOpacity;
  };

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
