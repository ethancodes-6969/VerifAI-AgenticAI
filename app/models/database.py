from sqlalchemy import Column, String, Float, Integer, DateTime, Boolean, JSON, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    phone_number = Column(String, unique=True, nullable=False)
    email = Column(String)
    name = Column(String)
    account_created_at = Column(DateTime, default=datetime.utcnow)
    
    # Behavioral Profile
    avg_transaction_amount = Column(Float, default=0.0)
    typical_transaction_frequency = Column(Integer, default=0)
    typical_locations = Column(JSON, default=[])
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False)
    
    # Transaction Details
    amount = Column(Float, nullable=False)
    merchant = Column(String, nullable=False)
    merchant_category = Column(String)
    currency = Column(String, default="INR")
    
    # Location & Device
    user_location = Column(JSON)
    device_ip = Column(String)
    device_type = Column(String)
    
    # Temporal
    transaction_timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Risk Assessment
    fraud_score = Column(Float, default=0.0)
    risk_level = Column(String)
    
    # Status
    status = Column(String, default="PENDING")
    
    # Feedback Loop
    is_fraud = Column(Boolean, nullable=True)
    feedback_timestamp = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class FraudAlert(Base):
    __tablename__ = "fraud_alerts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    transaction_id = Column(String, nullable=False)
    user_id = Column(String, nullable=False)
    
    alert_type = Column(String)
    alert_message = Column(String)
    alert_action = Column(String)
    user_response = Column(Boolean, nullable=True)
    response_timestamp = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class MLModelMetrics(Base):
    __tablename__ = "ml_model_metrics"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    model_version = Column(String)
    
    accuracy = Column(Float)
    precision = Column(Float)
    recall = Column(Float)
    f1_score = Column(Float)
    false_positive_rate = Column(Float)
    
    training_date = Column(DateTime)
    total_transactions_trained = Column(Integer)
    
    created_at = Column(DateTime, default=datetime.utcnow)
