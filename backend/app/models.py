from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime
from datetime import datetime
from app.database import Base

class RFQ(Base):
    __tablename__ = "rfqs"

    id = Column(Integer, primary_key=True, index=True)
    rfq_code = Column(String, unique=True, index=True)
    title = Column(String, index=True)
    category = Column(String)
    buyer = Column(String)
    location = Column(String)
    budget = Column(String)
    quantity = Column(String)
    deadline = Column(String)
    description = Column(Text, nullable=True)
    status = Column(String, default="Open")
    privacy = Column(String, default="Public")
    created_at = Column(DateTime, default=datetime.utcnow)

class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    capacity = Column(Float)
    capacity_unit = Column(String, default="TPD")
    feedstock = Column(String)
    technology = Column(String)
    state = Column(String, index=True)
    commissioned = Column(String)
    epc = Column(String)
    offtaker = Column(String)
    status = Column(String)
    verified = Column(Boolean, default=True)
    purity = Column(String)
    pressure = Column(String)
    lat = Column(Float)
    lng = Column(Float)