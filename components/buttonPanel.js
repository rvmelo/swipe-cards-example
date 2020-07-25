import React from 'react';
import { View, Button, StyleSheet, Dimensions, Animated } from 'react-native';

const ButtonPanel = ({
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
  cardPosition,
  setCardIndex,
  swipeAnimation,
}) => {
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const iconFadeInAnimation = (iconOpacity) => {
    // Will change icon opacity value to 1 in 0.1 seconds
    return Animated.timing(iconOpacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    });
  };

  // When user moves card with the press of a button
  const handlePressSwipe = (direction, iconOpacity) => {
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
      iconFadeInAnimation(iconOpacity),
      Animated.delay(100),
      swipeAnimation(swipeDirection),
    ]).start(() => {
      // after the animation finishes

      likeOpacity.setValue(0);
      dislikeOpacity.setValue(0);
      superlikeOpacity.setValue(0);

      cardPosition.setValue({ x: 0, y: 0 });
      setCardIndex((prev) => prev + 1);
    });
  };

  const resetPosition = () => {
    Animated.spring(cardPosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    likeOpacity.setValue(0);
    dislikeOpacity.setValue(0);
    superlikeOpacity.setValue(0);

    setCardIndex((prev) => prev - 1);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="swipe left"
        onPress={() => handlePressSwipe('left', dislikeOpacity)}
      />
      <Button
        title="swipe top"
        onPress={() => handlePressSwipe('top', superlikeOpacity)}
      />
      <Button
        title="swipe right"
        onPress={() => handlePressSwipe('right', likeOpacity)}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="reset position" onPress={resetPosition} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
});

export default ButtonPanel;
