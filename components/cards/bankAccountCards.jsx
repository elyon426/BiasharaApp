import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BankAccountCard({
  label = 'Savings Account',
  accountNumber = '0123 4568 87',
  balance = 'KES 24,500.00',
  loanLimit = '0.00',
  accountType = 'Savings',
  onOptionsPress
}) {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['forestgreen', 'limegreen', 'yellowgreen', 'yellow']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity onPress={onOptionsPress}>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={24}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.balance}>{balance}</Text>
          <View style={styles.loanRow}>
            <Ionicons name="arrow-up-circle-outline" size={13} color="rgba(255,255,255,0.65)" />
            <Text style={styles.loanLimit}>Loan Limit  KES {loanLimit}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.accountNumber}>{accountNumber}</Text>
          <Text style={styles.accountType}>{accountType}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#fff',  // matches page bg — hides grey shadow bleed
    shadowColor: '#2d6a2d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
    overflow: 'hidden',       // clips gradient cleanly inside the radius
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceSection: {
    alignItems: 'flex-start',
    gap: 4,
  },
  balance: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  loanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loanLimit: {
    color: 'rgba(255,255,255,0.65)',
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