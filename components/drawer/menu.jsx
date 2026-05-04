import { Ionicons } from '@expo/vector-icons';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.78;

export default function ProfileDrawer({ visible, onClose }) {
  const menuItems = [
    { icon: 'person-outline', label: 'My Profile' },
    { icon: 'wallet-outline', label: 'My Accounts' },
    { icon: 'card-outline', label: 'My Cards' },
    { icon: 'settings-outline', label: 'Settings' },
    { icon: 'shield-checkmark-outline', label: 'Security' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Full screen dark overlay — tap anywhere outside drawer to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Stop tap from closing when inside drawer */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.drawer}>
              {/* Close X button */}
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>

              {/* User info */}
              <View style={styles.drawerTop}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>EM</Text>
                </View>
                <Text style={styles.userName}>Elyon Mwangi</Text>
                <Text style={styles.userEmail}>elyon@sacco.coop</Text>
                <View style={styles.badgeWrapper}>
                  <Text style={styles.memberBadge}>🏦 SACCO Member</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Menu items */}
              <View style={styles.menuList}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={onClose}
                  >
                    <View style={styles.menuIconWrapper}>
                      <Ionicons name={item.icon} size={20} color="#2d8c2d" />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Ionicons name="chevron-forward-outline" size={16} color="#B8E4B8" />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.divider} />

              {/* Logout */}
              <TouchableOpacity style={styles.logoutItem} onPress={onClose}>
                <View style={[styles.menuIconWrapper, styles.logoutIconWrapper]}>
                  <Ionicons name="log-out-outline" size={20} color="#dc2626" />
                </View>
                <Text style={styles.logoutLabel}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 48,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerTop: {
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1a5f1a', // Lime green for avatar
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#90EE90', // Light green border
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  userEmail: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },
  badgeWrapper: {
    marginTop: 10,
  },
  memberBadge: {
    fontSize: 11,
    color: '#2d8c2d',
    fontWeight: '600',
    backgroundColor: 'rgba(50, 205, 50, 0.15)', // Lime green with opacity 15%
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  menuList: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(50, 205, 50, 0.08)', // Lime green with 8% opacity
    marginBottom: 8,
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: 'rgba(50, 205, 50, 0.12)', // Lime green with 12% opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(220, 38, 38, 0.08)', // Red with opacity
    marginTop: 4,
  },
  logoutIconWrapper: {
    backgroundColor: 'rgba(220, 38, 38, 0.12)', // Red with opacity
  },
  logoutLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 14,
  },
});