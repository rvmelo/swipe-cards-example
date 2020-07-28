import { Dimensions } from 'react-native';

//  height and width from card as parameters
export const getCardOrigin = (widthPercentage, heightPercentage) => {
  return {
    x:
      Dimensions.get('window').width / 2 -
      (Dimensions.get('window').width * widthPercentage) / 2,
    y:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').height * heightPercentage) / 2,
  };
};
