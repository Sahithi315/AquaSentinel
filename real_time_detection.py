import serial
import pandas as pd
import math
import time
import joblib

# =========================
# SETTINGS
# =========================
COM_PORT = 'COM3'
BAUD_RATE = 9600

DANGER_THRESHOLD = 3      # consecutive anomalies required
ALERT_COOLDOWN = 5        # seconds between alerts

# =========================
# LOAD MODEL
# =========================
model = joblib.load("boat_model.pkl")

# =========================
# CONNECT TO ARDUINO
# =========================
arduino = serial.Serial(COM_PORT, BAUD_RATE)
time.sleep(2)

anomaly_count = 0
last_alert_time = 0

print("=" * 40)
print(" REAL-TIME BOAT DISTRESS DETECTION ")
print("=" * 40)

while True:

    try:
        line = arduino.readline().decode().strip()

        ax, ay, az, gx, gy, gz = map(int, line.split(','))

        # -------------------------
        # Feature Calculation
        # -------------------------

        pitch = math.degrees(
            math.atan2(
                ay,
                math.sqrt(ax**2 + az**2)
            )
        )

        roll = math.degrees(
            math.atan2(-ax, az)
        )

        accel_mag = math.sqrt(
            ax**2 + ay**2 + az**2
        )

        gyro_mag = math.sqrt(
            gx**2 + gy**2 + gz**2
        )

        # -------------------------
        # Create Sample
        # -------------------------

        sample = pd.DataFrame([[
            ax, ay, az,
            gx, gy, gz,
            pitch, roll,
            accel_mag, gyro_mag
        ]], columns=[
            'Ax', 'Ay', 'Az',
            'Gx', 'Gy', 'Gz',
            'Pitch', 'Roll',
            'AccelMag', 'GyroMag'
        ])

        # -------------------------
        # Prediction
        # -------------------------

        prediction = model.predict(sample)

        if prediction[0] == -1:

            anomaly_count += 1

            print(
                f"ANOMALY ({anomaly_count}/{DANGER_THRESHOLD})"
            )

        else:

            anomaly_count = 0

            print("NORMAL")

        # -------------------------
        # Alert Logic
        # -------------------------

        current_time = time.time()

        if (
            anomaly_count >= DANGER_THRESHOLD
            and current_time - last_alert_time > ALERT_COOLDOWN
        ):

            print("\n")
            print("########################################")
            print("#      DANGER DETECTED !!!            #")
            print("########################################")
            print("\n")

            last_alert_time = current_time

            anomaly_count = 0

    except KeyboardInterrupt:

        print("\nMonitoring stopped.")
        arduino.close()
        break

    except Exception as e:

        print("Error:", e)