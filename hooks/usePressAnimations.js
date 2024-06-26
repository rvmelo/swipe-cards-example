import { useState, useCallback } from 'react';
import { Animated } from 'react-native';

//  constants
import { SCREEN_HEIGHT } from '../constants/constants';

//  Animations triggered by the press of a button
function usePressAnimations(
  swipeAnimation,
  iconFadeInAnimation,
  currentCard,
  previousCard,
  cardPointer,
  setCardPointer
) {
  const [onPressSwipe, setOnPressSwipe] = useState(false);
  const [onResetAnimation, setOnResetAnimation] = useState(false);

  // When user moves card with the press of a button
  const handlePressSwipe = useCallback(
    (direction, iconOpacity, numberOfCards) => {
      let swipeDirection;

      if (cardPointer > numberOfCards - 1 || onPressSwipe) return;

      setOnPressSwipe(true);

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

      !onResetAnimation &&
        Animated.sequence([
          iconFadeInAnimation(iconOpacity),
          Animated.delay(100),
          swipeAnimation(swipeDirection),
        ]).start(() => {
          // after the animation finishes

          iconOpacity.setValue(0);

          currentCard.setValue({ x: 0, y: 0 });
          setCardPointer((prev) => prev + 1);

          setOnPressSwipe(false);
        });
    },
    [
      cardPointer,
      currentCard,
      setCardPointer,
      iconFadeInAnimation,
      onPressSwipe,
      onResetAnimation,
      swipeAnimation,
    ]
  );

  const handleSwipeBack = useCallback(() => {
    if (cardPointer > 0) {
      setOnResetAnimation(true);

      !onResetAnimation &&
        Animated.spring(previousCard, {
          toValue: { x: 0, y: 0 },
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          setCardPointer((prev) => prev - 1);
          previousCard.setValue({ x: -SCREEN_HEIGHT, y: -SCREEN_HEIGHT });
          setOnResetAnimation(false);
          setOnPressSwipe(false);
        });
    }
  }, [cardPointer, setCardPointer, previousCard, onResetAnimation]);

  return { handlePressSwipe, handleSwipeBack, onResetAnimation };
}

export default usePressAnimations;
