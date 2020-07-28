import React from 'react';
import { Animated } from 'react-native';

//  components
import CardBackground from './cardBackground';

//  hooks
import useSwipeAnimations from '../../hooks/useSwipeAnimations';

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
  const { getCardStyle } = useSwipeAnimations();

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={
          isTopCard || isPreviousCard
            ? [{ ...cardStyle }, getCardStyle(cardPosition)]
            : [{ ...cardStyle }]
        }
      >
        <CardBackground
          likeOpacity={likeOpacity}
          dislikeOpacity={dislikeOpacity}
          superlikeOpacity={superlikeOpacity}
          cardPosition={cardPosition}
          data={data}
          isTopCard={isTopCard}
        />
      </Animated.View>
    </>
  );
};

export default Card;
