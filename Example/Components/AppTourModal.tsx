import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';

interface Props {
  onContinueBtnPress?:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
}

const AppTourModal = ({ onContinueBtnPress }: Props) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
        Hello world!
      </Text>
      <Text>This is an example.</Text>
      <Pressable
        style={{
          alignItems: 'center',
          backgroundColor: 'blue',
          padding: 20,
          marginTop: 40,
        }}
        onPress={onContinueBtnPress}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default AppTourModal;
