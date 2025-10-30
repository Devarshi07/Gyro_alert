import { Gyroscope } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, Vibration, View } from 'react-native';


export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const THRESHOLD = 3.0; // radians per second

  useEffect(() => {
    const ws = new WebSocket('ws://10.0.0.131:8080');
    ws.onopen = () => console.log('✅ connected to laptop');
    ws.onerror = (e) => console.log('❌ websocket error:', e.message);

    Gyroscope.setUpdateInterval(200); // update every 200ms
    const sub = Gyroscope.addListener((gyroData) => {
      setData(gyroData);
      const { x, y, z } = gyroData;

      // Check threshold and trigger alert
      if (Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD || Math.abs(z) > THRESHOLD) {
        Vibration.vibrate(200);
        Alert.alert('⚠️ Motion Alert', 'Rotation exceeded threshold!');
        if (ws.readyState === WebSocket.OPEN) {
          console.log('📤 sending ALERT to laptop');
          ws.send('ALERT');
        } else {
          console.log('⚠️ WebSocket not open:', ws.readyState);
        }
        // Alert.alert('⚠️ Motion Alert', 'Rotation exceeded threshold!');
      }
    });

    setSubscription(sub);
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 Gyroscope Alert System</Text>
      <View style={styles.box}>
        <Text style={styles.label}>X: <Text style={styles.value}>{data.x.toFixed(2)}</Text></Text>
        <Text style={styles.label}>Y: <Text style={styles.value}>{data.y.toFixed(2)}</Text></Text>
        <Text style={styles.label}>Z: <Text style={styles.value}>{data.z.toFixed(2)}</Text></Text>
      </View>
      <Text style={styles.threshold}>Threshold: {THRESHOLD.toFixed(1)} rad/s</Text>
      <Text style={styles.tip}>Rotate your iPhone quickly to test it!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1115', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#00e0ff', fontSize: 24, fontWeight: '700', marginBottom: 30 },
  box: { borderColor: '#00e0ff', borderWidth: 2, borderRadius: 10, padding: 20, width: 250 },
  label: { color: 'white', fontSize: 20, marginVertical: 5 },
  value: { color: '#00ff99', fontWeight: '600' },
  threshold: { color: '#ccc', marginTop: 20, fontSize: 16 },
  tip: { color: '#7dd3fc', marginTop: 10, fontSize: 16 },
});
