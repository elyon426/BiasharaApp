import { Ionicons } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SummaryCardOptionsSheet({ visible, onClose, onSelectOption }) {
  const options = [
    {
      icon: 'eye-off-outline',
      label: 'Hide Balance',
      desc: 'Mask your total balance',
      value: 'hide_balance',
    },
    {
      icon: 'refresh-outline',
      label: 'Refresh Balance',
      desc: 'Sync latest balance from server',
      value: 'refresh_balance',
    },
    {
      icon: 'bar-chart-outline',
      label: 'View Analytics',
      desc: 'See income and spend charts',
      value: 'view_analytics',
    },
    {
      icon: 'document-text-outline',
      label: 'View Statements',
      desc: 'See full transaction history',
      value: 'view_statements',
    },
    {
      icon: 'notifications-outline',
      label: 'Balance Alerts',
      desc: 'Set balance threshold notifications',
      value: 'balance_alerts',
    },
    {
      icon: 'lock-closed-outline',
      label: 'Freeze Account',
      desc: 'Temporarily freeze all transactions',
      value: 'freeze_account',
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>Balance Options</Text>
            <Text style={styles.sheetSubtitle}>Manage your total balance view</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => handleSelect(item.value)}
          >
            <View style={styles.optionIcon}>
              <Ionicons name={item.icon} size={22} color="#1a5f1a" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#B8E4B8" />
          </TouchableOpacity>
        ))}
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
    maxHeight: '70%', // Increased to accommodate more options
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
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
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
    backgroundColor: 'rgba(26, 95, 26, 0.10)', // Forest green 10% opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionTextContainer: { 
    flex: 1 
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
});