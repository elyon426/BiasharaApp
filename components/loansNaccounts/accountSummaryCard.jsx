import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AccountSummaryCard({
  totalBalance = 'KES 244,800.00',
  accountCount = 5,
  totalIn = '3,000.00',
  totalOut = '2,000.00',
  isLoan = false,
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
        <Text style={styles.label}>
          {isLoan ? 'Total Loan Balance' : 'Total Balance'}
        </Text>
        <TouchableOpacity onPress={onOptionsPress}>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={24}
            color="rgba(255,255,255,0.8)"
          />
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <View style={styles.balanceSection}>
        <Text style={styles.balance}>{totalBalance}</Text>
        <Text style={styles.accountCount}>
          Across {accountCount} linked {isLoan ? 'loans' : 'accounts'}
        </Text>
      </View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomItem}>
          <Ionicons
            name="arrow-down-outline"
            size={14}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.bottomLabel}>Total In</Text>
          <Text style={styles.bottomValue}>KES {totalIn}</Text>
        </View>

        <View style={styles.bottomDivider} />

        <View style={styles.bottomItem}>
          <Ionicons
            name="arrow-up-outline"
            size={14}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.bottomLabel}>Total Out</Text>
          <Text style={styles.bottomValue}>KES {totalOut}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#1a5f1a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceSection: {
    gap: 4,
  },
  balance: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  accountCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  bottomDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bottomLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '500',
  },
  bottomValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
