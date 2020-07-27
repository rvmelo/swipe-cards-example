import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

//  components
import ButtonPanel from './components/buttonPanel';
import Card from './components/card/card';

//  hooks
import useSwipeAnimations from './hooks/useSwipeAnimations';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_HORIZONTAL_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_VERTICAL_THRESHOLD = -SCREEN_HEIGHT * 0.3;

const imageOrigin = {
  x:
    Dimensions.get('window').width / 2 -
    (Dimensions.get('window').width * 0.9) / 2,
  y:
    Dimensions.get('window').height / 2 -
    (Dimensions.get('window').height * 0.6) / 2,
};

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
];

export default function App() {
  const {
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
  } = useSwipeAnimations();

  useEffect(() => {
    currentCard.setOffset(imageOrigin);
    previousCard.setOffset(imageOrigin);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
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
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -SWIPE_HORIZONTAL_THRESHOLD) {
        handleForceSwipe('left');
      } else if (gesture.dx > SWIPE_HORIZONTAL_THRESHOLD) {
        handleForceSwipe('right');
      } else if (gesture.dy < SWIPE_VERTICAL_THRESHOLD) {
        handleForceSwipe('top');
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
          />
        );
      }).reverse()}
      <ButtonPanel
        likeOpacity={likeAnimValue}
        dislikeOpacity={dislikeAnimValue}
        superlikeOpacity={superlikeAnimValue}
        swipeAnimation={swipeAnimation}
        currentCard={currentCard}
        previousCard={previousCard}
        cardPointer={cardPointer}
        setCardPointer={setCardPointer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '60%',
    width: '90%',
    position: 'absolute',
    left: imageOrigin.x, // left and top place the non animated cards in the same place as the animated ones
    top: imageOrigin.y,
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
