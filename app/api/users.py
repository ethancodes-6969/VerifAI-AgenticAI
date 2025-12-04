from fastapi import APIRouter, HTTPException
import uuid
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["users"])

@router.post("/users/register")
async def register_user(request: dict):
    """Register a new user for fraud monitoring"""
    
    try:
        user_data = {
            'user_id': str(uuid.uuid4()),
            'phone_number': request.get('phone_number'),
            'email': request.get('email'),
            'name': request.get('name'),
            'created_at': '2025-12-04T14:00:00'
        }
        
        return {
            'success': True,
            'data': user_data,
            'message': 'User registered successfully'
        }
    
    except Exception as e:
        logger.error(f"Error registering user: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/users/{user_id}")
async def get_user_profile(user_id: str):
    """Get user profile"""
    
    return {
        'user_id': user_id,
        'avg_transaction_amount': 5000.0,
        'typical_daily_frequency': 2,
        'typical_locations': [
            {'lat': 19.0760, 'lon': 72.8777}
        ],
        'last_updated': '2025-12-04T14:00:00'
    }
