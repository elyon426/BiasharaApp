// app/(tabs)/_layout.jsx
// app/(tabs)/_layout.jsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;
const BAR_HEIGHT = 62;
const FLOAT_SIZE = 52;
const CENTER_INDEX = 2;
const NOTCH_RADIUS = FLOAT_SIZE / 2 + 6;

function CurvedBackground({ totalHeight }) {
  const cx = TAB_WIDTH * CENTER_INDEX + TAB_WIDTH / 2;
  const R = NOTCH_RADIUS;
  const left = cx - R;
  const right = cx + R;

  const path = [
    `M0,0`,
    `L${left},0`,
    `A${R},${R} 0 0,1 ${cx},${R}`,
    `A${R},${R} 0 0,1 ${right},0`,
    `L${width},0`,
    `L${width},${totalHeight}`,
    `L0,${totalHeight}`,
    `Z`,
  ].join(' ');

  return (
    <Svg width={width} height={totalHeight} style={StyleSheet.absoluteFill}>
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
  const insets = useSafeAreaInsets();

  // ✅ Only use bottom inset — accounts for Android nav bar
  const bottomInset = insets.bottom;
  const totalBarHeight = BAR_HEIGHT + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0da134',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: totalBarHeight,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => <CurvedBackground totalHeight={totalBarHeight} />,
        tabBarItemStyle: {
          height: BAR_HEIGHT,      // ✅ icons only use BAR_HEIGHT, not the inset area
          paddingBottom: Platform.OS === 'android' ? 6 : 4,
          paddingTop: 6,
        },
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
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
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  floatOuter: {
    width: TAB_WIDTH,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',  // ✅ no top: -28 hack
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
    marginTop: -(FLOAT_SIZE / 2 + 4),  // ✅ rises above bar cleanly
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