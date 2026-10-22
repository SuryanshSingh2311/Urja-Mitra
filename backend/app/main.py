from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.seed import *
from typing import List

from app.database import Base, engine, get_db
from app import models, schemas

from fastapi.responses import StreamingResponse
from app.utils.pdf_generator import generate_plant_dossier_pdf
import os

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bharat UrjaSetu API",
    description="B2B Bioenergy Procurement & Geospatial Plant Backend API",
    version="1.0.0"
)


ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    ALLOWED_ORIGINS.append(frontend_url.rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or your specific Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]  # Critical for PDF file downloads
)

@app.get("/")
def read_root():
    return {"status": "online", "system": "Bharat UrjaSetu Core Engine"}

# --- RFQ ENDPOINTS ---
@app.get("/api/v1/rfqs", response_model=List[schemas.RFQResponse])
def get_rfqs(db: Session = Depends(get_db)):
    return db.query(models.RFQ).order_by(models.RFQ.created_at.desc()).all()

@app.post("/api/v1/rfqs", response_model=schemas.RFQResponse)
def create_rfq(rfq: schemas.RFQCreate, db: Session = Depends(get_db)):
    count = db.query(models.RFQ).count()
    rfq_code = f"RFQ-{1043 + count}"
    
    db_rfq = models.RFQ(
        rfq_code=rfq_code,
        **rfq.model_dump()
    )
    db.add(db_rfq)
    db.commit()
    db.refresh(db_rfq)
    return db_rfq

# --- PLANT DIRECTORY ENDPOINTS ---
@app.get("/api/v1/plants", response_model=List[schemas.PlantResponse])
def get_plants(db: Session = Depends(get_db)):
    return db.query(models.Plant).all()

@app.get("/api/v1/plants/{plant_id}/dossier-pdf")
def download_plant_dossier(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    
    if not plant:
        raise HTTPException(status_code=404, detail="Plant record not found")

    plant_dict = {
        "id": plant.id,
        "name": plant.name,
        "capacity": plant.capacity,
        "capacity_unit": plant.capacity_unit,
        "state": plant.state,
        "commissioned": plant.commissioned,
        "status": plant.status,
        "feedstock": plant.feedstock,
        "technology": plant.technology,
        "epc": plant.epc,
        "offtaker": plant.offtaker,
        "purity": plant.purity,
        "pressure": plant.pressure
    }

    pdf_buffer = generate_plant_dossier_pdf(plant_dict)
    
    headers = {
        'Content-Disposition': f'attachment; filename="Dossier_Plant_{plant_id}.pdf"'
    }
    return StreamingResponse(pdf_buffer, media_type="application/pdf", headers=headers)