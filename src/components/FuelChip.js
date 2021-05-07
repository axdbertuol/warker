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
      selected={posto.fuelTypes.includes(fuel.toLowerCase())}
      disabled={!posto.fuelTypes.includes(fuel.toLowerCase())}
      // selectedColor={Colors.lightGreen700}
      style={[
        posto.fuelTypes.includes(fuel.toLowerCase())
          ? { backgroundColor: Colors.lightGreen100 }
          : { backgroundColor: Colors.red100 },
        { marginRight: 5 },
      ]}
    >
      {fuel.toUpperCase()}
    </Chip>
  );
};

export default FuelChip;
