# 📡 Gyroscope Alert System (React Native + Expo Tabs)

This app uses your phone’s **gyroscope sensor** to detect motion and trigger alerts when the device rotates beyond a chosen threshold.  
It’s built on the **Expo Tabs Starter Template**, so the main logic lives inside  
`app/(tabs)/index.tsx` (the “Home” tab).

---

## 🚀 Features
- Real-time gyroscope readings (X, Y, Z axes)
- Visual display of sensor data
- Vibration + alert popup when motion exceeds threshold
- Works instantly on iPhone via **Expo Go**
- Keeps the default **Home / Explore** tab navigation

---

## 🧰 Tech Stack
- **React Native (Expo SDK)**
- **expo-sensors**
- **TypeScript / JavaScript (Expo Router structure)**

---

## 📦 Installation & Setup

### 1️⃣ Prerequisites
Make sure you have:
- Node.js (LTS) → `node -v`
- Expo CLI → `npm install -g expo-cli`
- Expo Go app on your iPhone
- Mac & iPhone on the same Wi-Fi network

---

### 2️⃣ Install Dependencies
From your project root:
```bash
npx expo install expo-sensors
```

---

### 3️⃣ Run the App
```
npx expo start
```

Then:
- Scan the QR code with Expo Go on your iPhone
- Go to the Home tab → you’ll see live X/Y/Z values
- Rotate your phone quickly → you’ll get a vibration and alert popup 🚨

---

## 🧠 How It Works

- The Expo Sensors API streams angular velocity (x, y, z in radians/sec).
- The app updates these values every 200 ms.
- If any axis exceeds the threshold, the phone vibrates and shows an alert.

## ⚙️ Customization

- Adjust sensitivity by changing the threshold value
- Modify update frequency in the gyroscope update interval
- Add charts or logs to visualize sensor data

## 🧩 Future Ideas

- Slider to adjust threshold live
- Graph for real-time motion data
- Combine with accelerometer for more advanced motion tracking

## 🧑‍💻 Author

Devarshi Mahajan
