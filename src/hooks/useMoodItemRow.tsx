import { useCallback } from 'react';

// animates
import {
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

// types
import { MoodOptionsWithTimestamp } from '../@types/mood';

// contexts
import { useAppContext } from '../App.provider';

const maxPan = 80;

const useMoodItemRow = (
  item: MoodOptionsWithTimestamp,
  offset: SharedValue<number>,
) => {
  const { handleDeletedMood } = useAppContext();

  const removeWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDeletedMood(item);
    }, 500);
  }, [item, handleDeletedMood]);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { shouldRemove: boolean }
  >(
    {
      onActive: (event, ctx) => {
        const xVal = Math.floor(event.translationX);
        offset.value = xVal;

        // use absolute value so the user could swipe either left or right
        ctx.shouldRemove = Math.abs(xVal) <= maxPan ? false : true;
      },
      onEnd: (_, ctx) => {
        if (ctx.shouldRemove) {
          // if the item should be remove, animate it off the screen first
          offset.value = withTiming(Math.sign(offset.value) * 2000);

          // then trigger the remove mood item with a small delay
          runOnJS(removeWithDelay)();
        } else {
          // otherwise, animate the item back to the start
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );

  return { onGestureEvent };
};

export default useMoodItemRow;
