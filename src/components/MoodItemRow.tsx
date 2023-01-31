import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

// types
import { MoodOptionsWithTimestamp } from '../@types/mood';

// components
import RenderMoodItem from '../components/RenderMoodItem';

// constants
import * as accessLabel from '../constants/accessibilities';

type Props = {
  moodList: MoodOptionsWithTimestamp[];
};

const MoodItemRow: React.FC<Props> = ({ moodList }) => {
  const onKeyExtractor = useCallback(
    (item: MoodOptionsWithTimestamp) => item.timestamp.toString(),
    [],
  );

  return (
    <FlatList
      accessibilityLabel={accessLabel.moodPicker}
      data={moodList}
      keyExtractor={onKeyExtractor}
      renderItem={({ item }) => <RenderMoodItem item={item} />}
    />
  );
};

export default MoodItemRow;
