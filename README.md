# AquaSentinel – A Low-Cost AI-Based Distress Detection System for Small Watercraft

Developed by **Team Tarani** (Department of Computer Science & Engineering, R V College of Engineering, Bengaluru) for the **SAMA Social Build for Good Hackathon**.

> **"Every fisherman deserves access to intelligent safety technology, not just those who can afford expensive maritime systems."**

---

## 🌊 Project Overview
AquaSentinel is a social-impact maritime safety innovation designed specifically for low-income fishermen, local water transport communities, and small boat operators. 

Traditional maritime safety equipment (such as AIS, EPIRBs, and high-end sonar/radar systems) costs between ₹10,000 and ₹50,000+, making it economically unviable for small craft owners. AquaSentinel bridges this gap by offering a fully automated, motion-analysis-driven distress detection system built using low-cost hardware (approximately ₹500–₹1000) and powered by unsupervised Machine Learning.

---

## 🛠️ How It Works (Workflow Pipeline)

1. **Motion Acquisition**: An ultra-affordable **MPU6050** Inertial Measurement Unit (IMU) continuously records 3-axis accelerometer and gyroscope data reflecting the boat's roll, pitch, and yaw.
2. **Signal Coordination**: An **Arduino Uno** collects, filters, and formats the raw inertial sensor data.
3. **Feature Extraction**: Roll/pitch parameters and mathematical metrics are computed over sliding window intervals.
4. **Anomaly Scoring**: A real-time **Isolation Forest Machine Learning model** profiles the hull dynamics, scoring incoming coordinates to distinguish standard high waves from abnormal movements.
5. **Decision Logic (False Alarm Filter)**: The alarm triggers only after identifying **3 consecutive anomalous states**, ensuring normal water turbulence doesn't set off false alerts.
6. **Distress Alert**: Automatically sounds an onboard warning and alerts local rescue entities.

---

## ⚙️ Technology Stack

### Hardware Components
* **Arduino Uno**: Central processing micro-terminal.
* **MPU6050 Sensor**: Accelerometer + Gyroscope IMU.

### Software & AI Stack
* **Python**: Core scripting language for serial communications, window operations, and alert logic.
* **Scikit-learn**: Houses the unsupervised Isolation Forest anomaly detection algorithm.
* **Pandas**: Manages real-time data parsing and structured array manipulation.
* **PySerial**: Integrates serial links between the Arduino and PC terminals.

---

## 📂 Repository Structure

```text
aquasentinel/
├── assets/
│   ├── hardware_prototype.jpg        # Floating physical prototype validation
│   ├── real_time_detection_output.jpg # Isolation Forest model console warnings
│   ├── system_architecture.png       # Machine Learning signal routing block diagram
│   └── hero_boat_sunrise.png         # Main landing page visual illustration
├── index.html                        # Main page markup
├── style.css                         # CSS Variables, Animations, Grid layouts
├── script.js                         # Sticky navigation, cost calculators, simulator widget
└── README.md                         # Project documentation (this file)
```

---

## 🚀 Running the Web Landing Page Locally

You can run a quick local HTTP server in this directory to preview the responsive landing page:

1. Open a terminal inside the project directory:
   ```bash
   cd "C:\Users\ds\.gemini\antigravity\scratch\aquasentinel"
   ```
2. Start a Python HTTP server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   [http://localhost:8000/](http://localhost:8000/)

---

## 🔮 Future Roadmap

* **ESP32 Deployment**: Transitioning raw Python scripts directly to standalone, low-power microchips (ESP32) for off-grid operations.
* **GPS Tracking**: Integrating NEO-6M modules to log latitude/longitude variables during emergencies.
* **GSM Alert Routing**: Wiring SIM800L modules to instantly route automated SOS location coordinate texts directly to emergency operators and family.
* **Mesh Network Search & Rescue**: Utilizing LoRa transceivers to enable fleet-to-fleet collaborative mesh networks in areas without cellular coverage.
* **Solar Integration**: Equipping boat casings with small solar-powered panels for self-sustaining power loops.
