#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns


# In[2]:


class AccountActivityMonitor:
    def __init__(self, contamination=0.5,n_estimators=1000):
        self.model = IsolationForest(contamination=contamination, random_state=42,n_estimators=n_estimators)
        
        numeric_features = ['hour', 'day_of_week', 'duration']
        categorical_features = ['action_type', 'device_type', 'platform', 'location']
        
        numeric_transformer = StandardScaler()
        categorical_transformer = OneHotEncoder(handle_unknown='ignore')
        
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('cat', categorical_transformer, categorical_features)
            ])
        
        self.pipeline = Pipeline([
            ('preprocessor', self.preprocessor),
            ('classifier', self.model)
        ])
    
    def preprocess_data(self, data):
        data['hour'] = data['timestamp'].dt.hour
        return data
    
    def train(self, data):
        preprocessed_data = self.preprocess_data(data)
        self.pipeline.fit(preprocessed_data.drop(['user_id', 'timestamp', 'is_anomaly'], axis=1))
    
    def detect_anomalies(self, new_data):
        preprocessed_data = self.preprocess_data(new_data)
        predictions = self.pipeline.predict(preprocessed_data.drop(['user_id', 'timestamp', 'is_anomaly'], axis=1))
        return predictions
    def get_feature_importance(self, data):
        preprocessed_data = self.preprocess_data(data)
        X = preprocessed_data.drop(['user_id', 'timestamp', 'is_anomaly'], axis=1)
        X_transformed = self.pipeline.named_steps['preprocessor'].transform(X)
        
        # Get the anomaly scores
        anomaly_scores = self.pipeline.decision_function(X)
        
        # Calculate feature importance
        feature_importance = np.zeros(X_transformed.shape[1])
        for i in range(X_transformed.shape[1]):
            X_temp = X_transformed.copy()
            X_temp[:, i] = 0  # Set feature i to 0
            scores_temp = self.pipeline.named_steps['classifier'].decision_function(X_temp)
            feature_importance[i] = np.mean(np.abs(anomaly_scores - scores_temp))
        
        # Normalize feature importance
        feature_importance = feature_importance / np.sum(feature_importance)
        
        # Get feature names
        feature_names = (self.pipeline.named_steps['preprocessor']
                         .named_transformers_['cat']
                         .get_feature_names_out(self.categorical_features).tolist() + 
                         self.numeric_features)
        
        return pd.DataFrame({'feature': feature_names, 'importance': feature_importance})


# In[3]:


def load_and_prepare_data(file_path):
    data = pd.read_csv(file_path)
    data['timestamp'] = pd.to_datetime(data['timestamp'])
    
    # Extract hour and day of week from timestamp
    data['hour'] = data['timestamp'].dt.hour
    data['day_of_week'] = data['timestamp'].dt.dayofweek
    
    # Simulate "true" anomalies based on certain conditions
    data['is_anomaly'] = (
        ((data['hour'] >= 1) & (data['hour'] <= 4)) |  # Unusual hours
        (data['duration'] > 120) |  # Unusually long duration
        ((data['day_of_week'] == 6) & (data['action_type'] == 'login')) |  # Sunday logins
        (data['location'] == 'Unknown')  # Unknown location
    ).astype(int)
    
    return data


# In[4]:


data = load_and_prepare_data('data.csv')

# Split the data
train_data = data[data['timestamp'] < '2024-09-15']
test_data = data[data['timestamp'] >= '2024-09-15']

# Initialize and train the model
monitor = AccountActivityMonitor()
monitor.train(train_data)


# In[5]:


predictions = monitor.detect_anomalies(test_data)

# Convert predictions to binary (0: normal, 1: anomaly)
predictions_binary = (predictions == -1).astype(int)

# Calculate metrics
conf_matrix = confusion_matrix(test_data['is_anomaly'], predictions_binary)
class_report = classification_report(test_data['is_anomaly'], predictions_binary)


# In[6]:


print("Confusion Matrix:")
print(conf_matrix)
print("\nClassification Report:")
print(class_report)


# In[7]:


plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.show()


# In[8]:


# Analyze anomalies by hour and day of week
anomalies = test_data[predictions_binary == 1]

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.countplot(x='hour', data=anomalies)
plt.title('Anomalies by Hour')
plt.subplot(1, 2, 2)
sns.countplot(x='day_of_week', data=anomalies)
plt.title('Anomalies by Day of Week')
plt.tight_layout()
plt.show()



# In[9]:


# Print some example anomalies
print("\nExample Anomalies:")
print(anomalies.sample(5))

