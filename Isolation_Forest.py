import pandas as pd
from sklearn.ensemble import IsolationForest

# Load dataset
data = pd.read_csv("boat_data.csv")

# Features
X = data[['Ax','Ay','Az','Gx','Gy','Gz',
          'Pitch','Roll','AccelMag','GyroMag']]

# Train model
model = IsolationForest(
    n_estimators=100,
    contamination=0.05,
    random_state=42
)

model.fit(X)

# Save model
import joblib
joblib.dump(model, "boat_model.pkl")

predictions = model.predict(X)

normal_count = sum(predictions == 1)
anomaly_count = sum(predictions == -1)

print("Normal samples:", normal_count)
print("Anomalies detected:", anomaly_count)