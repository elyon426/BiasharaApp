import { Ionicons } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SharesManagementSheet({ visible, onClose, onSelectOption }) {
  const options = [
    {
      icon: 'eye-outline',
      label: 'View Shares Balance',
      desc: 'Check your current shares balance and value',
      value: 'view_balance',
      color: '#1a5f1a',
    },
    {
      icon: 'shield-outline',
      label: 'Use as Collateral',
      desc: 'Secure a loan using your shares',
      value: 'use_collateral',
      color: '#2d8c2d',
    },
    {
      icon: 'cash-outline',
      label: 'Withdraw Dividend',
      desc: 'Withdraw earned dividends to your account',
      value: 'withdraw_dividend',
      color: '#4caf4c',
    },
    {
      icon: 'add-circle-outline',
      label: 'Buy More Shares',
      desc: 'Purchase additional shares in the SACCO',
      value: 'buy_shares',
      color: '#1a5f1a',
    },
    {
      icon: 'repeat-outline',
      label: 'Transfer Shares',
      desc: 'Transfer shares to another member',
      value: 'transfer_shares',
      color: '#2d8c2d',
    },
    {
      icon: 'document-text-outline',
      label: 'Share Certificate',
      desc: 'Download your shareholding certificate',
      value: 'share_certificate',
      color: '#4caf4c',
    },
    {
      icon: 'trending-up-outline',
      label: 'Share Value History',
      desc: 'View share price trends and performance',
      value: 'share_history',
      color: '#1a5f1a',
    },
  ];

  const handleSelect = (value) => {
    if (onSelectOption) onSelectOption(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <View style={styles.sheet}>
        {/* Handle indicator */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>Shares Management</Text>
            <Text style={styles.sheetSubtitle}>Manage your SACCO shares</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Shares Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryLabel}>Total Shares</Text>
            <Text style={styles.summaryValue}>1,250</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRight}>
            <Text style={styles.summaryLabel}>Current Value</Text>
            <Text style={styles.summaryValue}>KES 125,000</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Options */}
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => handleSelect(item.value)}
          >
            <View style={styles.optionIcon}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#B8E4B8" />
          </TouchableOpacity>
        ))}

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
          <Text style={styles.infoText}>
            Share price: KES 100 per share | Minimum holding: 100 shares
          </Text>
        </View>
      </View>
    </Modal>
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
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 10,
    maxHeight: '85%',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  sheetSubtitle: {
    fontSize: 12,
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
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 95, 26, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 26, 0.12)',
  },
  summaryLeft: {
    flex: 1,
    alignItems: 'center',
  },
  summaryRight: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(26, 95, 26, 0.15)',
    marginHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a5f1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F9FAFB',
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 95, 26, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  optionDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  infoText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
