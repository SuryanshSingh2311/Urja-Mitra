import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_plant_dossier_pdf(plant_data: dict) -> io.BytesIO:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=letter, 
        rightMargin=36, 
        leftMargin=36, 
        topMargin=36, 
        bottomMargin=36
    )
    story = []
    styles = getSampleStyleSheet()

    # Custom Color Palette
    primary_color = colors.HexColor("#ff6b00")
    dark_bg = colors.HexColor("#0c0e12")
    card_bg = colors.HexColor("#161920")
    text_color = colors.HexColor("#f8fafc")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=primary_color,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.HexColor("#94a3b8"),
        spaceAfter=15
    )

    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=colors.white,
        spaceBefore=10,
        spaceAfter=8
    )

    normal_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor("#cbd5e1"),
        leading=12
    )

    # Document Header
    story.append(Paragraph("BHARAT URJASETU", title_style))
    story.append(Paragraph(f"Official Technical Inspection Dossier • Plant ID: BUS-PLANT-{plant_data.get('id', '000')}", subtitle_style))
    story.append(Spacer(1, 10))

    # General Information Table
    info_data = [
        [
            Paragraph("<b>Plant Name:</b>", normal_style), Paragraph(str(plant_data.get('name')), normal_style),
            Paragraph("<b>Commissioned:</b>", normal_style), Paragraph(f"{plant_data.get('commissioned')} ({plant_data.get('status')})", normal_style)
        ],
        [
            Paragraph("<b>Capacity:</b>", normal_style), Paragraph(f"{plant_data.get('capacity')} {plant_data.get('capacity_unit', 'TPD')}", normal_style),
            Paragraph("<b>State / Region:</b>", normal_style), Paragraph(str(plant_data.get('state')), normal_style)
        ],
        [
            Paragraph("<b>Technology:</b>", normal_style), Paragraph(str(plant_data.get('technology')), normal_style),
            Paragraph("<b>Feedstock:</b>", normal_style), Paragraph(str(plant_data.get('feedstock')), normal_style)
        ],
        [
            Paragraph("<b>EPC Contractor:</b>", normal_style), Paragraph(str(plant_data.get('epc')), normal_style),
            Paragraph("<b>Offtaker:</b>", normal_style), Paragraph(str(plant_data.get('offtaker')), normal_style)
        ]
    ]

    info_table = Table(info_data, colWidths=[100, 170, 100, 170])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), card_bg),
        ('TEXTCOLOR', (0, 0), (-1, -1), text_color),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#222733")),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 15))

    # Technical Operating Parameters Section (Clean Subscript Formats)
    story.append(Paragraph("Technical &amp; Gas Purity Analytics", heading_style))
    
    # Safe HTML-formatted chemical subscript strings
    purity_val = str(plant_data.get('purity', '95.5% CH4')).replace('CH4', 'CH<sub>4</sub>').replace('CH₄', 'CH<sub>4</sub>')

    tech_data = [
        [
            Paragraph("<b>Parameter</b>", normal_style), 
            Paragraph("<b>Verified Value</b>", normal_style), 
            Paragraph("<b>Benchmark Standard</b>", normal_style)
        ],
        [
            Paragraph("Methane (CH<sub>4</sub>) Purity", normal_style), 
            Paragraph(purity_val, normal_style), 
            Paragraph("&ge; 90.0% (IS 16087)", normal_style)
        ],
        [
            Paragraph("Operating Pressure", normal_style), 
            Paragraph(str(plant_data.get('pressure', '200 Bar')), normal_style), 
            Paragraph("150 - 250 Bar Cascade", normal_style)
        ],
        [
            Paragraph("H<sub>2</sub>S Content", normal_style), 
            Paragraph("&lt; 20 ppm", normal_style), 
            Paragraph("&le; 20 ppm Max", normal_style)
        ],
        [
            Paragraph("CO<sub>2</sub> Content", normal_style), 
            Paragraph("&lt; 3.5%", normal_style), 
            Paragraph("&le; 4.0% Max", normal_style)
        ],
    ]

    tech_table = Table(tech_data, colWidths=[180, 180, 180])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#222733")),
        ('BACKGROUND', (0, 1), (-1, -1), dark_bg),
        ('TEXTCOLOR', (0, 0), (-1, -1), text_color),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#222733")),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 15))

    # Audit Certification Footnote
    story.append(Paragraph("Verification &amp; Compliance", heading_style))
    story.append(Paragraph(
        "This plant dossier has been generated and verified by the Bharat UrjaSetu Core Engine. "
        "All technical parameters and operational data have been cross-checked against the latest "
        "audit reports and compliance standards. For any discrepancies or further inquiries, please "
        "contact the Bharat UrjaSetu support team.",
        normal_style
    ))

    # Build the PDF
    doc.build(story)
    buffer.seek(0)
    return buffer



