import { Image, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./download.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});