import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

// types
import { MoodOptionsWithTimestamp } from '../@types/mood';

// components
import RenderMoodItem from '../components/RenderMoodItem';

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
      data={moodList}
      keyExtractor={onKeyExtractor}
      renderItem={({ item }) => <RenderMoodItem item={item} />}
    />
  );
};

export default MoodItemRow;
