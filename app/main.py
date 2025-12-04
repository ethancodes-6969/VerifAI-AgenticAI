from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Import routers
from app.api import transactions, users

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="VerifAI - Agentic Fraud Detection",
    description="Real-time autonomous fraud detection and prevention",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(transactions.router)
app.include_router(users.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "service": "VerifAI - Agentic Fraud Detection",
        "status": "online",
        "version": "1.0.0",
        "docs": "http://localhost:8000/docs",
        "redoc": "http://localhost:8000/redoc"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "VerifAI is running"
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("✅ VerifAI starting up...")
    logger.info("📚 API Docs: http://localhost:8000/docs")
    logger.info("🔍 ReDoc: http://localhost:8000/redoc")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 VerifAI shutting down...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
