from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime

class UserRegister(BaseModel):
    phone_number: str
    email: Optional[str] = None
    name: Optional[str] = None

class TransactionRequest(BaseModel):
    user_id: str
    amount: float = Field(gt=0, description="Transaction amount must be positive")
    merchant: str
    merchant_category: str
    device_type: str
    device_ip: str
    user_location: Dict[str, float]
    email: Optional[str] = None

class TransactionResponse(BaseModel):
    id: str
    user_id: str
    amount: float
    merchant: str
    fraud_score: float
    risk_level: str
    status: str
    action: Optional[str]
    message: str
    requires_confirmation: bool

class WhatsAppConfirmation(BaseModel):
    transaction_id: str
    user_confirmed: bool
    user_message: Optional[str] = None

class UserBehaviorProfile(BaseModel):
    user_id: str
    avg_transaction_amount: float
    typical_daily_frequency: int
    typical_locations: List[Dict[str, float]]
    last_updated: datetime
