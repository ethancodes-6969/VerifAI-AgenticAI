import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    """Test health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "VerifAI" in response.json()["service"]

def test_process_normal_transaction():
    """Test normal transaction (should be APPROVED)"""
    payload = {
        "user_id": "user_test_001",
        "amount": 5000,
        "merchant": "Amazon",
        "merchant_category": "ECOMMERCE",
        "device_type": "web",
        "device_ip": "192.168.1.1",
        "user_location": {"lat": 19.0760, "lon": 72.8777}
    }
    
    response = client.post("/api/v1/transactions/process", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "transaction_id" in data
    assert "fraud_score" in data
    assert data["fraud_score"] < 0.50
    assert data["decision"] == "APPROVED"

def test_process_suspicious_transaction():
    """Test suspicious transaction (should be BLOCKED)"""
    payload = {
        "user_id": "user_test_002",
        "amount": 100000,
        "merchant": "Unknown_Merchant",
        "merchant_category": "CRYPTO",
        "device_type": "web",
        "device_ip": "203.0.113.45",
        "user_location": {"lat": 28.6139, "lon": 77.2090}
    }
    
    response = client.post("/api/v1/transactions/process", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["fraud_score"] > 0.80
    assert data["decision"] in ["BLOCKED", "HOLD"]

def test_get_status():
    """Test transaction status endpoint"""
    response = client.get("/api/v1/transactions/status/tx_test_123")
    assert response.status_code == 200
    assert "transaction_id" in response.json()

def test_register_user():
    """Test user registration"""
    payload = {
        "phone_number": "919876543210",
        "email": "test@example.com",
        "name": "Test User"
    }
    
    response = client.post("/api/v1/users/register", json=payload)
    assert response.status_code == 200
    assert "user_id" in response.json()["data"]
