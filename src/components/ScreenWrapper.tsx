import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

// A nice dark blue/magic background texture
const BACKGROUND_IMAGE = require('../../assets/background.jpg');
// Alternative (Hextech): You can use any URL you find online later!

interface ScreenWrapperProps {
  children: ReactNode;
  centered?: boolean;
}

export const ScreenWrapper = ({ children, centered = true }: ScreenWrapperProps) => {
  return (
    <ImageBackground 
      source={BACKGROUND_IMAGE} 
      style={styles.backgroundImage}
      resizeMode="cover"
      // We add a dark overlay so text is easy to read
      imageStyle={{ opacity: 0.2 }} 
    >
      <SafeAreaView style={[styles.container, centered ? styles.centered : null]}>
        <StatusBar barStyle="light-content" />
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#091428', // Fallback color
  },
  container: {
    flex: 1,
    // Android needs extra padding at the top usually
    paddingTop: Platform.OS === 'android' ? 30 : 0, 
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});