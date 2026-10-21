from app.database import SessionLocal, Base, engine
from app.models import RFQ, Plant

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Seed Plants
if db.query(Plant).count() == 0:
    initial_plants = [
        Plant(
            id=1,
            name="IOCL CBG Plant, Panipat",
            capacity=12.0,
            capacity_unit="TPD",
            feedstock="Press Mud, Cow Dung",
            technology="Anaerobic Digestion + PSA",
            state="Haryana",
            commissioned="2023",
            epc="Deutsche Energy",
            offtaker="IOCL",
            status="Operational",
            verified=True,
            purity="96.2% CH₄",
            pressure="200 Bar",
            lat=29.3909,
            lng=76.9635
        ),
        Plant(
            id=2,
            name="Praj CBG Facility, Anand",
            capacity=20.0,
            capacity_unit="TPD",
            feedstock="Rice Straw",
            technology="CSTR + Membrane",
            state="Gujarat",
            commissioned="2022",
            epc="Praj Industries",
            offtaker="HPCL",
            status="Operational",
            verified=True,
            purity="95.8% CH₄",
            pressure="250 Bar",
            lat=22.5645,
            lng=72.9289
        ),
        Plant(
            id=3,
            name="Indore Bio-CNG Plant",
            capacity=15.0,
            capacity_unit="TPD",
            feedstock="Municipal Solid Waste",
            technology="Continuous Digestion",
            state="Madhya Pradesh",
            commissioned="2021",
            epc="EverEnviro",
            offtaker="IMC",
            status="Operational",
            verified=True,
            purity="95.5% CH₄",
            pressure="200 Bar",
            lat=22.7196,
            lng=75.8577
        ),
        Plant(
            id=4,
            name="Avadh Sugar CBG Unit, Sitapur",
            capacity=10.0,
            capacity_unit="TPD",
            feedstock="Press Mud",
            technology="Anaerobic Digestion + PSA",
            state="Uttar Pradesh",
            commissioned="2024",
            epc="BioRise India",
            offtaker="BPCL",
            status="Under Construction",
            verified=True,
            purity="Projected 96.0%",
            pressure="200 Bar",
            lat=27.5612,
            lng=80.6812
        ),
        Plant(
            id=5,
            name="Verbio Biofuel Plant, Sangrur",
            capacity=33.0,
            capacity_unit="TPD",
            feedstock="Paddy Straw",
            technology="Anaerobic Digestion + Scrubbing",
            state="Punjab",
            commissioned="2022",
            epc="Verbio AG",
            offtaker="IOCL",
            status="Operational",
            verified=True,
            purity="96.5% CH₄",
            pressure="250 Bar",
            lat=30.2458,
            lng=75.8421
        ),
        Plant(
            id=6,
            name="Pune GreenGas Unit",
            capacity=8.0,
            capacity_unit="TPD",
            feedstock="Food Waste",
            technology="CSTR + Membrane",
            state="Maharashtra",
            commissioned="2023",
            epc="GreenGas Solutions",
            offtaker="MNGL",
            status="Operational",
            verified=False,
            purity="94.8% CH₄",
            pressure="180 Bar",
            lat=18.5204,
            lng=73.8567
        )
    ]
    db.add_all(initial_plants)

# Seed RFQs
if db.query(RFQ).count() == 0:
    initial_rfqs = [
        RFQ(
            rfq_code="RFQ-1042",
            title="500 Nm³/hr PSA System Skid",
            category="PSA Systems",
            buyer="IOCL Panipat Unit",
            location="Haryana",
            budget="₹1.8 Cr",
            quantity="1 Unit",
            deadline="2026-11-15",
            status="Open",
            privacy="Public"
        ),
        RFQ(
            rfq_code="RFQ-1041",
            title="High-Pressure Biogas Compressor",
            category="Gas Compressors",
            buyer="BioRise India",
            location="Gujarat",
            budget="₹45 Lakhs",
            quantity="2 Units",
            deadline="2026-10-30",
            status="In Review",
            privacy="Public"
        ),
        RFQ(
            rfq_code="RFQ-1040",
            title="Double Membrane Gas Holder (1000m³)",
            category="Gas Holders",
            buyer="GreenGas Pvt Ltd",
            location="Maharashtra",
            budget="₹22 Lakhs",
            quantity="1 Unit",
            deadline="2026-11-05",
            status="Open",
            privacy="Anonymized"
        ),
        RFQ(
            rfq_code="RFQ-1039",
            title="Press Mud Feedstock Supply",
            category="Feedstock",
            buyer="Avadh Sugar & Energy",
            location="Uttar Pradesh",
            budget="Contract",
            quantity="100 MT/day",
            deadline="2026-12-01",
            status="Awarded",
            privacy="Public"
        )
    ]
    db.add_all(initial_rfqs)

db.commit()
db.close()
print("Database seeded successfully!")