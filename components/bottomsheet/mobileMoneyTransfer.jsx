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

export default function MTransferSheet({ visible, onClose, onSelectOption }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountSheet, setShowAccountSheet] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [showBankSheet, setShowBankSheet] = useState(false);
  const [selectedTransferType, setSelectedTransferType] = useState(null);

  const accounts = [
    { id: 1, name: 'Main Account', balance: '45,200', icon: 'wallet-outline', color: '#1a5f1a' },
    { id: 2, name: 'Savings Account', balance: '120,500', icon: 'save-outline', color: '#2d8c2d' },
    { id: 3, name: 'Shares Account', balance: '125,000', icon: 'trending-up-outline', color: '#4caf4c' },
  ];

  const transferTypes = [
    { 
      id: 1, 
      name: 'FOSA to M-Pesa', 
      desc: 'Withdraw from FOSA to mobile money',
      icon: 'phone-portrait-outline',
      color: '#00A859',
      requiresPhone: true,
      requiresBank: false,
    },
    { 
      id: 2, 
      name: 'FOSA to Bank', 
      desc: 'Transfer to external bank account',
      icon: 'business-outline',
      color: '#1a5f1a',
      requiresPhone: false,
      requiresBank: true,
    },
    { 
      id: 3, 
      name: 'M-Pesa to FOSA', 
      desc: 'Deposit from mobile money to FOSA',
      icon: 'arrow-down-outline',
      color: '#00A859',
      requiresPhone: true,
      requiresBank: false,
    },
    { 
      id: 4, 
      name: 'Bank to FOSA', 
      desc: 'Deposit from external bank',
      icon: 'arrow-down-outline',
      color: '#1a5f1a',
      requiresPhone: false,
      requiresBank: true,
    },
  ];

  const banks = [
    { id: 1, name: 'Equity Bank', code: 'equity', icon: 'business-outline', color: '#F15A24' },
    { id: 2, name: 'KCB Bank', code: 'kcb', icon: 'business-outline', color: '#0066B2' },
    { id: 3, name: 'Cooperative Bank', code: 'coop', icon: 'business-outline', color: '#009A44' },
    { id: 4, name: 'Absa Bank', code: 'absa', icon: 'business-outline', color: '#FF6200' },
    { id: 5, name: 'Stanbic Bank', code: 'stanbic', icon: 'business-outline', color: '#002395' },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  // Set default transfer type when sheet opens
  useState(() => {
    if (!selectedTransferType && transferTypes.length > 0) {
      setSelectedTransferType(transferTypes[0]);
    }
    if (!selectedAccount && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [visible]);

  const handleTransfer = () => {
    if (!selectedTransferType || !selectedAccount || !amount) {
      alert('Please fill in all required fields');
      return;
    }

    if (selectedTransferType.requiresPhone && !phoneNumber) {
      alert('Phone number is required for this transfer');
      return;
    }

    if (selectedTransferType.requiresBank && !selectedBank) {
      alert('Please select a bank');
      return;
    }
    
    const transferData = {
      type: selectedTransferType.name,
      fromAccount: selectedAccount,
      amount: parseFloat(amount),
      phoneNumber: selectedTransferType.requiresPhone ? phoneNumber : null,
      bank: selectedTransferType.requiresBank ? selectedBank : null,
      timestamp: new Date().toISOString(),
    };
    
    if (onSelectOption) onSelectOption(transferData);
    onClose();
    // Reset form
    setPhoneNumber('');
    setAmount('');
    setSelectedBank(null);
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

  const getTransferIcon = () => {
    const type = selectedTransferType?.name;
    if (type?.includes('M-Pesa')) return 'phone-portrait-outline';
    if (type?.includes('Bank')) return 'business-outline';
    return 'swap-horizontal-outline';
  };

  const getTransferColor = () => {
    const type = selectedTransferType?.name;
    if (type?.includes('M-Pesa')) return '#00A859';
    if (type?.includes('Bank')) return '#1a5f1a';
    return '#2d8c2d';
  };

  return (
    <>
      {/* Main M-Transfer Sheet */}
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
                <Text style={styles.sheetTitle}>M-Transfer</Text>
                <Text style={styles.sheetSubtitle}>Fast & secure FOSA transfers</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close-outline" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Transfer Type Selection */}
            <Text style={styles.sectionLabel}>Transfer Type</Text>
            <View style={styles.transferTypesGrid}>
              {transferTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.transferTypeCard,
                    selectedTransferType?.id === type.id && styles.transferTypeCardActive,
                  ]}
                  onPress={() => setSelectedTransferType(type)}
                >
                  <View style={[styles.transferTypeIcon, { backgroundColor: `${type.color}10` }]}>
                    <Ionicons name={type.icon} size={24} color={type.color} />
                  </View>
                  <Text style={styles.transferTypeName}>{type.name}</Text>
                  <Text style={styles.transferTypeDesc}>{type.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.dividerLight} />

            {/* Account Selection */}
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
                <Text style={styles.accountBalanceHint}>
                  Balance: KES {selectedAccount?.balance}
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#B8E4B8" />
            </TouchableOpacity>

            <View style={styles.dividerLight} />

            {/* Phone Number (conditional) */}
            {selectedTransferType?.requiresPhone && (
              <>
                <View style={styles.inputRow}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="call-outline" size={20} color="#00A859" />
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
              </>
            )}

            {/* Bank Selection (conditional) */}
            {selectedTransferType?.requiresBank && (
              <>
                <TouchableOpacity 
                  style={styles.inputRow}
                  onPress={() => setShowBankSheet(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.inputIcon}>
                    <Ionicons name="business-outline" size={20} color="#1a5f1a" />
                  </View>
                  <View style={styles.inputContent}>
                    <Text style={styles.inputLabel}>Select Bank</Text>
                    {selectedBank ? (
                      <Text style={styles.inputValue}>{selectedBank.name}</Text>
                    ) : (
                      <Text style={styles.inputPlaceholder}>Choose bank</Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward-outline" size={20} color="#B8E4B8" />
                </TouchableOpacity>
                <View style={styles.dividerLight} />
              </>
            )}

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

            {/* Transfer Button */}
            <TouchableOpacity 
              style={[
                styles.transferButton,
                (!selectedTransferType || !selectedAccount || !amount) && styles.transferButtonDisabled
              ]}
              onPress={handleTransfer}
              disabled={!selectedTransferType || !selectedAccount || !amount}
            >
              <Ionicons name={getTransferIcon()} size={20} color="#fff" />
              <Text style={styles.transferButtonText}>
                {selectedTransferType?.name || 'Start Transfer'}
              </Text>
            </TouchableOpacity>

            {/* Info Note */}
            <View style={styles.infoNote}>
              <Ionicons name="information-circle-outline" size={14} color="#9CA3AF" />
              <Text style={styles.infoText}>
                Charges: KES 0-50 | Instant | 24/7 Support
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

      {/* Bank Selection Bottom Sheet */}
      <Modal
        visible={showBankSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBankSheet(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowBankSheet(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.bankSheet}>
          <View style={styles.handle} />
          
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Select Bank</Text>
            <TouchableOpacity 
              onPress={() => setShowBankSheet(false)} 
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {banks.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={[
                styles.bankItem,
                selectedBank?.id === bank.id && styles.bankItemActive,
              ]}
              onPress={() => {
                setSelectedBank(bank);
                setShowBankSheet(false);
              }}
            >
              <View style={[styles.bankIcon, { backgroundColor: `${bank.color}10` }]}>
                <Ionicons name={bank.icon} size={22} color={bank.color} />
              </View>
              <Text style={styles.bankName}>{bank.name}</Text>
              {selectedBank?.id === bank.id && (
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    marginLeft: 4,
  },
  transferTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  transferTypeCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  transferTypeCardActive: {
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
    borderColor: '#1a5f1a',
  },
  transferTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  transferTypeName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  transferTypeDesc: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
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
  transferButton: {
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
  transferButtonDisabled: {
    backgroundColor: 'rgba(26, 95, 26, 0.3)',
  },
  transferButtonText: {
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
  // Bank Sheet Styles
  bankSheet: {
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
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  bankItemActive: {
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  bankName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});