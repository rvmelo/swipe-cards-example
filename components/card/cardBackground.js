import React from 'react';
import { Animated, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  hooks
import useOpacityAnimations from '../../hooks/useOpacityAnimations';

const CardBackground = ({
  cardPosition,
  data,
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
  isTopCard,
  handleOpacity,
}) => {
  const {
    handleSwipeRigthOpacity,
    handleSwipeLeftOpacity,
    handleSwipeTopOpacity,
  } = useOpacityAnimations(cardPosition);

  return (
    <ImageBackground style={styles.image} source={{ uri: data.uri }}>
      {/* LIKE ICONS */}

      <Animated.View
        style={{
          opacity: isTopCard && handleOpacity ? handleSwipeRigthOpacity() : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-heart" size={100} color="purple" />
      </Animated.View>

      <Animated.View
        style={{
          opacity: isTopCard ? likeOpacity : 0,
          position: 'absolute',
        }}
      >
        <Ionicons name="md-heart" size={100} color="purple" />
      </Animated.View>

      {/* DISLIKE ICONS */}

      <Animated.View
        style={{
          opacity: isTopCard && handleOpacity ? handleSwipeLeftOpacity() : 0,
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
          opacity: isTopCard && handleOpacity ? handleSwipeTopOpacity() : 0,
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
