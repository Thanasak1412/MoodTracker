import React from 'react';
import { StyleSheet, View } from 'react-native';

// contexts
import { useAppContext } from '../App.provider';

// components
import MoodItemRow from '../components/MoodItemRow';

const History: React.FC = () => {
  const { moodList } = useAppContext();

  return (
    <View style={styles.container}>
      <MoodItemRow moodList={moodList} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
