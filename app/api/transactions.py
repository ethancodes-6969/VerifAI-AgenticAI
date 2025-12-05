from fastapi import APIRouter, HTTPException
import uuid
import logging
from app.services.agent import AgentController
from app.models.schemas import TransactionRequest, TransactionResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["transactions"])

# Initialize agent
agent = AgentController()

@router.post("/transactions/process", response_model=dict)
async def process_transaction(request: TransactionRequest):
    """
    Main endpoint - Process a transaction through VerifAI
    
    Example request:
    {
        "user_id": "user_123",
        "amount": 75000,
        "merchant": "Unknown_Store",
        "merchant_category": "CRYPTO",
        "device_type": "web",
        "device_ip": "192.168.1.100",
        "user_location": {"lat": 19.0760, "lon": 72.8777}
    }
    """
    
    try:
        # Convert request to dict
        tx_dict = request.dict()
        tx_dict['id'] = str(uuid.uuid4())
        
        # Add mock fields - Dynamic for demo purposes
        if tx_dict['amount'] > 10000:
            tx_dict['location_distance'] = 2500  # Far away
            tx_dict['transactions_today'] = 15   # Velocity attack
            tx_dict['is_new_device'] = True      # New device
        else:
            tx_dict['location_distance'] = 10
            tx_dict['transactions_today'] = 1
            tx_dict['is_new_device'] = False
        
        # Process through agent
        result = await agent.process_transaction(tx_dict)
        
        return result
    
    except Exception as e:
        logger.error(f"Error processing transaction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/transactions/status/{transaction_id}")
async def get_status(transaction_id: str):
    """Get transaction status"""
    
    return {
        "transaction_id": transaction_id,
        "status": "PROCESSING",
        "fraud_score": 0.65,
        "last_updated": "2025-12-04T14:00:00",
        "message": "Status retrieved successfully"
    }

@router.post("/transactions/verify/{transaction_id}")
async def verify_transaction(transaction_id: str, user_confirmed: bool):
    """
    User confirms or denies WhatsApp verification
    This triggers the LEARN phase
    """
    
    result = await agent.handle_user_verification_response(transaction_id, user_confirmed)
    return result
