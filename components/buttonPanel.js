import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

//  hooks
import usePressAnimations from '../hooks/usePressAnimations';

const ButtonPanel = ({
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
  currentCard,
  previousCard,
  cardPointer,
  setCardPointer,
  swipeAnimation,
}) => {
  const { handlePressSwipe, resetPosition } = usePressAnimations(
    swipeAnimation,
    currentCard,
    previousCard,
    cardPointer,
    setCardPointer
  );

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
