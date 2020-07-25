import React from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CardBackground = ({
  imageOrigin,
  cardPosition,
  data,
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
  isTopCard,
}) => {
  const handleSwipeRigthOpacity = () => {
    const swipeRightOpacity = cardPosition.x.interpolate({
      inputRange: [imageOrigin.x, SCREEN_WIDTH],
      outputRange: [0, 1],
    });

    return swipeRightOpacity;
  };

  const handleSwipeLeftOpacity = () => {
    const swipeLeftOpactiy = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH, imageOrigin.x],
      outputRange: [1, 0],
    });

    return swipeLeftOpactiy;
  };

  const handleSwipeTopOpacity = () => {
    const swipeTopOpacity = Animated.add(
      cardPosition.y,
      cardPosition.x
    ).interpolate({
      inputRange: [-SCREEN_WIDTH / 2, imageOrigin.x],
      outputRange: [1, 0],
    });

    return swipeTopOpacity;
  };

  return (
    <ImageBackground style={styles.image} source={{ uri: data.uri }}>
      {/* LIKE ICONS */}

      <Animated.View
        style={{
          opacity: isTopCard ? handleSwipeRigthOpacity() : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-heart" size={100} color="purple" />
      </Animated.View>

      <Animated.View
        style={{ opacity: isTopCard ? likeOpacity : 0, position: 'absolute' }}
      >
        <Ionicons name="md-heart" size={100} color="purple" />
      </Animated.View>

      {/* DISLIKE ICONS */}

      <Animated.View
        style={{
          opacity: isTopCard ? handleSwipeLeftOpacity() : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-close" size={100} color="purple" />
      </Animated.View>

      <Animated.View
        style={{
          opacity: isTopCard ? dislikeOpacity : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-close" size={100} color="purple" />
      </Animated.View>

      {/* SUPER LIKE ICONS */}

      <Animated.View
        style={{
          opacity: isTopCard ? handleSwipeTopOpacity() : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-star" size={100} color="purple" />
      </Animated.View>

      <Animated.View
        style={{
          opacity: isTopCard ? superlikeOpacity : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-star" size={100} color="purple" />
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardBackground;
