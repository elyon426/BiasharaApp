import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StepOne({ onNext }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Step indicator */}
      <View style={styles.stepperRow}>
        <View style={styles.stepItem}>
          <LinearGradient colors={['forestgreen', 'limegreen']} style={styles.stepCircle}>
            <Text style={styles.stepNumber}>1</Text>
          </LinearGradient>
          <Text style={styles.stepTitle}>You</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleInactive]}>
            <Text style={styles.stepNumberInactive}>2</Text>
          </View>
          <Text style={styles.stepTitleInactive}>Security</Text>
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Tell us a little about yourself</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>National ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your national ID"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
          />
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#bbb"
          />
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputUnderline}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#bbb"
            keyboardType="phone-pad"
          />
          <LinearGradient
            colors={['forestgreen', 'limegreen', 'yellowgreen']}
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
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
    fontWeight: '400',
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