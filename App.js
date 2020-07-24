import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import ButtonPanel from './components/buttonPanel';

import Card from './components/card/card';

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
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SWIPE_HORIZONTAL_THRESHOLD = SCREEN_WIDTH * 0.3;
  const SWIPE_VERTICAL_THRESHOLD = -SCREEN_HEIGHT * 0.3;
  const SWIPE_OUT_DURATION = 250;

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

  const pan = useRef(new Animated.ValueXY(imageOrigin)).current;

  useEffect(() => {
    pan.setOffset(imageOrigin);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      return Animated.event(
        [
          null,
          {
            dx: pan.x, // x,y are Animated.Value
            dy: pan.y,
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

  const swipeAnimation = (swipeDirection) =>
    Animated.timing(pan, {
      toValue: swipeDirection,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    });

  const fadeInAnimation = (icon) => {
    // Will change fadeAnim value to 1 in 0.1 seconds
    return Animated.timing(icon, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    });
  };

  // When user moves card with the press of a button
  const handlePressSwipe = (direction, icon) => {
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

    Animated.sequence([
      fadeInAnimation(icon),
      Animated.delay(100),
      swipeAnimation(swipeDirection),
    ]).start();
  };

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

    swipeAnimation(swipeDirection).start(onSwipeComplete());
  };

  const onSwipeComplete = () => {};

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    likeAnimValue.setValue(0);
    dislikeAnimValue.setValue(0);
    superlikeAnimValue.setValue(0);
  };

  return (
    <View style={styles.container}>
      <Card
        likeOpacity={likeAnimValue}
        dislikeOpacity={dislikeAnimValue}
        superlikeOpacity={superlikeAnimValue}
        cardStyle={styles.cardContainer}
        data={DATA[0]}
        panResponder={panResponder}
        pan={pan}
      />
      <ButtonPanel
        swipeRight={() => handlePressSwipe('right', likeAnimValue)}
        swipeLeft={() => handlePressSwipe('left', dislikeAnimValue)}
        swipeTop={() => handlePressSwipe('top', superlikeAnimValue)}
        resetPosition={resetPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '60%',
    width: '90%',
    position: 'absolute',
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
