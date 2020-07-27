import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

function useSwipeAnimations() {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SWIPE_OUT_DURATION = 250;

  const imageOrigin = {
    x:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width * 0.9) / 2,
    y:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').height * 0.6) / 2,
  };

  const [cardPointer, setCardPointer] = useState(0);

  const likeAnimValue = useRef(new Animated.Value(0)).current;
  const dislikeAnimValue = useRef(new Animated.Value(0)).current;
  const superlikeAnimValue = useRef(new Animated.Value(0)).current;

  const currentCard = useRef(new Animated.ValueXY(imageOrigin)).current;
  const previousCard = useRef(
    new Animated.ValueXY({ x: -SCREEN_HEIGHT, y: -SCREEN_HEIGHT })
  ).current;

  const swipeAnimation = (swipeDirection) =>
    Animated.timing(currentCard, {
      toValue: swipeDirection,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    });

  // When user moves card with touch
  const handleForceSwipe = (direction) => {
    let swipeDirection;

    if (direction === 'top') {
      swipeDirection = { x: 0, y: -SCREEN_HEIGHT * 2 };
    } else {
      swipeDirection =
        direction === 'right'
          ? {
              x: SCREEN_HEIGHT,
              y: -SCREEN_HEIGHT,
            }
          : {
              x: -SCREEN_HEIGHT,
              y: -SCREEN_HEIGHT,
            };
    }

    swipeAnimation(swipeDirection).start(() => {
      currentCard.setValue({ x: 0, y: 0 });
      setCardPointer((prev) => prev + 1);
    });
  };

  const resetPosition = () => {
    Animated.spring(currentCard, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  return {
    cardPointer,
    setCardPointer,
    likeAnimValue,
    dislikeAnimValue,
    superlikeAnimValue,
    currentCard,
    previousCard,
    handleForceSwipe,
    resetPosition,
    swipeAnimation,
  };
}

export default useSwipeAnimations;
