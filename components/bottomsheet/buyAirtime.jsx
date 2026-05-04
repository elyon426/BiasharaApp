import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function AirtimePurchaseSheet({ visible, onClose, onPurchase }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountSheet, setShowAccountSheet] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showOperatorSheet, setShowOperatorSheet] = useState(false);

  const accounts = [
    { id: 1, name: 'Main Account', balance: '45,200', icon: 'wallet-outline', color: '#1a5f1a' },
    { id: 2, name: 'Savings Account', balance: '120,500', icon: 'save-outline', color: '#2d8c2d' },
    { id: 3, name: 'Shares Account', balance: '125,000', icon: 'trending-up-outline', color: '#4caf4c' },
    { id: 4, name: 'Loan Account', balance: '-25,000', icon: 'business-outline', color: '#dc2626' },
  ];

  const operators = [
    { id: 1, name: 'Safaricom', code: 'safaricom', color: '#00A859', bgColor: 'rgba(0, 168, 89, 0.10)' },
    { id: 2, name: 'Airtel', code: 'airtel', color: '#E31E24', bgColor: 'rgba(227, 30, 36, 0.10)' },
    { id: 3, name: 'Telkom', code: 'telkom', color: '#00AEEF', bgColor: 'rgba(0, 174, 239, 0.10)' },
    { id: 4, name: 'Equitel', code: 'equitel', color: '#F15A24', bgColor: 'rgba(241, 90, 36, 0.10)' },
  ];

  const quickAmounts = [50, 100, 200, 500, 1000];

  // Set default account when sheet opens
  useState(() => {
    if (!selectedAccount && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [visible]);

  const handlePurchase = () => {
    if (!selectedOperator || !phoneNumber || !amount || !selectedAccount) {
      alert('Please fill in all fields');
      return;
    }
    
    const purchaseData = {
      account: selectedAccount,
      phoneNumber,
      amount: parseFloat(amount),
      operator: selectedOperator,
      timestamp: new Date().toISOString(),
    };
    
    if (onPurchase) onPurchase(purchaseData);
    onClose();
    // Reset form
    setPhoneNumber('');
    setAmount('');
    setSelectedOperator(null);
    setSelectedAccount(accounts[0]);
  };

  const formatPhoneNumber = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('254') && cleaned.length > 9) {
      cleaned = '0' + cleaned.slice(3);
    }
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  return (
    <>
      {/* Main Airtime Purchase Sheet */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Buy Airtime</Text>
                <Text style={styles.sheetSubtitle}>Purchase airtime instantly</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close-outline" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Account Selection - Clickable with chevron */}
            <TouchableOpacity 
              style={styles.inputRow}
              onPress={() => setShowAccountSheet(true)}
              activeOpacity={0.7}
            >
              <View style={styles.inputIcon}>
                <Ionicons name="wallet-outline" size={20} color="#1a5f1a" />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>From Account</Text>
                <Text style={styles.inputValue}>{selectedAccount?.name}</Text>
                {selectedAccount && (
                  <Text style={styles.accountBalanceHint}>
                    Balance: KES {selectedAccount.balance}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#B8E4B8" />
            </TouchableOpacity>

            <View style={styles.dividerLight} />

            {/* Phone Number Input */}
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <Ionicons name="call-outline" size={20} color="#1a5f1a" />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0712345678"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={formatPhoneNumber}
                  maxLength={10}
                />
              </View>
              {phoneNumber.length > 0 && (
                <TouchableOpacity onPress={() => setPhoneNumber('')}>
                  <Ionicons name="close-circle-outline" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.dividerLight} />

            {/* Operator Selection */}
            <TouchableOpacity 
              style={styles.inputRow}
              onPress={() => setShowOperatorSheet(true)}
              activeOpacity={0.7}
            >
              <View style={styles.inputIcon}>
                <Ionicons name="phone-portrait-outline" size={20} color="#1a5f1a" />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Mobile Network</Text>
                {selectedOperator ? (
                  <View style={styles.selectedOperator}>
                    <Text style={styles.inputValue}>{selectedOperator.name}</Text>
                  </View>
                ) : (
                  <Text style={styles.inputPlaceholder}>Select operator</Text>
                )}
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#B8E4B8" />
            </TouchableOpacity>

            <View style={styles.dividerLight} />

            {/* Amount Input */}
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <Ionicons name="cash-outline" size={20} color="#1a5f1a" />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Amount (KES)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
              {amount.length > 0 && (
                <TouchableOpacity onPress={() => setAmount('')}>
                  <Ionicons name="close-circle-outline" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            {/* Quick Amounts */}
            <View style={styles.quickAmountsContainer}>
              {quickAmounts.map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.quickAmountChip,
                    parseFloat(amount) === amt && styles.quickAmountChipActive,
                  ]}
                  onPress={() => setAmount(amt.toString())}
                >
                  <Text style={[
                    styles.quickAmountText,
                    parseFloat(amount) === amt && styles.quickAmountTextActive,
                  ]}>
                    KES {amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Purchase Button */}
            <TouchableOpacity 
              style={[
                styles.purchaseButton,
                (!selectedOperator || !phoneNumber || !amount || !selectedAccount) && styles.purchaseButtonDisabled
              ]}
              onPress={handlePurchase}
              disabled={!selectedOperator || !phoneNumber || !amount || !selectedAccount}
            >
              <Ionicons name="rocket-outline" size={20} color="#fff" />
              <Text style={styles.purchaseButtonText}>Buy Airtime</Text>
            </TouchableOpacity>

            {/* Info Note */}
            <View style={styles.infoNote}>
              <Ionicons name="information-circle-outline" size={14} color="#9CA3AF" />
              <Text style={styles.infoText}>
                Transaction fee: KES 0 | Instant delivery
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Account Selection Bottom Sheet */}
      <Modal
        visible={showAccountSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAccountSheet(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAccountSheet(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.accountSheet}>
          <View style={styles.handle} />
          
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Select Account</Text>
            <TouchableOpacity 
              onPress={() => setShowAccountSheet(false)} 
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={[
                styles.accountItem,
                selectedAccount?.id === account.id && styles.accountItemActive,
              ]}
              onPress={() => {
                setSelectedAccount(account);
                setShowAccountSheet(false);
              }}
            >
              <View style={[styles.accountIcon, { backgroundColor: 'rgba(26, 95, 26, 0.10)' }]}>
                <Ionicons name={account.icon} size={22} color={account.color} />
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountBalanceText}>
                  Balance: KES {account.balance}
                </Text>
              </View>
              {selectedAccount?.id === account.id && (
                <Ionicons name="checkmark-circle" size={22} color="#1a5f1a" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Operator Selection Bottom Sheet */}
      <Modal
        visible={showOperatorSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOperatorSheet(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowOperatorSheet(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.operatorSheet}>
          <View style={styles.handle} />
          
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Select Network</Text>
            <TouchableOpacity 
              onPress={() => setShowOperatorSheet(false)} 
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {operators.map((operator) => (
            <TouchableOpacity
              key={operator.id}
              style={[
                styles.operatorItem,
                selectedOperator?.id === operator.id && styles.operatorItemActive,
              ]}
              onPress={() => {
                setSelectedOperator(operator);
                setShowOperatorSheet(false);
              }}
            >
              <View style={[styles.operatorIcon, { backgroundColor: operator.bgColor }]}>
                <Ionicons name="phone-portrait-outline" size={22} color={operator.color} />
              </View>
              <Text style={styles.operatorName}>{operator.name}</Text>
              {selectedOperator?.id === operator.id && (
                <Ionicons name="checkmark-circle" size={22} color="#1a5f1a" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    maxHeight: '90%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  sheetSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  dividerLight: {
    height: 1,
    backgroundColor: '#F9FAFB',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 95, 26, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#111827',
    padding: 0,
    margin: 0,
    fontWeight: '500',
  },
  inputPlaceholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  inputValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  accountBalanceHint: {
    fontSize: 11,
    color: '#1a5f1a',
    marginTop: 2,
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    marginBottom: 24,
  },
  quickAmountChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 26, 0.12)',
  },
  quickAmountChipActive: {
    backgroundColor: '#1a5f1a',
    borderColor: '#1a5f1a',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a5f1a',
  },
  quickAmountTextActive: {
    color: '#fff',
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a5f1a',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  purchaseButtonDisabled: {
    backgroundColor: 'rgba(26, 95, 26, 0.3)',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  // Account Sheet Styles
  accountSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  accountItemActive: {
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  accountBalanceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Operator Sheet Styles
  operatorSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  operatorItemActive: {
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
  },
  operatorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  operatorName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});