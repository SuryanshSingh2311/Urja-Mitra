import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Filter, 
  CheckCircle, 
  RotateCcw,
  ArrowUpRight,
  Search,
  Globe,
  FileText,
  X,
  ShieldCheck,
  Download
} from 'lucide-react';

// Read CARTO API Key from Vite env or fallback to empty string
const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY || '';

// Custom Glowing Dark Pin Marker Icon for Leaflet
const customMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="
    background-color: #ff6b00;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 0 12px #ff6b00;
    cursor: pointer;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

export default function PlantMap() {
  // Filter States
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedFeedstock, setSelectedFeedstock] = useState('All Feedstocks');
  const [selectedTech, setSelectedTech] = useState('All Technologies');
  const [minCapacity, setMinCapacity] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for Inspection Dossier
  const [dossierModalPlant, setDossierModalPlant] = useState(null);

  // Plant Dataset with Real Geographic Lat/Lng Coordinates in India
  const plantsData = [
    { 
      id: 1, 
      name: 'IOCL CBG Plant, Panipat', 
      capacity: 12, 
      capacityUnit: 'TPD', 
      feedstock: 'Press Mud, Cow Dung', 
      technology: 'Anaerobic Digestion + PSA', 
      state: 'Haryana', 
      commissioned: '2023', 
      epc: 'Deutsche Energy', 
      offtaker: 'IOCL', 
      status: 'Operational', 
      verified: true, 
      purity: '96.2% CH₄',
      pressure: '200 Bar',
      lat: 29.3909,
      lng: 76.9635
    },
    { 
      id: 2, 
      name: 'Praj CBG Facility, Anand', 
      capacity: 20, 
      capacityUnit: 'TPD', 
      feedstock: 'Rice Straw', 
      technology: 'CSTR + Membrane', 
      state: 'Gujarat', 
      commissioned: '2022', 
      epc: 'Praj Industries', 
      offtaker: 'HPCL', 
      status: 'Operational', 
      verified: true, 
      purity: '95.8% CH₄',
      pressure: '250 Bar',
      lat: 22.5645,
      lng: 72.9289
    },
    { 
      id: 3, 
      name: 'Indore Bio-CNG Plant', 
      capacity: 15, 
      capacityUnit: 'TPD', 
      feedstock: 'Municipal Solid Waste', 
      technology: 'Continuous Digestion', 
      state: 'Madhya Pradesh', 
      commissioned: '2021', 
      epc: 'EverEnviro', 
      offtaker: 'IMC', 
      status: 'Operational', 
      verified: true, 
      purity: '95.5% CH₄',
      pressure: '200 Bar',
      lat: 22.7196,
      lng: 75.8577
    },
    { 
      id: 4, 
      name: 'Avadh Sugar CBG Unit, Sitapur', 
      capacity: 10, 
      capacityUnit: 'TPD', 
      feedstock: 'Press Mud', 
      technology: 'Anaerobic Digestion + PSA', 
      state: 'Uttar Pradesh', 
      commissioned: '2024', 
      epc: 'BioRise India', 
      offtaker: 'BPCL', 
      status: 'Under Construction', 
      verified: true, 
      purity: 'Projected 96.0%',
      pressure: '200 Bar',
      lat: 27.5612,
      lng: 80.6812
    },
    { 
      id: 5, 
      name: 'Verbio Biofuel Plant, Sangrur', 
      capacity: 33, 
      capacityUnit: 'TPD', 
      feedstock: 'Paddy Straw', 
      technology: 'Anaerobic Digestion + Scrubbing', 
      state: 'Punjab', 
      commissioned: '2022', 
      epc: 'Verbio AG', 
      offtaker: 'IOCL', 
      status: 'Operational', 
      verified: true, 
      purity: '96.5% CH₄',
      pressure: '250 Bar',
      lat: 30.2458,
      lng: 75.8421
    },
    { 
      id: 6, 
      name: 'Pune GreenGas Unit', 
      capacity: 8, 
      capacityUnit: 'TPD', 
      feedstock: 'Food Waste', 
      technology: 'CSTR + Membrane', 
      state: 'Maharashtra', 
      commissioned: '2023', 
      epc: 'GreenGas Solutions', 
      offtaker: 'MNGL', 
      status: 'Operational', 
      verified: false, 
      purity: '94.8% CH₄',
      pressure: '180 Bar',
      lat: 18.5204,
      lng: 73.8567
    },
  ];

  // Selected Active Plant
  const [selectedPlant, setSelectedPlant] = useState(plantsData[3]);

  // Filter Engine
  const filteredPlants = useMemo(() => {
    return plantsData.filter((plant) => {
      const matchState = selectedState === 'All States' || plant.state === selectedState;
      const matchFeedstock = selectedFeedstock === 'All Feedstocks' || plant.feedstock.includes(selectedFeedstock);
      const matchTech = selectedTech === 'All Technologies' || plant.technology.includes(selectedTech);
      const matchSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || plant.epc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const minCap = minCapacity ? parseFloat(minCapacity) : 0;
      const maxCap = maxCapacity ? parseFloat(maxCapacity) : Infinity;
      const matchCap = plant.capacity >= minCap && plant.capacity <= maxCap;

      return matchState && matchFeedstock && matchTech && matchSearch && matchCap;
    });
  }, [selectedState, selectedFeedstock, selectedTech, minCapacity, maxCapacity, searchQuery]);

  const resetFilters = () => {
    setSelectedState('All States');
    setSelectedFeedstock('All Feedstocks');
    setSelectedTech('All Technologies');
    setMinCapacity('');
    setMaxCapacity('');
    setSearchQuery('');
  };

  const metrics = useMemo(() => {
    const operational = filteredPlants.filter(p => p.status === 'Operational').length;
    const underConstruction = filteredPlants.filter(p => p.status === 'Under Construction').length;
    const totalCapacity = filteredPlants.reduce((sum, p) => sum + p.capacity, 0);

    return { operational, underConstruction, total: filteredPlants.length, totalCapacity };
  }, [filteredPlants]);

  // Dynamic Tile URL based on API key presence
  const tileUrl = CARTO_KEY 
    ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Globe size={20} className="text-brand-accent" />
            <span>Find My Plant Directory</span>
          </h2>
          <p className="text-xs text-brand-muted">Geospatial tracker for commissioned & planned bioenergy plants across India</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input 
              type="text" 
              placeholder="Search plant or EPC company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-2 rounded-xl border border-emerald-500/20 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {filteredPlants.length} Plants Match
          </span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Dynamic Filter Sidebar */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4 h-fit">
          <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Filter size={14} className="text-brand-accent" />
              <span>Plant Filters</span>
            </h3>
            <button 
              onClick={resetFilters}
              className="text-brand-muted hover:text-white transition-colors p-1 flex items-center gap-1 text-[11px]" 
              title="Reset Filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-brand-muted block mb-1">State / Region</label>
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
              >
                <option>All States</option>
                <option>Punjab</option>
                <option>Haryana</option>
                <option>Uttar Pradesh</option>
                <option>Gujarat</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-brand-muted block mb-1">Capacity Range (TPD)</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                  className="w-1/2 bg-brand-bg border border-brand-border rounded-xl p-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent" 
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="w-1/2 bg-brand-bg border border-brand-border rounded-xl p-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent" 
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-brand-muted block mb-1">Feedstock Category</label>
              <select 
                value={selectedFeedstock}
                onChange={(e) => setSelectedFeedstock(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
              >
                <option>All Feedstocks</option>
                <option>Press Mud</option>
                <option>Paddy Straw</option>
                <option>Rice Straw</option>
                <option>Cow Dung</option>
                <option>Municipal Solid Waste</option>
                <option>Food Waste</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-brand-muted block mb-1">Technology Standard</label>
              <select 
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-accent"
              >
                <option>All Technologies</option>
                <option>Anaerobic Digestion + PSA</option>
                <option>CSTR + Membrane</option>
                <option>Continuous Digestion</option>
              </select>
            </div>
          </div>
        </div>

        {/* High-Definition Interactive Leaflet Map Workspace */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="relative bg-[#0d1117] border border-brand-border rounded-2xl min-h-[520px] overflow-hidden p-2 shadow-inner">
            
            {/* Interactive Dark Mode Leaflet Map Container */}
            <MapContainer 
              center={[22.5937, 78.9629]} 
              zoom={5} 
              scrollWheelZoom={true}
              className="w-full h-[500px] rounded-xl z-10"
            >
              <TileLayer 
                url={tileUrl}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {/* Dynamic GPS Markers */}
              {filteredPlants.map((plant) => (
                <Marker 
                  key={plant.id} 
                  position={[plant.lat, plant.lng]}
                  icon={customMarkerIcon}
                  eventHandlers={{
                    click: () => setSelectedPlant(plant),
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="text-slate-900 text-xs font-semibold p-1">
                      <strong>{plant.name}</strong>
                      <p>{plant.capacity} {plant.capacityUnit} • {plant.state}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Floating Detail Drawer Overlay */}
            {selectedPlant && (
              <div className="absolute right-4 bottom-4 bg-brand-card/95 backdrop-blur-md p-5 rounded-2xl border border-brand-border shadow-2xl max-w-xs space-y-3 z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-white text-sm leading-tight">{selectedPlant.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      {selectedPlant.verified && (
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle size={10} /> Verified Plant
                        </span>
                      )}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        selectedPlant.status === 'Operational' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {selectedPlant.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-brand-bg/80 p-3 rounded-xl border border-brand-border/60">
                  <div>
                    <span className="text-brand-muted block text-[10px]">Capacity</span>
                    <span className="font-bold text-white">{selectedPlant.capacity} {selectedPlant.capacityUnit}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px]">State</span>
                    <span className="font-semibold text-brand-accent">{selectedPlant.state}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px]">Feedstock</span>
                    <span className="font-semibold text-slate-200 truncate block">{selectedPlant.feedstock}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px]">Technology</span>
                    <span className="font-semibold text-slate-200 truncate block">{selectedPlant.technology}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px]">EPC Company</span>
                    <span className="font-semibold text-slate-200">{selectedPlant.epc}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block text-[10px]">Offtaker</span>
                    <span className="font-semibold text-slate-200">{selectedPlant.offtaker}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setDossierModalPlant(selectedPlant)}
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-accent/20"
                >
                  <span>View Full Inspection Dossier</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            )}

          </div>

          {/* Dynamic Status Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-brand-muted font-medium">Operational</span>
              <p className="text-2xl font-bold text-emerald-400 tracking-tight">{metrics.operational}</p>
            </div>
            <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-brand-muted font-medium">Under Construction</span>
              <p className="text-2xl font-bold text-amber-400 tracking-tight">{metrics.underConstruction}</p>
            </div>
            <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-brand-muted font-medium">Total Capacity</span>
              <p className="text-2xl font-bold text-white tracking-tight">{metrics.totalCapacity} TPD</p>
            </div>
            <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-brand-muted font-medium">Filtered Plants</span>
              <p className="text-2xl font-bold text-brand-accent tracking-tight">{metrics.total}</p>
            </div>
          </div>

        </div>

      </div>

      {/* INSPECTION DOSSIER MODAL */}
      {dossierModalPlant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl border border-brand-accent/20">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{dossierModalPlant.name}</h3>
                  <p className="text-xs text-brand-muted">Inspection Dossier & Verification Report • ID: {dossierModalPlant.id + 8800}</p>
                </div>
              </div>
              <button 
                onClick={() => setDossierModalPlant(null)}
                className="p-1.5 text-brand-muted hover:text-white rounded-xl bg-brand-bg/60 border border-brand-border transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Dossier Report Details Grid */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-brand-bg/60 p-3 rounded-xl border border-brand-border">
                  <span className="text-brand-muted block text-[10px]">Commissioning Status</span>
                  <span className="font-bold text-emerald-400">{dossierModalPlant.status} ({dossierModalPlant.commissioned})</span>
                </div>
                <div className="bg-brand-bg/60 p-3 rounded-xl border border-brand-border">
                  <span className="text-brand-muted block text-[10px]">CBG Gas Purity</span>
                  <span className="font-bold text-white">{dossierModalPlant.purity}</span>
                </div>
                <div className="bg-brand-bg/60 p-3 rounded-xl border border-brand-border">
                  <span className="text-brand-muted block text-[10px]">Operating Pressure</span>
                  <span className="font-bold text-white">{dossierModalPlant.pressure}</span>
                </div>
              </div>

              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border space-y-2">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Compliance & Audit Verification</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-brand-muted text-[11px]">
                  <p>MNRE CFA Subsidy Approval: <strong className="text-emerald-400">Verified</strong></p>
                  <p>Pollution Control Clearance: <strong className="text-emerald-400">Valid (CTO)</strong></p>
                  <p>Offtake Guarantee: <strong className="text-white">{dossierModalPlant.offtaker}</strong></p>
                  <p>EPC Contractor: <strong className="text-white">{dossierModalPlant.epc}</strong></p>
                </div>
              </div>

              <div className="p-3 bg-brand-accent/10 border border-brand-accent/20 rounded-xl text-brand-muted text-[11px] flex items-center justify-between">
                <span>Detailed CAD site layout, digester volume analysis, and pipeline specs available in PDF format.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-brand-border">
              <button 
                onClick={() => setDossierModalPlant(null)}
                className="px-4 py-2 bg-brand-bg hover:bg-brand-border text-brand-muted hover:text-white rounded-xl border border-brand-border font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button 
  onClick={() => {
    const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    // Normalize base URL to ensure /api/v1 is present
    const baseUrl = rawBaseUrl.endsWith('/api/v1') 
      ? rawBaseUrl 
      : `${rawBaseUrl.replace(/\/$/, '')}/api/v1`;
      
    const downloadUrl = `${baseUrl}/plants/${dossierModalPlant.id}/dossier-pdf`;
    window.open(downloadUrl, '_blank');
  }}
  className="px-5 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-brand-accent/20 transition-all"
>
  <Download size={14} />
  <span>Download Certified PDF</span>
</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}