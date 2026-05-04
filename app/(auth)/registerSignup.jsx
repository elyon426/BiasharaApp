import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GradientBackground from './components/gradientWrapper';
import ShimmerOverlay from './components/shimmer';

export default function WelcomeScreen() {
  return (
    <GradientBackground>
      <ShimmerOverlay />

      {/* Hero — logo + welcome text */}
      <View style={styles.heroSection}>
        <Image
          source={require('./download.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Good to have you here
        </Text>
      </View>

      {/* Stacked buttons — Register first, Sign In below */}
      <View style={styles.buttonStack}>

        <TouchableOpacity style={styles.btnSolid} activeOpacity={0.8}>
          <Ionicons name="person-add-outline" size={20} color="#2d6a2d" style={styles.btnIcon} />
          <Text style={styles.btnSolidText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8}>
          <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Sign In</Text>
        </TouchableOpacity>

      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 28,  // keeps logo clean if PNG bg is white
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.4,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.82)',
    fontWeight: '400',
    letterSpacing: 0.4,
  },

  // Stacked buttons, clear of Android nav bar
  buttonStack: {
    paddingHorizontal: 28,
    paddingBottom: 52,
    gap: 14,
  },
  btnSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  btnSolidText: {
    color: '#2d6a2d',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  btnOutlineText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  btnIcon: {
    marginRight: 8,
  },
});