import React, { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// animations
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// constants
import { moodOptions } from '../constants/moodOptions';

// types
import { MoodOptions } from '../@types/mood';

type MoodPickerProps = {
  onSelect: (mood: MoodOptions) => void;
};

// themes
import { theme } from '../theme';

// assets
const imageSrc = require('../../assets/butterflies.png');

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptions>();
  const [hasSelected, setHasSelected] = useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : withTiming(0.8) }],
    }),
    [selectedMood],
  );

  const handleSelectedMood = useCallback(() => {
    if (selectedMood) {
      setSelectedMood(undefined);
      onSelect(selectedMood);
      setHasSelected(true);
    }
  }, [selectedMood, onSelect]);

  const handleHasSelected = useCallback(
    () =>
      hasSelected && (
        <>
          <Image source={imageSrc} />
          <Pressable
            style={styles.button}
            onPress={() => setHasSelected(false)}>
            <Text style={styles.buttonText}>Choose Another</Text>
          </Pressable>
        </>
      ),
    [hasSelected],
  );

  return (
    <View style={styles.container}>
      {!hasSelected ? (
        <>
          <Text style={styles.textHeader}>How are you right now ?</Text>
          <View style={styles.moodList}>
            {moodOptions.map(option => (
              <View key={option.emoji} style={styles.emojiWrapper}>
                <Pressable
                  style={[
                    styles.moodItem,
                    option.emoji === selectedMood?.emoji &&
                      styles.selectedMoodItem,
                  ]}
                  onPress={() => setSelectedMood(option)}>
                  <Text style={styles.moodText}>{option.emoji}</Text>
                </Pressable>
                {selectedMood?.emoji === option.emoji && (
                  <Text style={styles.descriptionText}>
                    {option.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <ReanimatedPressable
            onPress={handleSelectedMood}
            style={[
              styles.button,
              !selectedMood && styles.disabledButton,
              buttonStyle,
            ]}
            disabled={!selectedMood}>
            <Text style={styles.buttonText}>Choose</Text>
          </ReanimatedPressable>
        </>
      ) : (
        <View style={styles.selectedMoodWrapper}>{handleHasSelected()}</View>
      )}
    </View>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colorPurple,
    marginHorizontal: 10,
    paddingTop: 30,
  },
  textHeader: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: theme.fontFamilyLight,
    marginBottom: 30,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  emojiWrapper: {
    alignItems: 'center',
  },
  moodItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  selectedMoodItem: {
    borderWidth: 2,
    borderColor: '#FFFFF',
    backgroundColor: '#454C73',
  },
  moodText: {
    fontSize: 24,
  },
  descriptionText: {
    color: '#454C73',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.colorPurple,
    color: theme.colorWhite,
    borderRadius: 20,
    width: 150,
    paddingVertical: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colorDisabled,
    marginTop: 42,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colorWhite,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyRegular,
  },
  selectedMoodWrapper: {
    alignSelf: 'center',
  },
});
