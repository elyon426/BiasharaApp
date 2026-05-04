import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function StatisticsScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const chartData = {
    weekly: [
      { label: 'Mon', income: 4500, expense: 3200 },
      { label: 'Tue', income: 5800, expense: 2100 },
      { label: 'Wed', income: 7200, expense: 4100 },
      { label: 'Thu', income: 3400, expense: 1800 },
      { label: 'Fri', income: 6100, expense: 3900 },
      { label: 'Sat', income: 4800, expense: 2600 },
      { label: 'Sun', income: 5200, expense: 1500 },
    ],
    monthly: [
      { label: 'Wk1', income: 18500, expense: 12300 },
      { label: 'Wk2', income: 22100, expense: 9800 },
      { label: 'Wk3', income: 19400, expense: 14200 },
      { label: 'Wk4', income: 24600, expense: 11500 },
    ],
    yearly: [
      { label: 'Jan', income: 125000, expense: 98000 },
      { label: 'Feb', income: 142000, expense: 112000 },
      { label: 'Mar', income: 168000, expense: 135000 },
      { label: 'Apr', income: 189000, expense: 145000 },
      { label: 'May', income: 176000, expense: 158000 },
      { label: 'Jun', income: 192000, expense: 165000 },
    ],
  };

  const getFormattedChartData = () => {
    const data = chartData[selectedPeriod];
    const result = [];
    data.forEach((item, index) => {
      result.push({
        value: item.income,
        label: item.label,
        frontColor: '#2d8c2d',
        spacing: 4,
        labelTextStyle: { color: '#888', fontSize: 10 },
      });
      result.push({
        value: item.expense,
        frontColor: '#dc2626',
        spacing: index === data.length - 1 ? 0 : 20,
      });
    });
    return result;
  };

  const transactions = [
    { id: 1, name: 'Salary Deposit', amount: 45000, type: 'in', date: 'Today, 10:32 AM', category: 'Income' },
    { id: 2, name: 'M-Pesa Transfer', amount: 5000, type: 'out', date: 'Today, 08:15 AM', category: 'Transfer' },
    { id: 3, name: 'Bill Payment - KPLC', amount: 2500, type: 'out', date: 'Yesterday, 4:45 PM', category: 'Bills' },
    { id: 4, name: 'Airtime Purchase', amount: 500, type: 'out', date: 'Yesterday, 2:10 PM', category: 'Utilities' },
    { id: 5, name: 'Dividend Payout', amount: 12500, type: 'in', date: 'Dec 15, 2024', category: 'Dividends' },
    { id: 6, name: 'Loan Repayment', amount: 8000, type: 'out', date: 'Dec 14, 2024', category: 'Loan' },
    { id: 7, name: 'Share Purchase', amount: 10000, type: 'out', date: 'Dec 12, 2024', category: 'Shares' },
    { id: 8, name: 'Interest Earned', amount: 3200, type: 'in', date: 'Dec 10, 2024', category: 'Interest' },
  ];

  const quickActions = [
    { icon: 'document-text-outline', label: 'Statement', action: 'statement' },
    { icon: 'trending-up-outline', label: 'Loan Stmt', action: 'loan_statement' },
    { icon: 'card-outline', label: 'Card Limits', action: 'card_limits' },
    { icon: 'download-outline', label: 'Export', action: 'export' },
    { icon: 'print-outline', label: 'Print', action: 'print' },
    { icon: 'share-outline', label: 'Share', action: 'share' },
  ];

  const totalIncome = 125000;
  const totalExpenses = 98000;
  const netBalance = totalIncome - totalExpenses;

  const maxVal = selectedPeriod === 'yearly' ? 250000
    : selectedPeriod === 'monthly' ? 30000 : 10000;

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="forestgreen" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Statistics</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="forestgreen" />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {['weekly', 'monthly', 'yearly'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodChip,
                selectedPeriod === period && styles.periodChipActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryWrapper}>
            <LinearGradient
              colors={['#1a5f1a', '#2d8c2d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryIconCircle}>
                <Ionicons name="arrow-down-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryValue}>
                KES {totalIncome.toLocaleString()}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.summaryWrapper}>
            <LinearGradient
              colors={['#b91c1c', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryIconCircle}>
                <Ionicons name="arrow-up-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={styles.summaryValue}>
                KES {totalExpenses.toLocaleString()}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.summaryWrapper}>
            <LinearGradient
              colors={['#4caf4c', '#8bc34a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View style={styles.summaryIconCircle}>
                <Ionicons name="wallet-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.summaryLabel}>Net</Text>
              <Text style={styles.summaryValue}>
                KES {netBalance.toLocaleString()}
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Income vs Expenses</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={getFormattedChartData()}
              barWidth={selectedPeriod === 'yearly' ? 16 : 22}
              spacing={selectedPeriod === 'yearly' ? 6 : 4}
              roundedTop
              hideRules
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{ color: '#9CA3AF', fontSize: 10 }}
              noOfSections={4}
              maxValue={maxVal}
              isAnimated
              animationDuration={500}
              height={200}
            />
          </ScrollView>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2d8c2d' }]} />
              <Text style={styles.legendText}>Income</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
              <Text style={styles.legendText}>Expenses</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['forestgreen', 'limegreen']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickActionIcon}
                >
                  <Ionicons name={action.icon} size={22} color="#fff" />
                </LinearGradient>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
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

          <ScrollView
            style={styles.txnScroll}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {transactions.map((txn, index) => (
              <TouchableOpacity
                key={txn.id}
                style={[
                  styles.txnItem,
                  index === transactions.length - 1 && styles.lastTxnItem,
                ]}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.txnIcon,
                  txn.type === 'in' ? styles.txnIconIn : styles.txnIconOut,
                ]}>
                  <Ionicons
                    name={txn.type === 'in' ? 'arrow-down-outline' : 'arrow-up-outline'}
                    size={20}
                    color={txn.type === 'in' ? '#2d8c2d' : '#dc2626'}
                  />
                </View>
                <View style={styles.txnDetails}>
                  <Text style={styles.txnName}>{txn.name}</Text>
                  <Text style={styles.txnDate}>{txn.date}</Text>
                </View>
                <View style={styles.txnRight}>
                  <Text style={[
                    styles.txnAmount,
                    txn.type === 'in' ? styles.amountIn : styles.amountOut,
                  ]}>
                    {txn.type === 'in' ? '+' : '-'} KES {txn.amount.toLocaleString()}
                  </Text>
                  <Text style={styles.txnCategory}>{txn.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Period Selector
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 12,
    padding: 4,
  },
  periodChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  periodChipActive: {
    backgroundColor: 'rgba(45, 140, 45, 0.12)',
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  periodTextActive: {
    color: 'forestgreen',
  },

  // Summary Cards
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  summaryWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryCard: {
    padding: 14,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  summaryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
    flexWrap: 'wrap',
  },

  // Chart
  chartContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Quick Actions
  quickActionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '30%',
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },

  // Transactions
  transactionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 13,
    color: 'forestgreen',
    fontWeight: '600',
  },
  txnScroll: {
    maxHeight: 320,
  },
  txnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastTxnItem: {
    borderBottomWidth: 0,
  },
  txnIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  txnIconIn: { backgroundColor: '#e8f5e8' },
  txnIconOut: { backgroundColor: '#fee2e2' },
  txnDetails: { flex: 1 },
  txnName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  txnDate: { fontSize: 11, color: '#bbb' },
  txnRight: { alignItems: 'flex-end' },
  txnAmount: { fontSize: 14, fontWeight: '700' },
  amountIn: { color: '#2d8c2d' },
  amountOut: { color: '#dc2626' },
  txnCategory: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
});