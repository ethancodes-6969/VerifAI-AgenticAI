from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # App
    APP_NAME: str = "VerifAI"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://verifai_user:secure_password@localhost:5432/verifai_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # WhatsApp Business API
    WHATSAPP_BUSINESS_ACCOUNT_ID: str = "your_business_account_id"
    WHATSAPP_PHONE_NUMBER_ID: str = "your_phone_number_id"
    WHATSAPP_API_TOKEN: str = "your_access_token"
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: str = "verifai_webhook_token"
    
    # Fraud Detection Thresholds
    FRAUD_HIGH_RISK_THRESHOLD: float = 0.80
    FRAUD_MEDIUM_RISK_THRESHOLD: float = 0.50
    
    # ML Model Path
    ML_MODEL_PATH: str = "app/ml/models/xgboost_fraud_model.pkl"
    SCALER_PATH: str = "app/ml/models/scaler.pkl"
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
