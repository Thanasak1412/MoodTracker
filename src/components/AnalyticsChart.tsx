import React from 'react';

// data visualization
import { VictoryPie } from 'victory-native';

// themes
import { theme } from '../theme';

// styles
const victoryPieStyle = {
  labels: {
    fontSize: 30,
  },
};

type Props = {
  data: {
    x: string;
    y: number;
  }[];
};

const AnalyticsChart = ({ data }: Props) => {
  return (
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
  );
};

export default AnalyticsChart;
