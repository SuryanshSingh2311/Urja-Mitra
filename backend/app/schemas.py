from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RFQCreate(BaseModel):
    title: str
    category: str
    buyer: str
    location: str
    budget: str
    quantity: Optional[str] = None
    deadline: Optional[str] = None
    description: Optional[str] = None
    privacy: Optional[str] = "Public"

class RFQResponse(RFQCreate):
    id: int
    rfq_code: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class PlantResponse(BaseModel):
    id: int
    name: str
    capacity: float
    capacity_unit: str
    feedstock: str
    technology: str
    state: str
    commissioned: str
    epc: str
    offtaker: str
    status: str
    verified: bool
    purity: str
    pressure: str
    lat: float
    lng: float

    class Config:
        from_attributes = True