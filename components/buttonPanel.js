import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ButtonPanel = ({ forceSwipe, resetPosition }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="swipe left" onPress={() => forceSwipe('left')} />
      <Button title="swipe top" onPress={() => forceSwipe('top')} />
      <Button title="swipe right" onPress={() => forceSwipe('right')} />
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
