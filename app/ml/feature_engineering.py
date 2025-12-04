import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, List

class FeatureEngineer:
    """Extracts behavioral features for fraud detection"""
    
    def __init__(self, user_history_df: pd.DataFrame = None):
        self.user_history = user_history_df if user_history_df is not None else pd.DataFrame()
    
    def create_features(self, transaction: dict) -> pd.DataFrame:
        """Generates 15+ features from a transaction"""
        
        features = {}
        
        # 1. AMOUNT FEATURES
        mean_amount = self.user_history['amount'].mean() if len(self.user_history) > 0 else 5000
        std_amount = self.user_history['amount'].std() if len(self.user_history) > 0 else 3000
        
        features['amount_zscore'] = (transaction.get('amount', 5000) - mean_amount) / (std_amount + 1e-8)
        features['amount_ratio_to_avg'] = transaction.get('amount', 5000) / (mean_amount + 1)
        features['is_unusual_amount'] = 1 if transaction.get('amount', 0) > (mean_amount + 3 * std_amount) else 0
        
        # 2. TIME FEATURES
        features['hour_of_day'] = datetime.now().hour
        features['day_of_week'] = datetime.now().weekday()
        features['is_night_transaction'] = 1 if (datetime.now().hour > 22 or datetime.now().hour < 6) else 0
        
        # 3. LOCATION FEATURES
        features['location_distance_km'] = transaction.get('location_distance', 10)
        features['is_unusual_location'] = 1 if transaction.get('location_distance', 0) > 500 else 0
        
        # 4. FREQUENCY FEATURES
        features['transactions_today'] = transaction.get('transactions_today', 1)
        features['is_velocity_attack'] = 1 if transaction.get('transactions_today', 0) > 10 else 0
        
        # 5. DEVICE FEATURES
        features['is_new_device'] = 1 if transaction.get('is_new_device', False) else 0
        
        # 6. MERCHANT FEATURES
        merchant_category = transaction.get('merchant_category', '').upper()
        features['is_high_risk_merchant_category'] = 1 if merchant_category in ['CRYPTO', 'MONEY_TRANSFER', 'GAMBLING'] else 0
        features['merchant_seen_before'] = 1 if len(self.user_history) > 0 else 0
        
        # 7. CONTEXTUAL FEATURES
        features['has_vacation_pattern'] = 0
        features['is_weekend'] = 1 if datetime.now().weekday() >= 5 else 0
        
        return pd.DataFrame([features])

FEATURE_COLUMNS = [
    'amount_zscore', 'amount_ratio_to_avg', 'is_unusual_amount',
    'hour_of_day', 'day_of_week', 'is_night_transaction',
    'location_distance_km', 'is_unusual_location',
    'transactions_today', 'is_velocity_attack',
    'is_new_device', 'is_high_risk_merchant_category',
    'merchant_seen_before', 'has_vacation_pattern', 'is_weekend'
]
