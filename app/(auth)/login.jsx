import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View style={styles.container}>

      {/* Logo — top left corner */}
      <View style={styles.logoWrap}>
        <Image
          source={require('./download.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Hero text */}
      <View style={styles.heroSection}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Member PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your PIN"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
          />
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#bbb"
            secureTextEntry
          />
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

      </View>

      {/* Buttons */}
      <View style={styles.buttonStack}>

        {/* Fingerprint button — white bg, gradient border */}
        <TouchableOpacity activeOpacity={0.85} style={styles.fingerprintOuter}>
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fingerprintGradientBorder}
          >
            <View style={styles.fingerprintInner}>
              <Ionicons name="finger-print-outline" size={28} color="forestgreen" />
              <Text style={styles.fingerprintText}>Use biometrics</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Let me in — gradient fill */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.letMeInBtn}
          >
            <Text style={styles.letMeInText}>Let me in</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  logoWrap: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'flex-start',
  },
  logo: {
    width: 72,
    height: 72,
  },
  heroSection: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '400',
  },
  form: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    gap: 28,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    fontSize: 16,
    color: '#1a1a1a',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  inputUnderline: {
    height: 2,
    borderRadius: 2,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  forgotText: {
    fontSize: 13,
    color: 'forestgreen',
    fontWeight: '500',
  },
  buttonStack: {
    paddingHorizontal: 28,
    paddingBottom: 52,
    gap: 14,
  },
  fingerprintOuter: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  fingerprintGradientBorder: {
    padding: 2,
    borderRadius: 14,
  },
  fingerprintInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    gap: 10,
  },
  fingerprintText: {
    color: 'forestgreen',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.4,
  },
  letMeInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  letMeInText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});