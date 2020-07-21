import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
];

export default function App() {
  const data = useState([...DATA])[0];

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SWIPE_HORIZONTAL_THRESHOLD = SCREEN_WIDTH * 0.3;
  const SWIPE_VERTICAL_THRESHOLD = -SCREEN_HEIGHT * 0.1;
  const SWIPE_OUT_DURATION = 250;

  const imageOrigin = {
    x:
      Dimensions.get("window").width / 2 -
      (Dimensions.get("window").width * 0.9) / 2,
    y:
      Dimensions.get("window").height / 2 -
      (Dimensions.get("window").height * 0.6) / 2,
  };

  const pan = useRef(new Animated.ValueXY(imageOrigin)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      pan.setOffset(imageOrigin); // defines origin
      return true;
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      { useNativeDriver: false } // <-- Add this
    ),
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -SWIPE_HORIZONTAL_THRESHOLD) {
        forceSwipe("left");
      } else if (gesture.dx > SWIPE_HORIZONTAL_THRESHOLD) {
        forceSwipe("right");
      } else if (gesture.dy < SWIPE_VERTICAL_THRESHOLD) {
        forceSwipe("top");
      } else {
        resetPosition();
      }
    },
  });

  const forceSwipe = (direction) => {
    let swipeDirection;

    if (direction === "top") {
      swipeDirection = { x: 0, y: -SCREEN_HEIGHT * 2 };
    } else {
      swipeDirection =
        direction === "right"
          ? {
              x: SCREEN_HEIGHT,
              y: -SCREEN_HEIGHT,
            }
          : {
              x: -SCREEN_HEIGHT,
              y: -SCREEN_HEIGHT,
            };
    }

    Animated.timing(pan, {
      toValue: swipeDirection,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(onSwipeComplete());
  };

  const onSwipeComplete = () => {};

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, imageOrigin.x, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...pan.getLayout(),
      transform: [{ rotate }],
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.imageContainer, getCardStyle()]}
      >
        <Image style={styles.image} source={{ uri: data[0].uri }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: "60%",
    width: "90%",
    position: "absolute",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
