import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoanAccountCard({
  label = 'Development Loan',
  accountNumber = 'DEV-2024-001',
  balance = 'KES 150,000.00',
  loanLimit = 'KES 500,000.00',
  accountType = 'Active',
  interestRate = '12%',
  nextPayment = '2024-02-15',
  icon = 'business-outline',
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

      {/* Balance section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.loanLimit}>Loan Limit {loanLimit}</Text>
      </View>

      {/* Loan details */}
      <View style={styles.loanDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Interest Rate</Text>
          <Text style={styles.detailValue}>{interestRate}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Next Payment</Text>
          <Text style={styles.detailValue}>{nextPayment}</Text>
        </View>
      </View>

      {/* Bottom row — loan ref + status */}
      <View style={styles.bottomRow}>
        <Text style={styles.accountNumber}>Ref: {accountNumber}</Text>
        <View style={[
          styles.statusBadge,
          accountType === 'Active' ? styles.statusActive : styles.statusEligible
        ]}>
          <Text style={styles.statusText}>{accountType}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
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
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceSection: {
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 8,
  },
  balance: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loanLimit: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '500',
  },
  loanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '500',
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  accountNumber: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statusEligible: {
    backgroundColor: 'rgba(255,215,0,0.3)',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});
