// app/(tabs)/_layout.jsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;
const BAR_HEIGHT = 62;
const NOTCH_DEPTH = 28;
const NOTCH_WIDTH = 56;
const FLOAT_SIZE = 52;
const CENTER_INDEX = 2; // 0-based, index tab is slot 2

function CurvedBackground() {
  const cx = TAB_WIDTH * CENTER_INDEX + TAB_WIDTH / 2; // dynamic center
  const r = 12;
  const nw = NOTCH_WIDTH;
  const nd = NOTCH_DEPTH;

  const path = `
    M0,0
    L${cx - nw / 2 - r},0
    Q${cx - nw / 2},0 ${cx - nw / 2},${r}
    C${cx - nw / 2 + 5},${nd - 2} ${cx - nw / 4},${nd} ${cx},${nd}
    C${cx + nw / 4},${nd} ${cx + nw / 2 - 5},${nd - 2} ${cx + nw / 2},${r}
    Q${cx + nw / 2},0 ${cx + nw / 2 + r},0
    L${width},0
    L${width},${BAR_HEIGHT}
    L0,${BAR_HEIGHT}
    Z
  `;

  return (
    <Svg width={width} height={BAR_HEIGHT} style={StyleSheet.absoluteFill}>
      <Path d={path} fill="#ffffff" />
    </Svg>
  );
}

function FloatingHomeButton({ onPress, focused }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.floatOuter}
    >
      <View style={[styles.floatCircle, focused && styles.floatCircleActive]}>
        <MaterialCommunityIcons
          name={focused ? 'home-city' : 'home-city-outline'}
          size={26}
          color="#0da134"
        />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0da134',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <CurvedBackground />,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {/* slot 0 — loansNaccounts  ← exact filename */}
      <Tabs.Screen
        name="loansNaccounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={22}
              color={focused ? '#0da134' : '#9CA3AF'}
            />
          ),
        }}
      />

      {/* slot 1 — statistics */}
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              size={22}
              color={focused ? '#0da134' : '#9CA3AF'}
            />
          ),
        }}
      />

      {/* slot 2 — index (floating center) */}
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarButton: (props) => (
            <FloatingHomeButton
              onPress={props.onPress}
              focused={props.accessibilityState?.selected}
            />
          ),
        }}
      />

      {/* slot 3 — scan */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'qrcode-scan' : 'qrcode'}
              size={22}
              color={focused ? '#0da134' : '#9CA3AF'}
            />
          ),
        }}
      />

      {/* slot 4 — settings → shown as Profile */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={focused ? '#0da134' : '#9CA3AF'}
            />
          ),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT + (Platform.OS === 'ios' ? 16 : 0),
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    height: BAR_HEIGHT,
    paddingBottom: Platform.OS === 'android' ? 6 : 4,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  floatOuter: {
    width: TAB_WIDTH,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  floatCircle: {
    width: FLOAT_SIZE,
    height: FLOAT_SIZE,
    borderRadius: FLOAT_SIZE / 2,
    backgroundColor: '#ffffff',
    borderWidth: 2.5,
    borderColor: '#0da134',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -(FLOAT_SIZE / 2 + 4),
    elevation: 6,
    shadowColor: '#0da134',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  floatCircleActive: {
    backgroundColor: '#f0fff4',
    borderWidth: 3,
  },
});