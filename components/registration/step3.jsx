import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StepThree({ onBack, onSubmit }) {
  const [accepted, setAccepted] = useState(false);

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
          colors={['forestgreen', 'limegreen']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.stepLineDone}
        />
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleDone]}>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </View>
          <Text style={styles.stepTitleDone}>Security</Text>
        </View>
        <LinearGradient
          colors={['limegreen', 'yellowgreen']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.stepLineDone}
        />
        <View style={styles.stepItem}>
          <LinearGradient colors={['yellowgreen', 'yellow']} style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </LinearGradient>
          <Text style={styles.stepTitleActive}>Terms</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Almost There</Text>
        <Text style={styles.subtitle}>Read and accept to finish up</Text>
      </View>

      {/* T&C scroll */}
      <ScrollView
        style={styles.tcScroll}
        contentContainerStyle={styles.tcContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tcBox}>
          <Text style={styles.tcTitle}>Terms & Conditions</Text>
          <Text style={styles.tcText}>
            By registering, you agree to our terms of service and privacy policy.
            Your data will be handled securely and never sold to third parties.
            You are responsible for maintaining the confidentiality of your account
            credentials. Misuse of the platform may result in account suspension.
            We reserve the right to update these terms with reasonable notice.
            Continued use of the app constitutes acceptance of any updated terms.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonStack}>
        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && <Ionicons name="checkmark" size={13} color="#fff" />}
          </View>
          <Text style={styles.checkLabel}>I have read and accept the T&C</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={accepted ? onSubmit : null} activeOpacity={0.85}>
          <LinearGradient
            colors={
              accepted
                ? ['forestgreen', 'limegreen', 'yellowgreen', 'yellow']
                : ['#ccc', '#ddd']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Create Account</Text>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
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
  stepCircleDone: {
    backgroundColor: 'forestgreen',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  stepTitleDone: {
    fontSize: 11,
    fontWeight: '600',
    color: 'forestgreen',
  },
  stepTitleActive: {
    fontSize: 11,
    fontWeight: '600',
    color: 'yellowgreen',
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
  tcScroll: {
    flex: 1,
    paddingHorizontal: 28,
  },
  tcContent: {
    paddingVertical: 16,
  },
  tcBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tcTitle: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 10,
  },
  tcText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 22,
  },
  buttonStack: {
    paddingHorizontal: 28,
    paddingBottom: 65,
    gap: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'forestgreen',
    borderColor: 'forestgreen',
  },
  checkLabel: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
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