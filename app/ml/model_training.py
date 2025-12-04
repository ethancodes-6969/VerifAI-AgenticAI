import pandas as pd
import xgboost as xgb
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FraudDetectionModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
    
    def train(self, training_data_path: str):
        """Train XGBoost model on fraud dataset"""
        
        logger.info("Loading training data...")
        
        if not os.path.exists(training_data_path):
            logger.info("Generating synthetic training data...")
            self._generate_sample_data(training_data_path)
        
        df = pd.read_csv(training_data_path)
        
        feature_cols = [col for col in df.columns if col != 'is_fraud']
        X = df[feature_cols].fillna(0)
        y = df['is_fraud']
        
        logger.info(f"Training on {len(df)} samples, {len(feature_cols)} features")
        
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42, stratify=y
        )
        
        logger.info("Training XGBoost model...")
        
        self.model = xgb.XGBClassifier(
            n_estimators=100,
            max_depth=8,
            learning_rate=0.1,
            random_state=42,
            scale_pos_weight=19
        )
        
        self.model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=10)
        
        y_pred = self.model.predict(X_test)
        logger.info("\n=== Model Performance ===")
        logger.info(classification_report(y_test, y_pred))
        
        self.feature_names = feature_cols
        
        return self.model
    
    def _generate_sample_data(self, output_path: str):
        """Generate synthetic training data"""
        
        np.random.seed(42)
        n_samples = 10000
        
        data = []
        for i in range(n_samples):
            is_fraud = np.random.choice([0, 1], p=[0.95, 0.05])
            
            if is_fraud:
                amount_zscore = np.random.normal(2.5, 1.0)
                location_distance = np.random.uniform(1000, 5000)
                is_new_device = 1
                transactions_today = np.random.randint(10, 30)
                is_night = 1
            else:
                amount_zscore = np.random.normal(0.3, 0.5)
                location_distance = np.random.uniform(0, 50)
                is_new_device = np.random.choice([0, 1], p=[0.9, 0.1])
                transactions_today = np.random.randint(1, 5)
                is_night = 0
            
            data.append({
                'amount_zscore': amount_zscore,
                'amount_ratio_to_avg': abs(amount_zscore) * 2 + 1,
                'is_unusual_amount': 1 if abs(amount_zscore) > 2 else 0,
                'hour_of_day': np.random.randint(0, 24),
                'day_of_week': np.random.randint(0, 7),
                'is_night_transaction': is_night,
                'location_distance_km': location_distance,
                'is_unusual_location': 1 if location_distance > 500 else 0,
                'transactions_today': transactions_today,
                'is_velocity_attack': 1 if transactions_today > 10 else 0,
                'is_new_device': is_new_device,
                'is_high_risk_merchant_category': np.random.choice([0, 1]),
                'merchant_seen_before': np.random.choice([0, 1], p=[0.7, 0.3]),
                'has_vacation_pattern': 0,
                'is_weekend': np.random.choice([0, 1]),
                'is_fraud': is_fraud
            })
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        df = pd.DataFrame(data)
        df.to_csv(output_path, index=False)
        logger.info(f"✅ Generated {len(df)} training samples")
    
    def predict_fraud_probability(self, features_df: pd.DataFrame) -> float:
        """Returns fraud probability (0-1)"""
        X_scaled = self.scaler.transform(features_df)
        fraud_prob = self.model.predict_proba(X_scaled)[0][1]
        return fraud_prob
    
    def save_model(self, model_path: str, scaler_path: str):
        """Save model and scaler"""
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        logger.info(f"✅ Model saved to {model_path}")
    
    def load_model(self, model_path: str, scaler_path: str):
        """Load model and scaler"""
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
        logger.info(f"✅ Model loaded from {model_path}")

if __name__ == "__main__":
    model = FraudDetectionModel()
    model.train('data/training_data.csv')
    model.save_model('app/ml/models/xgboost_fraud_model.pkl', 'app/ml/models/scaler.pkl')
