import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function ShimmerOverlay() {
  const translateX = useRef(new Animated.Value(-350)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        // Reset position instantly before each sweep
        Animated.timing(translateX, {
          toValue: -350,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 600,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.delay(400),
      ])
    ).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[
          styles.shimmerWrap,
          { opacity, transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.10)',
            'rgba(255,255,255,0.22)',
            'rgba(255,255,255,0.10)',
            'transparent',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 350,
  },
  shimmerGradient: {
    flex: 1,
  },
});