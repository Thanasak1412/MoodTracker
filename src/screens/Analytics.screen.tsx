import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// utils
import _ from 'lodash';

// data visualization
import { VictoryPie } from 'victory-native';

// contexts
import { useAppContext } from '../App.provider';

// themes
import { theme } from '../theme';

const victoryPieStyle = {
  labels: {
    fontSize: 30,
  },
};

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
      <VictoryPie
        data={data}
        labelRadius={90}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={victoryPieStyle}
      />
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
