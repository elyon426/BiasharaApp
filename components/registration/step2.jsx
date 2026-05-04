import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StepTwo({ onNext, onBack }) {
  return (
    <View style={styles.container}>

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Ionicons name="chevron-back" size={22} color="forestgreen" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <View style={styles.stepperRow}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleDone]}>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </View>
          <Text style={styles.stepTitleDone}>You</Text>
        </View>
        <LinearGradient
          colors={['limegreen', 'yellowgreen']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.stepLineDone}
        />
        <View style={styles.stepItem}>
          <LinearGradient colors={['limegreen', 'yellowgreen']} style={styles.stepCircle}>
            <Text style={styles.stepNumber}>2</Text>
          </LinearGradient>
          <Text style={styles.stepTitle}>Security</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleInactive]}>
            <Text style={styles.stepNumberInactive}>3</Text>
          </View>
          <Text style={styles.stepTitleInactive}>Terms</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Secure It</Text>
        <Text style={styles.subtitle}>Set up your login credentials</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <LinearGradient
            colors={['limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#bbb"
            secureTextEntry
          />
          <LinearGradient
            colors={['limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Repeat your password"
            placeholderTextColor="#bbb"
            secureTextEntry
          />
          <LinearGradient
            colors={['limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>
      </View>

      {/* Next button */}
      <View style={styles.buttonStack}>
        <TouchableOpacity onPress={onNext} activeOpacity={0.85}>
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 2,
  },
  backText: {
    color: 'forestgreen',
    fontSize: 14,
    fontWeight: '600',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 8,
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleInactive: {
    backgroundColor: '#f0f0f0',
  },
  stepCircleDone: {
    backgroundColor: 'forestgreen',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  stepNumberInactive: {
    color: '#bbb',
    fontWeight: '700',
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'limegreen',
  },
  stepTitleDone: {
    fontSize: 11,
    fontWeight: '600',
    color: 'forestgreen',
  },
  stepTitleInactive: {
    fontSize: 11,
    fontWeight: '500',
    color: '#bbb',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e8e8e8',
    marginBottom: 16,
    marginHorizontal: 6,
  },
  stepLineDone: {
    flex: 1,
    height: 2,
    marginBottom: 16,
    marginHorizontal: 6,
  },
  titleSection: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  form: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
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
  buttonStack: {
    paddingHorizontal: 28,
    paddingBottom: 52,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});