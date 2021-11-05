import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
const axios = require('axios');

const FearAndGreedValue = () => {
  const [finalValue, setValue] = useState(0);
  const [finalText, setText] = useState('');

  async function getFearGreedValue() {
    try {
      const response = await axios.get(
        'https://api.alternative.me/fng/?limit=1'
      );
      let value = response.data.data[0].value;
      setValue(value);
      if (value < 30) {
        setText("It's time to buy the dip");
      } else if (value > 30 && value < 70) {
        setText('Sometimes waiting is the hardest thing to do');
      } else {
        setText('Sell it now!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFearGreedValue();
  }, []);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.valueText}>{finalValue}</Text>
      <Text style={styles.actionText}>{finalText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  valueText: {
    color: 'green',
    fontSize: 170,
    paddingLeft: 50,
    fontWeight: 'bold',
    fontFamily: 'Iowan Old Style',
  },
  actionText: {
    color: 'red',
    fontSize: 60,
    paddingLeft: 50,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
});

export default FearAndGreedValue;
