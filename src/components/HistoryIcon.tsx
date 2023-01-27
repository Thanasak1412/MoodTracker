import React from 'react';

// handle svg
import { Circle, Path, Svg } from 'react-native-svg';

// types
import { Props } from '../@types/icon';

const HistoryIcon: React.FC<Props> = ({ color, size }) => {
  return (
    <Svg viewBox="0 0 60.123 60.123" width={size} height={size} fill={color}>
      <Path d="M57.124 51.893H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 33.062H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 14.231H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6z" />
      <Circle cx={4.029} cy={11.463} r={4.029} />
      <Circle cx={4.029} cy={30.062} r={4.029} />
      <Circle cx={4.029} cy={48.661} r={4.029} />
    </Svg>
  );
};

export default HistoryIcon;
