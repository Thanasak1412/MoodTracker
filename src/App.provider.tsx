import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LayoutAnimation } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// types
import { MoodOptionsWithTimestamp, MoodOptions } from './@types/mood';

type AppContextType = {
  moodList: MoodOptionsWithTimestamp[];
  handleSelectedMood: (mood: MoodOptions) => void;
  handleDeletedMood: (mood: MoodOptionsWithTimestamp) => void;
};

type AppData = {
  moods: MoodOptionsWithTimestamp[];
};

type AppProviderProps = {
  children: ReactNode;
};

const defaultValue = {
  moodList: [],
  handleSelectedMood: () => {},
  handleDeletedMood: () => {},
};

const storageKey = 'my-app-data';

export const AppContext = createContext<AppContextType>(defaultValue);

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const getAppData = async (): Promise<AppData | null> => {
  const data = await AsyncStorage.getItem(storageKey);

  try {
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error => ', error);
  }

  return null;
};

function AppProvider({ children }: AppProviderProps) {
  const [moodList, setMoodList] = useState<MoodOptionsWithTimestamp[]>([]);

  const handleSelectedMood = useCallback((mood: MoodOptions) => {
    setMoodList(prevMood => {
      const newData = [{ mood, timestamp: Date.now() }, ...prevMood];
      setAppData({ moods: newData });

      return newData;
    });
  }, []);

  const handleDeletedMood = useCallback(
    (deletedMood: MoodOptionsWithTimestamp) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMoodList(prev => {
        const newMood = prev.filter(
          mood => mood.timestamp !== deletedMood.timestamp,
        );
        setAppData({ moods: newMood });

        return newMood;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ moodList, handleSelectedMood, handleDeletedMood }),
    [handleDeletedMood, handleSelectedMood, moodList],
  );

  const getDataFromStorage = useCallback(async () => {
    const data = await getAppData();
    if (!!data && JSON.stringify(data) !== JSON.stringify(moodList)) {
      setMoodList(data.moods);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };
