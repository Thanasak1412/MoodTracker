import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// utils
import _ from 'lodash';

// contexts
import { useAppContext } from '../App.provider';

// components
import AnalyticsDV from '../components/AnalyticsChart';

const Analytics: React.FC = () => {
  const { moodList } = useAppContext();

  const data = useMemo(
    () =>
      Object.entries(_.groupBy(moodList, 'mood.emoji')).map(([key, value]) => ({
        x: key,
        y: value.length,
      })),
    [moodList],
  );

  return (
    <View style={styles.container}>
      {!_.isEmpty(moodList) && (
        <Text style={styles.textPie}>Emoji History</Text>
      )}
      <AnalyticsDV data={data} />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPie: {
    position: 'absolute',
    top: '49%',
    right: '39%',
    zIndex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Kalam-bold',
  },
});
