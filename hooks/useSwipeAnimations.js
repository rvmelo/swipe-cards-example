import { useRef, useState, useCallback } from 'react';
import { Animated } from 'react-native';

//  import constants
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SWIPE_OUT_DURATION,
  CARD_WIDTH,
  CARD_HEIGHT,
} from '../constants/constants';

// utils
import { getCardOrigin } from '../utils/helperFunctions';

function useSwipeAnimations() {
  const cardOrigin = getCardOrigin(CARD_WIDTH, CARD_HEIGHT);

  const [cardPointer, setCardPointer] = useState(0);

  const currentCard = useRef(new Animated.ValueXY(cardOrigin)).current;
  const previousCard = useRef(
    new Animated.ValueXY({ x: -SCREEN_HEIGHT, y: -SCREEN_HEIGHT })
  ).current;

  const swipeAnimation = useCallback(
    (swipeDirection) =>
      Animated.timing(currentCard, {
        toValue: swipeDirection,
        duration: SWIPE_OUT_DURATION,
        useNativeDriver: false,
      }),
    [currentCard]
  );

  const getCardStyle = useCallback(
    (cardPosition) => {
      const rotate = cardPosition.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 2, cardOrigin.x, SCREEN_WIDTH * 2],
        outputRange: ['-120deg', '0deg', '120deg'],
      });
      return {
        ...cardPosition.getLayout(),
        transform: [{ rotate }],
      };
    },
    [cardOrigin.x]
  );

  // When user moves card with touch
  const handleForceSwipe = useCallback(
    (direction) => {
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
    },
    [currentCard, swipeAnimation]
  );

  const resetPosition = useCallback(() => {
    Animated.spring(currentCard, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }, [currentCard]);

  return {
    cardPointer,
    setCardPointer,
    currentCard,
    previousCard,
    handleForceSwipe,
    resetPosition,
    swipeAnimation,
    getCardStyle,
  };
}

export default useSwipeAnimations;
