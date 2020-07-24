import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ButtonPanel = ({ swipeRight, swipeLeft, swipeTop, resetPosition }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="swipe left" onPress={swipeLeft} />
      <Button title="swipe top" onPress={swipeTop} />
      <Button title="swipe right" onPress={swipeRight} />
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
