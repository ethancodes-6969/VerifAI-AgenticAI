from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from app.services.email_service import EmailService
import logging

router = APIRouter(prefix="/api/demo", tags=["Demo"])
logger = logging.getLogger(__name__)

class DemoRequest(BaseModel):
    email: EmailStr
    role: str
    name: str
    company: str
    requirement: str = None

@router.post("/request")
async def request_demo(request: DemoRequest):
    """
    Submit a demo request.
    Sends an email notification to the support team.
    """
    try:
        email_service = EmailService()
        result = await email_service.send_demo_request_email(
            user_email=request.email,
            user_role=request.role,
            user_name=request.name,
            user_company=request.company,
            user_requirement=request.requirement
        )
        
        if not result.get("success"):
            error_details = result.get("error", "Unknown error failure")
            raise HTTPException(status_code=500, detail=f"Email service error: {error_details}")
            
        return {"message": "Demo request sent successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}"
        logger.error(f"Error processing demo request: {error_msg}")
        raise HTTPException(status_code=500, detail=error_msg)
