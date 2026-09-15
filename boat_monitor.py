import serial
import pandas as pd
import math
import time
import os

# Change COM port if needed
arduino = serial.Serial('COM4', 9600)

time.sleep(2)

filename = "boat_data.csv"

columns = [
    'Ax', 'Ay', 'Az',
    'Gx', 'Gy', 'Gz',
    'Pitch', 'Roll',
    'AccelMag', 'GyroMag'
]

# Create CSV if it doesn't exist
if not os.path.exists(filename):
    pd.DataFrame(columns=columns).to_csv(filename, index=False)

print("Recording started...")
print("Press Ctrl + C to stop.\n")

try:
    while True:

        line = arduino.readline().decode().strip()

        try:
            ax, ay, az, gx, gy, gz = map(int, line.split(','))

            # Calculate features
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

            row = [
                ax, ay, az,
                gx, gy, gz,
                pitch, roll,
                accel_mag,
                gyro_mag
            ]

            df = pd.DataFrame([row], columns=columns)

            df.to_csv(
                filename,
                mode='a',
                header=False,
                index=False
            )

            print(
                f"Saved: "
                f"Ax={ax} Ay={ay} Az={az}"
            )

        except:
            pass

except KeyboardInterrupt:
    print("\nRecording stopped.")
    arduino.close()