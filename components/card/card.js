import React from 'react';
import { Animated, Dimensions } from 'react-native';

import CardBackground from './cardBackground';

const Card = ({
  cardStyle,
  data,
  panResponder,
  cardPosition,
  likeOpacity,
  dislikeOpacity,
  superlikeOpacity,
  isTopCard,
  isPreviousCard,
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
    const rotate = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, imageOrigin.x, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...cardPosition.getLayout(),
      transform: [{ rotate }],
    };
  };

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={
          isTopCard || isPreviousCard
            ? [{ ...cardStyle }, getCardStyle()]
            : [{ ...cardStyle }]
        }
      >
        <CardBackground
          likeOpacity={likeOpacity}
          dislikeOpacity={dislikeOpacity}
          superlikeOpacity={superlikeOpacity}
          imageOrigin={imageOrigin}
          cardPosition={cardPosition}
          data={data}
          isTopCard={isTopCard}
        />
      </Animated.View>
    </>
  );
};

export default Card;
