import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function LoanOptionsSheet({ visible, onClose, onSelectOption }) {
  const options = [
    { icon: 'swap-horizontal-outline', label: 'Apply loan', desc: 'Apply for personal loan', value: 'apply_loan' },
    { icon: 'phone-portrait-outline', label: 'View all loans', desc: 'View all your existing loans', value: 'view_loans' },
    { icon: 'save-outline', label: 'Repay loan', desc: 'Pay the loan according to monthly schedule', value: 'repay_loan' },
    { icon: 'business-outline', label: 'Pay off loans', desc: 'Clear all existing loans', value: 'payoff_loans' },
    { icon: 'people-outline', label: 'Loan statement', desc: 'View statement for each loan account', value: 'loan_statement' },
    { icon: 'hand-left-outline', label: 'View guarantors', desc: 'See who guaranteed your loans', value: 'view_guarantors' },
    { icon: 'person-add-outline', label: 'Be a guarantor', desc: 'Offer to guarantee someone\'s loan', value: 'be_guarantor' },
    { icon: 'document-text-outline', label: 'Consent form', desc: 'Provide loan guarantee consent', value: 'consent_form' },
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
            <Text style={styles.sheetTitle}>Loans</Text>
            <Text style={styles.sheetSubtitle}>Manage all your loans</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
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
    maxHeight: '80%', // Prevents sheet from going off screen
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
});