import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

// components
import MoodPicker from '../components/MoodPicker';

// contexts
import { useAppContext } from '../App.provider';

const imageBackgroundUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

const Home: React.FC = () => {
  const { handleSelectedMood } = useAppContext();

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: imageBackgroundUrl }}>
      <MoodPicker onSelect={handleSelectedMood} />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
