// app/(tabs)/_layout.jsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

function CurvedBackground() {
  const height = 50;
  const notchWidth = 50;
  const notchDepth = 26;
  const centerX = width / 2;
  const r = 14;

  const path = `
    M0,0
    L${centerX - notchWidth / 2 - r},0
    Q${centerX - notchWidth / 2},0 ${centerX - notchWidth / 2},${r}
    C${centerX - notchWidth / 2 + 4},${notchDepth - 3} 
      ${centerX - notchWidth / 4},${notchDepth} 
      ${centerX},${notchDepth}
    C${centerX + notchWidth / 4},${notchDepth} 
      ${centerX + notchWidth / 2 - 4},${notchDepth - 3} 
      ${centerX + notchWidth / 2},${r}
    Q${centerX + notchWidth / 2},0 ${centerX + notchWidth / 2 + r},0
    L${width},0
    L${width},${height}
    L0,${height}
    Z
  `;

  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Path d={path} fill="#ffffff" />
    </Svg>
  );
}

function FloatingHomeButton({ onPress, focused }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.homeTabButton}
    >
      <View style={[
        styles.hollowCircle,
        focused && styles.hollowCircleActive,
      ]}>
        <MaterialCommunityIcons
          name={focused ? 'home-city' : 'home-city-outline'}
          size={24}
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

      {/* Accounts — left */}
      <Tabs.Screen
        name="Accounts"
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

      {/* Home — center floating */}
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

      {/* Settings — right */}
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
    height: 50,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    height: 50,
    paddingBottom: 3,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
  },
  homeTabButton: {
    width: TAB_WIDTH,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 999,
  },

  // kept exactly as your working version
  hollowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#0da134',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? -28 : -22,
    marginLeft: Platform.OS === 'android' ? 274 : 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  hollowCircleActive: {
    borderColor: '#0da134',
    borderWidth: 3.5,
  },
});