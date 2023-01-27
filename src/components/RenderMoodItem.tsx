import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

// types
import { MoodOptionsWithTimestamp } from '../@types/mood';

// themes
import { theme } from '../theme';

// dates
import { format } from 'date-fns';

// animations
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

// context
import { useAppContext } from '../App.provider';

// hooks
import useMoodItemRow from '../hooks/useMoodItemRow';

type Props = {
  item: MoodOptionsWithTimestamp;
};

const RenderMoodItem: React.FC<Props> = ({ item }) => {
  const { handleDeletedMood } = useAppContext();
  const offset = useSharedValue(0);
  const { onGestureEvent } = useMoodItemRow(item, offset);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <PanGestureHandler
      {...Platform.select({
        ios: { onGestureEvent },
        android: { onHandlerStateChange: onGestureEvent },
      })}>
      <Reanimated.View style={[styles.moodContainer, animatedStyle]}>
        <View style={styles.moodItem}>
          <Text style={styles.moodIcon}>{item.mood.emoji}</Text>
          <Text style={styles.moodDesc}>{item.mood.description}</Text>
        </View>
        <Text style={styles.dateSelected}>
          {format(item.timestamp, "dd MMM, yyyy 'at' h:mm aa")}
        </Text>
        <Pressable onPress={() => handleDeletedMood(item)}>
          <Text style={styles.deletedButton}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

export default RenderMoodItem;

const styles = StyleSheet.create({
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.colorWhite,
  },
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    fontSize: 36,
    marginRight: 10,
  },
  moodDesc: {
    fontSize: 14,
    fontFamily: theme.fontFamilyBold,
  },
  dateSelected: {
    fontFamily: theme.fontFamilyRegular,
    textAlign: 'center',
    color: theme.colorLavender,
  },
  deletedButton: {
    fontFamily: theme.fontFamilyLight,
    color: theme.colorBlue,
  },
});
