import React, { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../constants';
import styles from '../constants/styling';

export default function Description({ text }) {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [newText, setNewText] = useState([]);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);
  useEffect(() => {
    makeText();
  }, []);
  const makeText = () => {
    const textByLine = text.split('\n');
    setNewText(textByLine);
  };
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={!textShown ? styles.descriptionBg : styles.descriptionBgFull}>
        {newText
          ? newText.map((item, index) => {
              return (
                <View key={index}>
                  <Text
                    onTextLayout={onTextLayout}
                    style={{
                      color: COLORS.thrid,
                      fontSize: 10,
                      marginLeft: 30,
                      marginBottom: 10,
                      paddingRight: 15,
                    }}>
                    ‣ {item}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
      {newText.length > 3 ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{
            color: COLORS.black,
            fontSize: 10,
            marginLeft: 30,
            marginBottom: 20,
          }}>
          {!textShown ? 'Read less...' : 'Read more...'}
        </Text>
      ) : null}
    </View>
  );
}
