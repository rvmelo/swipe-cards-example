import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

//  hooks
// import usePressAnimations from '../hooks/usePressAnimations';

const ButtonPanel = ({
  onRightSwipe,
  onLeftSwipe,
  onTopSwipe,
  onBackSwipe,
}) => {
  // const { handlePressSwipe, resetPosition } = usePressAnimations(
  //   swipeAnimation,
  //   currentCard,
  //   previousCard,
  //   cardPointer,
  //   setCardPointer
  // );

  return (
    <View style={styles.buttonContainer}>
      <Button title="swipe left" onPress={onLeftSwipe} />
      <Button title="swipe top" onPress={onTopSwipe} />
      <Button title="swipe right" onPress={onRightSwipe} />
      <View style={{ marginTop: 10 }}>
        <Button title="reset position" onPress={onBackSwipe} />
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
