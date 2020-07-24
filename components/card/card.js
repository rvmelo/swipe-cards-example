import React from 'react';
import { Animated, Dimensions } from 'react-native';

import CardBackground from './cardBackground';

const Card = ({
  cardStyle,
  data,
  panResponder,
  pan,
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
}) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const imageOrigin = {
    x:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width * 0.9) / 2,
    y:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').height * 0.6) / 2,
  };

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, imageOrigin.x, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...pan.getLayout(),
      transform: [{ rotate }],
    };
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[{ ...cardStyle }, getCardStyle()]}
    >
      <CardBackground
        likeOpacity={likeOpacity}
        dislikeOpacity={dislikeOpacity}
        superlikeOpacity={superlikeOpacity}
        imageOrigin={imageOrigin}
        pan={pan}
        data={data}
      />
    </Animated.View>
  );
};

export default Card;
