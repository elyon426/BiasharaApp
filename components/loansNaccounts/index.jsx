import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Import components
import AccountSummaryCard from './accountSummaryCard';
import BankAccountCard from './bankAccountCard';
import LoanAccountCard from './loanAccountCard';

export default function AccountsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' or 'loans'

  // Sample accounts data
  const accounts = [
    {
      id: 1,
      label: 'Main Account',
      accountNumber: '0123 4568 87',
      balance: '45,200.00',
      loanLimit: '0.00',
      accountType: 'Current',
      icon: 'wallet-outline',
    },
    {
      id: 2,
      label: 'Savings Account',
      accountNumber: '2345 6789 01',
      balance: '120,500.00',
      loanLimit: '0.00',
      accountType: 'Savings',
      icon: 'save-outline',
    },
    {
      id: 3,
      label: 'Shares Account',
      accountNumber: '3456 7890 12',
      balance: '125,000.00',
      loanLimit: '0.00',
      accountType: 'Shares',
      icon: 'trending-up-outline',
    },
    {
      id: 4,
      label: 'Fixed Deposit',
      accountNumber: '4567 8901 23',
      balance: '200,000.00',
      loanLimit: '0.00',
      accountType: 'Fixed',
      icon: 'time-outline',
    },
  ];

  // Sample loans data
  const loans = [
    {
      id: 1,
      label: 'Development Loan',
      accountNumber: 'DEV-2024-001',
      balance: '150,000.00',
      loanLimit: '500,000.00',
      accountType: 'Active',
      interestRate: '12%',
      nextPayment: '2024-02-15',
      icon: 'business-outline',
    },
    {
      id: 2,
      label: 'Emergency Loan',
      accountNumber: 'EMG-2024-045',
      balance: '25,000.00',
      loanLimit: '100,000.00',
      accountType: 'Active',
      interestRate: '10%',
      nextPayment: '2024-02-10',
      icon: 'alert-circle-outline',
    },
    {
      id: 3,
      label: 'School Fees Loan',
      accountNumber: 'SCH-2024-012',
      balance: '80,000.00',
      loanLimit: '200,000.00',
      accountType: 'Active',
      interestRate: '11%',
      nextPayment: '2024-02-20',
      icon: 'school-outline',
    },
    {
      id: 4,
      label: 'Business Loan',
      accountNumber: 'BIZ-2024-078',
      balance: '0.00',
      loanLimit: '1,000,000.00',
      accountType: 'Eligible',
      interestRate: '13%',
      nextPayment: 'Apply Now',
      icon: 'briefcase-outline',
    },
  ];

  // Calculate totals
  const totalAccountBalance = accounts.reduce((sum, acc) => sum + parseFloat(acc.balance.replace(/,/g, '')), 0);
  const totalLoanBalance = loans.reduce((sum, loan) => sum + parseFloat(loan.balance.replace(/,/g, '')), 0);
  const totalIn = '18,500.00';
  const totalOut = '12,300.00';

  const handleAccountOptions = (accountId) => {
    console.log('Account options pressed for:', accountId);
  };

  const handleLoanOptions = (loanId) => {
    console.log('Loan options pressed for:', loanId);
  };

  const handleSummaryOptions = () => {
    console.log('Summary options pressed');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1a5f1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Accounts</Text>
        <TouchableOpacity style={styles.placeholder}>
          <Ionicons name="search-outline" size={22} color="#1a5f1a" />
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'accounts' && styles.tabActive]}
          onPress={() => setActiveTab('accounts')}
        >
          <Text style={[styles.tabText, activeTab === 'accounts' && styles.tabTextActive]}>
            Accounts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'loans' && styles.tabActive]}
          onPress={() => setActiveTab('loans')}
        >
          <Text style={[styles.tabText, activeTab === 'loans' && styles.tabTextActive]}>
            Loans
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'accounts' ? (
          <>
            {/* Summary Card for Accounts */}
            <AccountSummaryCard
              totalBalance={`KES ${totalAccountBalance.toLocaleString()}.00`}
              accountCount={accounts.length}
              totalIn={totalIn}
              totalOut={totalOut}
              isLoan={false}
              onOptionsPress={handleSummaryOptions}
            />

            {/* Individual Account Cards */}
            {accounts.map((account) => (
              <BankAccountCard
                key={account.id}
                label={account.label}
                accountNumber={account.accountNumber}
                balance={`KES ${account.balance}`}
                loanLimit={account.loanLimit}
                accountType={account.accountType}
                icon={account.icon}
                onOptionsPress={() => handleAccountOptions(account.id)}
              />
            ))}
          </>
        ) : (
          <>
            {/* Summary Card for Loans */}
            <AccountSummaryCard
              totalBalance={`KES ${totalLoanBalance.toLocaleString()}.00`}
              accountCount={loans.filter(l => l.accountType === 'Active').length}
              totalIn="0.00"
              totalOut={totalLoanBalance.toLocaleString()}
              isLoan={true}
              onOptionsPress={handleSummaryOptions}
            />

            {/* Individual Loan Cards */}
            {loans.map((loan) => (
              <LoanAccountCard
                key={loan.id}
                label={loan.label}
                accountNumber={loan.accountNumber}
                balance={`KES ${loan.balance}`}
                loanLimit={loan.loanLimit}
                accountType={loan.accountType}
                interestRate={loan.interestRate}
                nextPayment={loan.nextPayment}
                icon={loan.icon}
                onOptionsPress={() => handleLoanOptions(loan.id)}
              />
            ))}
          </>
        )}

        {/* Extra padding at bottom */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26, 95, 26, 0.10)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 95, 26, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a5f1a',
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: 'rgba(26, 95, 26, 0.10)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#1a5f1a',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  bottomPadding: {
    height: 20,
  },
});