import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BankAccountCard from '../../components/cards/bankAccountCards';

const transactions = [
  { id: 1, name: 'John Kamau', amount: 1500, type: 'out', date: 'Today, 10:32 AM' },
  { id: 2, name: 'Mary Wanjiku', amount: 3000, type: 'in', date: 'Today, 08:15 AM' },
  { id: 3, name: 'Equity Bank', amount: 500, type: 'out', date: 'Yesterday, 4:45 PM' },
  { id: 4, name: 'Peter Otieno', amount: 2200, type: 'in', date: 'Yesterday, 2:10 PM' },
];

const QUICK_ACTIONS = [
  { icon: 'swap-horizontal-outline', label: 'Transfer', key: 'transfer' },
  { icon: 'receipt-outline', label: 'Pay Bill', key: 'paybill' },
  { icon: 'cellular-outline', label: 'Airtime', key: 'airtime' },
  { icon: 'phone-portrait-outline', label: 'M-Transfer', key: 'mpesa' },
  { icon: 'trending-up-outline', label: 'Loans', key: 'loans' },
  { icon: 'pie-chart-outline', label: 'Shares', key: 'shares' },
];

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(QUICK_ACTIONS.length / ITEMS_PER_PAGE);

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const dotAnimation = useRef(new Animated.Value(0)).current;

  const goToPage = (page) => {
    if (page < 0 || page >= TOTAL_PAGES) return;
    Animated.spring(dotAnimation, {
      toValue: page,
      useNativeDriver: false,
      speed: 20,
      bounciness: 8,
    }).start();
    setCurrentPage(page);
  };

  const currentActions = QUICK_ACTIONS.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>EM</Text>
            </View>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="qr-code-outline" size={22} color="forestgreen" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <View style={styles.bellWrapper}>
                <Ionicons name="notifications-outline" size={22} color="forestgreen" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome back,{' '}
            <Text style={styles.welcomeName}>Elyon 👋</Text>
          </Text>
        </View>

        {/* Balance Card */}
        <BankAccountCard />

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsRow}>
            {currentPage > 0 ? (
              <TouchableOpacity
                style={styles.chevronBtn}
                onPress={() => goToPage(currentPage - 1)}
              >
                <Ionicons name="chevron-back-outline" size={20} color="forestgreen" />
              </TouchableOpacity>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}

            <View style={styles.iconsRow}>
              {currentActions.map((action) => (
                <TouchableOpacity key={action.key} style={styles.actionBtn}>
                  <View style={styles.actionIcon}>
                    <Ionicons name={action.icon} size={22} color="forestgreen" />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {currentPage < TOTAL_PAGES - 1 ? (
              <TouchableOpacity
                style={styles.chevronBtn}
                onPress={() => goToPage(currentPage + 1)}
              >
                <Ionicons name="chevron-forward-outline" size={20} color="forestgreen" />
              </TouchableOpacity>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}
          </View>

          <View style={styles.dotsContainer}>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => goToPage(i)}>
                <Animated.View
                  style={[
                    styles.dot,
                    i === currentPage ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((txn) => (
            <View key={txn.id} style={styles.txnItem}>
              <View style={[
                styles.txnIcon,
                txn.type === 'in' ? styles.txnIconIn : styles.txnIconOut,
              ]}>
                <Ionicons
                  name={txn.type === 'in' ? 'arrow-down-outline' : 'arrow-up-outline'}
                  size={18}
                  color={txn.type === 'in' ? '#2d6a2d' : '#E53935'}
                />
              </View>
              <View style={styles.txnDetails}>
                <Text style={styles.txnName}>{txn.name}</Text>
                <Text style={styles.txnDate}>{txn.date}</Text>
              </View>
              <Text style={[
                styles.txnAmount,
                txn.type === 'in' ? styles.amountIn : styles.amountOut,
              ]}>
                {txn.type === 'in' ? '+' : '-'} KES {txn.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',                                          // ← was #f9f9f9
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  container: { flex: 1, backgroundColor: '#fff' },                   // ← added #fff
  scrollContent: { paddingBottom: 40 },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  navLeft: { flexDirection: 'row', alignItems: 'center' },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 4 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'forestgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  bellWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },

  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  welcomeText: { fontSize: 16, color: '#888', fontWeight: '500' },
  welcomeName: { fontSize: 20, fontWeight: '800', color: '#1a1a1a' },

  actionsContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  iconsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chevronBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(144, 238, 144, 0.4)',
    marginTop: 11,
  },
  chevronPlaceholder: { width: 32 },
  actionBtn: { alignItems: 'center', gap: 6 },
  actionIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(144, 238, 144, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(144, 238, 144, 0.35)',
  },
  actionLabel: {
    fontSize: 11,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    gap: 6,
  },
  dot: { height: 8, borderRadius: 4 },
  dotActive: { width: 24, backgroundColor: 'forestgreen' },
  dotInactive: { width: 8, backgroundColor: 'rgba(144, 238, 144, 0.5)' },

  transactionsContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  viewAll: { fontSize: 13, color: 'forestgreen', fontWeight: '600' },
  txnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  txnIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txnIconIn: { backgroundColor: '#eaf3de' },
  txnIconOut: { backgroundColor: '#fdecea' },
  txnDetails: { flex: 1 },
  txnName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 3 },
  txnDate: { fontSize: 12, color: '#aaa' },
  txnAmount: { fontSize: 14, fontWeight: '700' },
  amountIn: { color: '#2d6a2d' },
  amountOut: { color: '#E53935' },
});