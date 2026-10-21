import React, { useState } from 'react';
import cbgHeroBg from './assets/cbg-hero.jpg';
import logoImg from './assets/logo.png';
import {
  Search, MapPin, Wrench, RefreshCw, Wheat, Users, Briefcase, FileText,
  Calculator, Newspaper, Phone, Mail, Globe, Star, CheckCircle, Navigation,
  ChevronRight, Heart, Bell, MessageSquare, User, Filter, SlidersHorizontal, ShieldCheck
} from 'lucide-react';

export default function UrjaMitraApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPlant, setSelectedPlant] = useState({
    name: 'IOCL CBG Plant, Panipat',
    capacity: '12 TPD',
    feedstock: 'Press Mud, Cow Dung',
    technology: 'Anaerobic Digestion + PSA',
    commissioned: '2023',
    epc: 'Deutsche Energy',
    offtaker: 'IOCL',
    status: 'Operational'
  });

  // Calculator State
  const [calculatorType, setCalculatorType] = useState('Biogas Yield Calculator');
  const [feedstockType, setFeedstockType] = useState('Cattle Dung');
  const [feedstockQty, setFeedstockQty] = useState(100);
  const [vsPercentage, setVsPercentage] = useState(80);
  const [yieldResult, setYieldResult] = useState({ yield: '850.5', methane: '55 - 60', methaneVolume: '467.8', energy: '4,678' });

  // Static Data Sets
  const marketplaceProducts = [
    { id: 1, title: 'PSA System', subtitle: 'Membrane / Skid Mounted', price: '₹18,50,000', vendor: 'GreenGas Solutions', location: 'Pune, Maharashtra', category: 'PSA Systems' },
    { id: 2, title: 'Biogas Compressor', subtitle: 'High Pressure, Oil Free', price: '₹3,75,000', vendor: 'AirTech Engineers', location: 'Vadodara, Gujarat', category: 'Gas Compressors' },
    { id: 3, title: 'Cylindrical Digester', subtitle: '50 / 100 / 500 m³', price: '₹4,80,000', vendor: 'BioRise India', location: 'Hyderabad, Telangana', category: 'Digesters' },
    { id: 4, title: 'Gas Holder', subtitle: 'Double Membrane', price: '₹2,10,000', vendor: 'Gastech', location: 'Lucknow, UP', category: 'Gas Holders' },
    { id: 5, title: 'H2S Scrubber', subtitle: 'Iron Sponge / Activated Carbon', price: '₹1,25,000', vendor: 'PureGas Solutions', location: 'Chennai, Tamil Nadu', category: 'H2S Scrubbers' },
    { id: 6, title: 'Biogas Blower', subtitle: 'Roots Blower', price: '₹88,000', vendor: 'PowerTech', location: 'Coimbatore, Tamil Nadu', category: 'Gas Compressors' },
    { id: 7, title: 'Gas Analyzer', subtitle: 'Biogas & Gas Analyzer', price: '₹1,10,000', vendor: 'Instruments India', location: 'Noida, UP', category: 'Gas Analyzers' },
    { id: 8, title: 'CO2 Removal System', subtitle: 'Chemical / PSA Based', price: '₹12,000,000', vendor: 'GreenGas Solutions', location: 'Pune, Maharashtra', category: 'CO2 Removal Systems' }
  ];

  const categories = [
    'All Categories', 'Digesters', 'PSA Systems', 'Gas Compressors', 'Gas Holders', 
    'Blowers', 'Pumps', 'Valves', 'H2S Scrubbers', 'CO2 Removal Systems', 
    'Gas Analyzers', 'Instruments & Sensors', 'PLC & SCADA', 'Others'
  ];

  const handleCalculate = () => {
    const baseYield = feedstockQty * 8.5;
    const baseMethane = baseYield * 0.55;
    const energy = baseMethane * 10;
    setYieldResult({
      yield: baseYield.toLocaleString('en-IN', { maximumFractionDigits: 1 }),
      methane: '55 - 60',
      methaneVolume: baseMethane.toLocaleString('en-IN', { maximumFractionDigits: 1 }),
      energy: energy.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}
            
            >
              <img 
    src={logoImg} 
    alt="Urja Mitra Logo" 
    className="h-10 w-auto object-contain" 
  />
            
            <div>
              <span className="text-xl font-black text-emerald-800 tracking-tight">ऊर्जा MITRA</span>
              <p className="text-[10px] text-emerald-600 font-medium -mt-1">Bharat's Partner in Clean Energy</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            {[
              { id: 'home', label: 'Home' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'plant-map', label: 'Find My Plant' },
              { id: 'supplier-profile', label: 'Services' },
              { id: 'calculators', label: 'Knowledge Hub' },
              { id: 'jobs', label: 'Jobs & Training' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`transition-colors py-2 border-b-2 ${
                  activeTab === nav.id
                    ? 'border-emerald-700 text-emerald-800 font-bold'
                    : 'border-transparent text-slate-600 hover:text-emerald-700'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>

          {/* User Profile / Notifications */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-full relative">
              <MessageSquare size={18} />
            </button>
            <button className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
            </button>
            <div 
              onClick={() => setActiveTab('supplier-profile')} 
              className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" className="w-8 h-8 rounded-full border border-emerald-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic View Loader */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* PAGE 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[420px] flex items-center p-8 md:p-12">
              <img 
                src={cbgHeroBg} 
    alt="CBG Plant Background" 
    className="absolute inset-0 w-full h-full object-cover opacity-35"
                
              />
              <div className="relative z-10 max-w-2xl space-y-6">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  India's Digital Ecosystem for Biogas & CBG Industry
                </h1>
                <p className="text-slate-200 text-base md:text-lg">
                  Connect with verified suppliers, plant owners, EPC companies, consultants and bioenergy professionals – all at one platform.
                </p>

                {/* Hero Search Bar */}
                <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 shadow-lg">
                  <div className="flex-1 flex items-center px-3 w-full">
                    <Search className="text-slate-400 mr-2" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search equipment, suppliers, plants, services..." 
                      className="w-full text-slate-800 focus:outline-none text-sm py-2"
                    />
                  </div>
                  <select className="text-sm bg-slate-100 text-slate-700 px-3 py-2 rounded border border-slate-200 w-full md:w-auto">
                    <option>All Categories</option>
                    <option>Equipment</option>
                    <option>Spare Parts</option>
                    <option>Feedstock</option>
                  </select>
                  <button 
                    onClick={() => setActiveTab('marketplace')} 
                    className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2 rounded transition-colors text-sm"
                  >
                    Search
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                    Post Requirement (RFQ)
                  </button>
                  <button 
                    onClick={() => setActiveTab('supplier-profile')}
                    className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Find Suppliers
                  </button>
                </div>
              </div>
            </div>

            {/* Core Service Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: 'Equipment Marketplace', desc: 'Digesters, PSA, Compressors, OEM machinery & more', icon: Wrench, target: 'marketplace' },
                { title: 'Spare Parts Marketplace', desc: 'Pumps, Valves, Sensors, PLC & more', icon: RefreshCw, target: 'marketplace' },
                { title: 'Used Equipment Marketplace', desc: 'Buy & Sell Pre-owned Equipment', icon: RefreshCw, target: 'marketplace' },
                { title: 'Feedstock Exchange', desc: 'Press Mud, Cow Dung, Agri Residue & more', icon: Wheat, target: 'marketplace' },
                { title: 'Services & Consultants', desc: 'EPC, AMC, Commissioning Consultancy & more', icon: Users, target: 'supplier-profile' },
                { title: 'Jobs & Internships', desc: 'Find Jobs, Get Talent, Internships & more', icon: Briefcase, target: 'jobs' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveTab(item.target)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <item.icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs mb-1">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Feature Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Find My Plant</h3>
                  <p className="text-slate-500 text-xs mb-4">Explore CBG plants across India on our interactive map.</p>
                </div>
                <button onClick={() => setActiveTab('plant-map')} className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1">
                  <MapPin size={14} />
                  <span>Explore Now</span>
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Engineering Tools</h3>
                  <p className="text-slate-500 text-xs mb-4">Smart calculators for your plant design & operation.</p>
                </div>
                <button onClick={() => setActiveTab('calculators')} className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1">
                  <Calculator size={14} />
                  <span>Explore Tools</span>
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Government Schemes</h3>
                  <p className="text-slate-500 text-xs mb-4">Stay updated with latest schemes & subsidies.</p>
                </div>
                <button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1">
                  <FileText size={14} />
                  <span>View Schemes</span>
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Industry News</h3>
                  <p className="text-slate-500 text-xs mb-4">Latest updates, projects, policies & insights.</p>
                </div>
                <button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1">
                  <Newspaper size={14} />
                  <span>Read News</span>
                </button>
              </div>
            </div>

            {/* Platform Metrics Bar */}
            <div className="bg-emerald-900 text-white rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">500+</p>
                <p className="text-xs text-slate-300">Verified Suppliers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">100+</p>
                <p className="text-xs text-slate-300">CBG Plants Listed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">1000+</p>
                <p className="text-xs text-slate-300">Industry Professionals</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">50+</p>
                <p className="text-xs text-slate-300">Equipment Categories</p>
              </div>
            </div>

          </div>
        )}

        {/* PAGE 2: MARKETPLACE PAGE */}
        {activeTab === 'marketplace' && (
          <div className="space-y-4">
            
            {/* Breadcrumb & Filter Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div className="text-xs text-slate-500">
                <span>Home</span> &gt; <span className="font-semibold text-slate-800">Marketplace</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-700">
                  <option>All Locations</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Uttar Pradesh</option>
                </select>
                <select className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-700">
                  <option>All Brands</option>
                  <option>Praj</option>
                  <option>GreenGas</option>
                </select>
                <select className="bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-700">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <button className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs flex items-center space-x-1 text-slate-700">
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Category Sidebar */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 h-fit space-y-1">
                <h4 className="font-bold text-slate-800 text-sm mb-3">Categories</h4>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Listing Grid */}
              <div className="md:col-span-3 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {marketplaceProducts
                    .filter(p => selectedCategory === 'All Categories' || p.category === selectedCategory)
                    .map((product) => (
                      <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
                        <div>
                          <div className="relative h-36 bg-slate-100 flex items-center justify-center">
                            <img 
                              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80" 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                            <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:text-red-500">
                              <Heart size={14} />
                            </button>
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-slate-900 text-sm">{product.title}</h4>
                            <p className="text-[10px] text-slate-500 mb-2">{product.subtitle}</p>
                            <p className="text-emerald-700 font-extrabold text-base">{product.price}</p>
                          </div>
                        </div>
                        <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1">
                          <p 
                            onClick={() => setActiveTab('supplier-profile')}
                            className="text-[11px] font-semibold text-slate-700 hover:text-emerald-700 cursor-pointer truncate"
                          >
                            🏢 {product.vendor}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">📍 {product.location}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* View More Bar */}
                <div className="text-center pt-4">
                  <button className="text-emerald-700 font-bold text-sm hover:underline inline-flex items-center space-x-1">
                    <span>View More Products</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PAGE 3: FIND MY PLANT (MAP VIEW) */}
        {activeTab === 'plant-map' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Find My Plant</h2>
                <p className="text-xs text-slate-500">Explore CBG plants across India on our interactive directory map.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Map Filter Options */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs">
                    <option>All States</option>
                    <option>Haryana</option>
                    <option>Punjab</option>
                    <option>Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Capacity (TPD)</label>
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Min" className="w-1/2 border rounded p-1.5 text-xs bg-slate-50" />
                    <input type="text" placeholder="Max" className="w-1/2 border rounded p-1.5 text-xs bg-slate-50" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Feedstock Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs">
                    <option>All Feedstocks</option>
                    <option>Press Mud</option>
                    <option>Paddy Straw</option>
                    <option>Cattle Dung</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Technology</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs">
                    <option>All Technologies</option>
                    <option>Anaerobic Digestion + PSA</option>
                    <option>CSTR</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Commissioning Year</label>
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Min Year" className="w-1/2 border rounded p-1.5 text-xs bg-slate-50" />
                    <input type="text" placeholder="Max Year" className="w-1/2 border rounded p-1.5 text-xs bg-slate-50" />
                  </div>
                </div>

                <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded text-xs">
                  Apply Filters
                </button>
                <button className="w-full bg-slate-100 text-slate-600 font-semibold py-1.5 rounded text-xs">
                  Reset
                </button>
              </div>

              {/* Mock Map Area */}
              <div className="lg:col-span-3 space-y-4">
                <div className="relative bg-emerald-950/10 border border-slate-300 rounded-xl min-h-[460px] overflow-hidden flex items-center justify-center p-4">
                  {/* Geographic Background Placeholder */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                    alt="Map Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />

                  {/* Interactive Map Pins (Static Simulation) */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => setSelectedPlant({ name: 'IOCL CBG Plant, Panipat', capacity: '12 TPD', feedstock: 'Press Mud, Cow Dung', technology: 'Anaerobic Digestion + PSA', commissioned: '2023', epc: 'Deutsche Energy', offtaker: 'IOCL', status: 'Operational' })}>
                    <div className="bg-emerald-700 text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      <MapPin size={20} />
                    </div>
                  </div>

                  {/* Floating Plant Info Box */}
                  <div className="absolute right-4 bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl max-w-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{selectedPlant.name}</h4>
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1">
                          ✓ Verified
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Capacity</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.capacity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Feedstock</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.feedstock}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Technology</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.technology}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Commissioned</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.commissioned}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">EPC Company</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.epc}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Offtaker</span>
                        <span className="font-semibold text-slate-700">{selectedPlant.offtaker}</span>
                      </div>
                    </div>

                    <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Lower Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-medium">Operational</p>
                    <p className="text-2xl font-black text-slate-900">118</p>
                  </div>
                  <div className="bg-white p-4 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-medium">Under Construction</p>
                    <p className="text-2xl font-black text-slate-900">37</p>
                  </div>
                  <div className="bg-white p-4 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-medium">Planned</p>
                    <p className="text-2xl font-black text-slate-900">56</p>
                  </div>
                  <div className="bg-white p-4 border border-slate-200 rounded-xl text-center">
                    <p className="text-xs text-slate-500 font-medium">Total Plants</p>
                    <p className="text-2xl font-black text-slate-900">211</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* PAGE 4: SUPPLIER PROFILE PAGE */}
        {activeTab === 'supplier-profile' && (
          <div className="space-y-6">
            
            {/* Header / Supplier Banner */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center text-emerald-800 font-black text-2xl">
                    GREAN
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-bold text-slate-900">GreenGas Solutions Pvt. Ltd.</h2>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <CheckCircle size={10} />
                        <span>Verified Supplier</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                      <MapPin size={12} />
                      <span>Pune, Maharashtra, India</span>
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      10+ Years in Industry | 200+ Projects Completed
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-bold">
                        Contact Supplier
                      </button>
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold">
                        Send RFQ
                      </button>
                      <button className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold">
                        ♡ Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rating Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full md:w-64 space-y-2">
                  <p className="text-xs text-slate-500 font-semibold">Supplier Rating</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-slate-900">4.7</span>
                    <div className="flex text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-[10px] text-slate-400">(128 Reviews)</span>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center space-x-2">
                      <span>5 Star</span>
                      <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[74%]"></div>
                      </div>
                      <span>74%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>4 Star</span>
                      <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[16%]"></div>
                      </div>
                      <span>16%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sub Navigation */}
              <div className="flex space-x-6 border-b border-slate-200 mt-6 text-xs font-bold text-slate-600">
                <button className="pb-2 border-b-2 border-emerald-700 text-emerald-800">About Us</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-emerald-700">Products (24)</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-emerald-700">Services (12)</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-emerald-700">Projects</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-emerald-700">Certifications</button>
                <button className="pb-2 border-b-2 border-transparent hover:text-emerald-700">Reviews (128)</button>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">About GreenGas Solutions</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    GreenGas Solutions is a leading provider of biogas upgrading, gas purification and compression systems. 
                    We offer end-to-end solutions for CBG plants across India with proven technology and reliable support.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-slate-100 py-4">
                  <div>
                    <span className="text-slate-400 block mb-1">Year Established</span>
                    <span className="font-bold text-slate-800">2013</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Nature of Business</span>
                    <span className="font-bold text-slate-800">Manufacturer, Exporter, Service Provider</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Key Products</span>
                    <span className="font-bold text-slate-800">PSA Systems, CO2 Removal, H2S Scrubbers, Compressors</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Certifications</span>
                    <span className="font-bold text-slate-800">ISO 9001:2015, CE, PED, MSME</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Contact Info */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Contact Details</h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <p className="flex items-center space-x-2">
                    <Phone size={14} className="text-slate-400" />
                    <span>+91 98765 43210</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail size={14} className="text-slate-400" />
                    <span>sales@greengassolutions.com</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Globe size={14} className="text-slate-400" />
                    <span>www.greengassolutions.com</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <MapPin size={14} className="text-slate-400 mt-0.5" />
                    <span>S. No. 123, Chakan MIDC, Pune - 410501, Maharashtra, India</span>
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PAGE 5: ENGINEERING CALCULATORS PAGE */}
        {activeTab === 'calculators' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Left Side Navigation Menu */}
              <div className="bg-emerald-900 text-white rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-sm mb-4 border-b border-emerald-800 pb-2">Calculators</h3>
                {[
                  'Biogas Yield Calculator',
                  'Methane Production Calculator',
                  'Digester Volume Calculator',
                  'HRT Calculator',
                  'O&M Calculator',
                  'C/N Ratio Calculator',
                  'Feedstock Mixing Calculator'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCalculatorType(item)}
                    className={`w-full text-left px-3 py-2 rounded text-xs font-semibold transition-colors ${
                      calculatorType === item
                        ? 'bg-emerald-700 text-white'
                        : 'text-emerald-200 hover:bg-emerald-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Main Interactive Form Area */}
              <div className="md:col-span-3 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Form Component */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm">{calculatorType}</h3>
                    <p className="text-xs text-slate-500">Calculate estimated biogas yield from different feedstocks.</p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Feedstock Type</label>
                        <select 
                          value={feedstockType} 
                          onChange={(e) => setFeedstockType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs"
                        >
                          <option>Cattle Dung</option>
                          <option>Press Mud</option>
                          <option>Poultry Litter</option>
                          <option>Food Waste</option>
                          <option>Agri Residue</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Feedstock Quantity (MT/day)</label>
                        <input 
                          type="number" 
                          value={feedstockQty} 
                          onChange={(e) => setFeedstockQty(Number(e.target.value))}
                          className="w-full border border-slate-200 rounded p-2 text-xs bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">VS (Volatile Solids %)</label>
                        <input 
                          type="number" 
                          value={vsPercentage} 
                          onChange={(e) => setVsPercentage(Number(e.target.value))}
                          className="w-full border border-slate-200 rounded p-2 text-xs bg-slate-50"
                        />
                      </div>

                      <button 
                        onClick={handleCalculate}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded text-xs transition-colors"
                      >
                        Calculate
                      </button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm">Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">Estimated Biogas Yield</span>
                        <span className="text-2xl font-black text-emerald-800">{yieldResult.yield}</span>
                        <span className="text-[10px] text-slate-500 block">m³/day</span>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">Methane Content</span>
                        <span className="text-2xl font-black text-emerald-800">{yieldResult.methane}</span>
                        <span className="text-[10px] text-slate-500 block">%</span>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">Estimated Methane Yield</span>
                        <span className="text-2xl font-black text-emerald-800">{yieldResult.methaneVolume}</span>
                        <span className="text-[10px] text-slate-500 block">m³ CH₄/day</span>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">Energy Potential</span>
                        <span className="text-2xl font-black text-emerald-800">{yieldResult.energy}</span>
                        <span className="text-[10px] text-slate-500 block">kWh/day</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Feedstock Reference Table */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Feedstock Reference Guide</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                          <th className="p-2">Feedstock</th>
                          <th className="p-2">Biogas Yield (m³/kg VS)</th>
                          <th className="p-2">Methane Content (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr><td className="p-2 font-semibold">Cattle Dung</td><td className="p-2">0.35 - 0.45</td><td className="p-2">55 - 65</td></tr>
                        <tr><td className="p-2 font-semibold">Press Mud</td><td className="p-2">0.45 - 0.60</td><td className="p-2">60 - 65</td></tr>
                        <tr><td className="p-2 font-semibold">Poultry Litter</td><td className="p-2">0.50 - 0.70</td><td className="p-2">60 - 65</td></tr>
                        <tr><td className="p-2 font-semibold">Food Waste</td><td className="p-2">0.60 - 0.80</td><td className="p-2">55 - 60</td></tr>
                        <tr><td className="p-2 font-semibold">Agri Residue</td><td className="p-2">0.30 - 0.40</td><td className="p-2">50 - 55</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* PAGE 6: JOBS & TRAINING PAGE */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-emerald-900 text-white rounded-xl p-8 text-center space-y-3">
              <h2 className="text-2xl font-extrabold">Bioenergy Career & Talent Network</h2>
              <p className="text-xs text-emerald-200 max-w-lg mx-auto">
                Explore specialized career opportunities, professional certifications, and hands-on workshops tailored for the biogas and clean energy sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Senior Process Engineer - CBG', company: 'Praj Industries', loc: 'Pune, MH', type: 'Full-time' },
                { title: 'Plant Operations Manager', company: 'IOGCL', loc: 'Panipat, HR', type: 'Full-time' },
                { title: 'Biogas Technical Specialist', company: 'GreenGas Solutions', loc: 'Remote', type: 'Contract' }
              ].map((job, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 hover:shadow-md transition-shadow">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{job.type}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                  <p className="text-xs text-slate-500">{job.company} • {job.loc}</p>
                  <button className="w-full bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-700 font-bold py-2 rounded text-xs transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Shared Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-12 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <span className="text-white font-bold text-base block mb-2">Urja Mitra</span>
            <p className="text-[11px] text-slate-400">
              India's unified B2B ecosystem connecting the biogas, CBG, and bioenergy industry.
            </p>
          </div>
          <div>
            <span className="text-white font-semibold block mb-2">Marketplace</span>
            <ul className="space-y-1">
              <li>Equipment</li>
              <li>Spare Parts</li>
              <li>Feedstock</li>
            </ul>
          </div>
          <div>
            <span className="text-white font-semibold block mb-2">Platform</span>
            <ul className="space-y-1">
              <li>Find My Plant</li>
              <li>Calculators</li>
              <li>Knowledge Hub</li>
            </ul>
          </div>
          <div>
            <span className="text-white font-semibold block mb-2">Contact</span>
            <p className="text-[11px] text-slate-400">support@urjamitra.in</p>
          </div>
        </div>
      </footer>

    </div>
  );
}