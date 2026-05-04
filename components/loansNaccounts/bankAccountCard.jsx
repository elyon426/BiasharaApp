import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BankAccountCard({
  label = 'Savings Account',
  accountNumber = '0123 4568 87',
  balance = 'KES 24,500.00',
  loanLimit = '0.00',
  accountType = 'Savings',
  icon = 'wallet-outline',
  onOptionsPress,
}) {
  return (
    <LinearGradient
      colors={['#1a5f1a', '#2d8c2d', '#4caf4c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Top row — label + ellipsis */}
      <View style={styles.topRow}>
        <View style={styles.labelContainer}>
          <Ionicons name={icon} size={18} color="rgba(255,255,255,0.8)" />
          <Text style={styles.label}>{label}</Text>
        </View>
        <TouchableOpacity onPress={onOptionsPress}>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={24}
            color="rgba(255,255,255,0.8)"
          />
        </TouchableOpacity>
      </View>

      {/* Balance — left aligned under label */}
      <View style={styles.balanceSection}>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.loanLimit}>Loan Limit KES {loanLimit}</Text>
      </View>

      {/* Bottom row — account number + account type */}
      <View style={styles.bottomRow}>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
        <Text style={styles.accountType}>{accountType}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
    shadowColor: '#1a5f1a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceSection: {
    alignItems: 'flex-start',
    gap: 4,
  },
  balance: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loanLimit: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountNumber: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
  },
  accountType: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
});
