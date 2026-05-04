import { Ionicons } from '@expo/vector-icons';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Personal Information', desc: 'Update your personal details' },
      { icon: 'card-outline', label: 'My Cards', desc: 'Manage your virtual cards' },
      { icon: 'wallet-outline', label: 'Account Details', desc: 'View account & IBAN number' },
      { icon: 'shield-checkmark-outline', label: 'KYC Verification', desc: 'Verify your identity' },
    ],
  },
  {
    title: 'Security',
    items: [
      { icon: 'lock-closed-outline', label: 'Change PIN', desc: 'Update your transaction PIN' },
      { icon: 'finger-print-outline', label: 'Biometrics', desc: 'Manage Touch ID / Face ID' },
      { icon: 'eye-off-outline', label: 'Change Password', desc: 'Update your login password' },
      { icon: 'alert-circle-outline', label: 'Two Factor Auth', desc: 'Add an extra layer of security' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline', label: 'Notifications', desc: 'Manage alerts and push notifications' },
      { icon: 'language-outline', label: 'Language', desc: 'Change app language' },
      { icon: 'color-palette-outline', label: 'Appearance', desc: 'Light or dark mode' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'chatbubble-ellipses-outline', label: 'Help & Support', desc: 'Chat with our support team' },
      { icon: 'document-text-outline', label: 'Terms & Conditions', desc: 'Read our terms of service' },
      { icon: 'information-circle-outline', label: 'About', desc: 'App version and info' },
    ],
  },
];

export default function ProfileSettings() {
  const handleBackPress = () => {
    console.log('Back button pressed - navigation will be added later');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
        >
          <Ionicons name="chevron-back" size={24} color="#1a5f1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>EM</Text>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Elyon Maina Gichohi</Text>
            <View style={styles.profileRow}>
              <Ionicons name="mail-outline" size={13} color="#1a5f1a" />
              <Text style={styles.profileInfo}>elyon.maina@gmail.com</Text>
            </View>
            <View style={styles.profileRow}>
              <Ionicons name="call-outline" size={13} color="#1a5f1a" />
              <Text style={styles.profileInfo}>+254 712 345 678</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={16} color="#1a5f1a" />
          </TouchableOpacity>
        </View>

        {/* Settings sections */}
        {SETTINGS_SECTIONS.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[
                    styles.settingItem,
                    iIndex < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                  onPress={() => console.log(`Navigate to: ${item.label}`)}
                >
                  <View style={styles.settingIcon}>
                    <Ionicons name={item.icon} size={20} color="#1a5f1a" />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingDesc}>{item.desc}</Text>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={18} color="#B8E4B8" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => console.log('Logout pressed')}
        >
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>M-Tower v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 20,
  },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 95, 26, 0.08)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 26, 0.15)',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1a5f1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2d8c2d',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  profileDetails: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profileInfo: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  editBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 26, 0.15)',
  },

  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: 'rgba(26, 95, 26, 0.06)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(26, 95, 26, 0.12)',
  },

  // Setting item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    backgroundColor: 'rgba(26, 95, 26, 0.04)',
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26, 95, 26, 0.10)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(26, 95, 26, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  settingDesc: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.15)',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#dc2626',
  },

  // Version
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 8,
  },
});