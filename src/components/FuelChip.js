import React from 'react';
import { Chip, Colors } from 'react-native-paper';

/**
 * A react-native-paper Chip component to show an available
 * fuel for that particular posto.
 *
 * @param {Object} posto - The posto Object
 * @param {String} fuel - The fuel name
 */
const FuelChip = ({ posto, fuel }) => {
  //   console.log('posto em fuelchip', posto);
  return (
    <Chip
      mode="outlined"
      textStyle={{ fontSize: 10 }}
      selected={posto.fuelTypes.includes(fuel)}
      disabled={!posto.fuelTypes.includes(fuel)}
      // selectedColor={Colors.lightGreen700}
      style={
        posto.fuelTypes.includes(fuel)
          ? { backgroundColor: Colors.green700 }
          : { backgroundColor: Colors.red100 }
      }
    >
      {fuel.toUpperCase()}
    </Chip>
  );
};

export default FuelChip;
