import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Animated as RNAnimated, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

const SUBTITLE = "Your Reliable Business Partner";

export default function App() {
  const router = useRouter();
  const [visibleLetters, setVisibleLetters] = useState([]);
  const letters = SUBTITLE.split('');

  const logoOpacity = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/registerSignup');
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Logo: wait for ZoomIn to finish → fade out → fade back in → stop
  useEffect(() => {
    const fadeSequence = RNAnimated.sequence([
      RNAnimated.delay(1100),           // wait for ZoomIn (1000ms) to settle
      RNAnimated.timing(logoOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      RNAnimated.delay(300),
      RNAnimated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]);

    fadeSequence.start();               // no loop — runs once and stops
  }, []);

  // Letter-by-letter subtitle
  useEffect(() => {
    letters.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLetters(prev => [...prev, i]);
      }, 1300 + i * 55);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* ZoomIn handles the pop-in, RNAnimated handles the fade cycle */}
      <Animated.View
        entering={ZoomIn.duration(1000).springify()}
        style={styles.logoWrapper}
      >
        <RNAnimated.View style={{ opacity: logoOpacity }}>
          <Image
            source={require('../../assets/download.png')}
            style={styles.logo}
          />
        </RNAnimated.View>
      </Animated.View>

      <Animated.Text
        entering={FadeInUp.delay(400).duration(800)}
        style={styles.title}
      >
        Biashara Sacco Society App
      </Animated.Text>

      <View style={styles.subtitleRow}>
        {letters.map((letter, i) => (
          <LetterFade key={i} letter={letter} visible={visibleLetters.includes(i)} />
        ))}
      </View>
    </View>
  );
}

function LetterFade({ letter, visible }) {
  const opacity = useRef(new RNAnimated.Value(0)).current;
  const translateY = useRef(new RNAnimated.Value(8)).current;

  useEffect(() => {
    if (visible) {
      RNAnimated.parallel([
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        RNAnimated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <RNAnimated.Text
      style={[
        styles.subTitle,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {letter}
    </RNAnimated.Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    color: '#2d6a2d',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subtitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#2d6a2d',
  },
});