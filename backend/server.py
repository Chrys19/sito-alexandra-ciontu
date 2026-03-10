from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(
    title="Dott.ssa Alexandra Diana Ciontu - Psicologa",
    description="Sito web professionale per psicologa clinica",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telefono: str = Field(..., min_length=6, max_length=20)
    messaggio: str = Field(..., min_length=10, max_length=2000)
    privacy_accepted: bool = Field(default=True)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    letto: bool = Field(default=False)


class ContactMessageCreate(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telefono: str = Field(..., min_length=6, max_length=20)
    messaggio: str = Field(..., min_length=10, max_length=2000)
    privacy_accepted: bool = Field(default=True)


class ContactMessageResponse(BaseModel):
    id: str
    nome: str
    email: str
    telefono: str
    messaggio: str
    timestamp: datetime
    letto: bool


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Sito web Dott.ssa Alexandra Diana Ciontu - Psicologa Clinica"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "psicologa-website"}


@api_router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(input_data: ContactMessageCreate):
    """
    Ricevi un messaggio dal form di contatto
    """
    if not input_data.privacy_accepted:
        raise HTTPException(status_code=400, detail="È necessario accettare la privacy policy")
    
    contact_dict = input_data.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    
    return ContactMessageResponse(
        id=contact_obj.id,
        nome=contact_obj.nome,
        email=contact_obj.email,
        telefono=contact_obj.telefono,
        messaggio=contact_obj.messaggio,
        timestamp=contact_obj.timestamp,
        letto=contact_obj.letto
    )


@api_router.get("/contact", response_model=List[ContactMessageResponse])
async def get_contact_messages():
    """
    Ottieni tutti i messaggi di contatto (per admin)
    """
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg['timestamp'], str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return messages


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input_data: StatusCheckCreate):
    status_dict = input_data.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
