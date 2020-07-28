import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';

//  components
import ButtonPanel from './components/buttonPanel';
import Card from './components/card/card';

//  hooks
import useSwipeAnimations from './hooks/useSwipeAnimations';
import usePressAnimations from './hooks/usePressAnimations';
import useOpacityAnimations from './hooks/useOpacityAnimations';

//  constants
import {
  SWIPE_HORIZONTAL_THRESHOLD,
  SWIPE_VERTICAL_THRESHOLD,
  CARD_WIDTH,
  CARD_HEIGHT,
  DATA,
} from './constants/constants';

//  utils
import { getCardOrigin } from './utils/helperFunctions';

const cardOrigin = getCardOrigin(CARD_WIDTH, CARD_HEIGHT);

export default function App() {
  const {
    likeAnimValue,
    dislikeAnimValue,
    superlikeAnimValue,
    iconFadeInAnimation,
  } = useOpacityAnimations();

  const {
    cardPointer,
    setCardPointer,
    currentCard,
    previousCard,
    handleForceSwipe,
    resetPosition,
    swipeAnimation,
  } = useSwipeAnimations();

  const {
    handlePressSwipe,
    handleSwipeBack,
    onResetAnimation,
  } = usePressAnimations(
    swipeAnimation,
    iconFadeInAnimation,
    currentCard,
    previousCard,
    cardPointer,
    setCardPointer
  );

  useEffect(() => {
    currentCard.setOffset(cardOrigin);
    previousCard.setOffset(cardOrigin);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (!onResetAnimation) {
        return Animated.event(
          [
            null,
            {
              dx: currentCard.x, // x,y are Animated.Value
              dy: currentCard.y,
            },
          ],
          { useNativeDriver: false } // <-- Add this
        )(event, gesture);
      }

      return null;
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -SWIPE_HORIZONTAL_THRESHOLD) {
        !onResetAnimation && handleForceSwipe('left');
      } else if (gesture.dx > SWIPE_HORIZONTAL_THRESHOLD) {
        !onResetAnimation && handleForceSwipe('right');
      } else if (gesture.dy < SWIPE_VERTICAL_THRESHOLD) {
        !onResetAnimation && handleForceSwipe('top');
      } else {
        resetPosition();
      }
    },
  });

  return (
    <View style={styles.container}>
      {DATA.map((data, index) => {
        return index < cardPointer - 1 ? null : (
          <Card
            key={data.uri}
            likeOpacity={likeAnimValue}
            dislikeOpacity={dislikeAnimValue}
            superlikeOpacity={superlikeAnimValue}
            cardStyle={{
              ...styles.cardContainer,
              zIndex: DATA.length - index,
            }}
            data={data}
            panResponder={panResponder}
            cardPosition={
              index === cardPointer - 1 ? previousCard : currentCard
            }
            isTopCard={cardPointer === index}
            isPreviousCard={index === cardPointer - 1}
            onResetAnimation={onResetAnimation}
          />
        );
      }).reverse()}
      <ButtonPanel
        onRightSwipe={() =>
          handlePressSwipe('right', likeAnimValue, DATA.length)
        }
        onLeftSwipe={() =>
          handlePressSwipe('left', dislikeAnimValue, DATA.length)
        }
        onTopSwipe={() =>
          handlePressSwipe('top', superlikeAnimValue, DATA.length)
        }
        onBackSwipe={handleSwipeBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '60%',
    width: '90%',
    position: 'absolute',
    left: cardOrigin.x, // left and top place the non animated cards in the same place as the animated ones
    top: cardOrigin.y,
  },
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
