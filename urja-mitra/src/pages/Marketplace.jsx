import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  MapPin, 
  CheckCircle, 
  ExternalLink,
  Tag
} from 'lucide-react';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Categories', 'Digesters', 'PSA Systems', 'Gas Compressors', 'Gas Holders', 
    'Blowers', 'Pumps', 'Valves', 'H2S Scrubbers', 'CO2 Removal Systems', 
    'Gas Analyzers', 'Instruments & Sensors'
  ];

  const products = [
    { id: 1, title: 'Skid-Mounted PSA System', subtitle: 'Membrane / 500 Nm³/hr', price: '₹18,50,000', vendor: 'GreenGas Solutions', location: 'Pune, Maharashtra', category: 'PSA Systems', verified: true, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'High-Pressure Biogas Compressor', subtitle: 'Oil-Free / 250 Bar', price: '₹3,75,000', vendor: 'AirTech Engineers', location: 'Vadodara, Gujarat', category: 'Gas Compressors', verified: true, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Cylindrical Digester Tank', subtitle: '500 m³ / Glass-Fused Steel', price: '₹4,80,000', vendor: 'BioRise India', location: 'Hyderabad, Telangana', category: 'Digesters', verified: false, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Double Membrane Gas Holder', subtitle: '1000 m³ / UV Resistant', price: '₹2,10,000', vendor: 'Gastech India', location: 'Lucknow, UP', category: 'Gas Holders', verified: true, image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80' },
    { id: 5, title: 'Biological H2S Scrubber', subtitle: 'Trickling Bed / High Efficiency', price: '₹1,25,000', vendor: 'PureGas Solutions', location: 'Chennai, TN', category: 'H2S Scrubbers', verified: true, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80' },
    { id: 6, title: 'Roots Biogas Blower Skid', subtitle: 'Explosion Proof Motor', price: '₹88,000', vendor: 'PowerTech Systems', location: 'Coimbatore, TN', category: 'Gas Compressors', verified: false, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Equipment Marketplace</h2>
          <p className="text-xs text-brand-muted">Source new, pre-owned & spare machinery from verified OEMs</p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input 
              type="text" 
              placeholder="Search equipment or brand..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          <select className="bg-brand-card border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-muted focus:text-white focus:outline-none">
            <option>All Locations</option>
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Tamil Nadu</option>
          </select>

          <button className="bg-brand-card border border-brand-border hover:border-brand-accent/50 p-2 text-brand-muted hover:text-white rounded-xl transition-colors">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Sidebar + Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Category Sidebar (1 Col) */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4 h-fit space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider px-2 mb-2">Categories</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20' 
                    : 'text-brand-muted hover:text-white hover:bg-brand-bg/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (3 Cols) */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center text-xs text-brand-muted">
            <span>Showing <strong className="text-white">{filteredProducts.length}</strong> items</span>
            <select className="bg-brand-card border border-brand-border rounded-lg px-2.5 py-1 text-xs text-brand-muted focus:text-white focus:outline-none">
              <option>Sort by: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-accent/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-40 bg-brand-bg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                    />
                    <button className="absolute top-3 right-3 p-1.5 bg-brand-card/80 backdrop-blur rounded-xl text-brand-muted hover:text-rose-400 border border-brand-border transition-colors">
                      <Heart size={14} />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-brand-card/90 backdrop-blur text-brand-muted text-[10px] font-semibold px-2 py-0.5 rounded-md border border-brand-border flex items-center gap-1">
                      <Tag size={10} className="text-brand-accent" /> {product.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-white text-sm leading-snug group-hover:text-brand-accent transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-brand-muted leading-relaxed">{product.subtitle}</p>
                    <p className="text-lg font-extrabold text-white tracking-tight">{product.price}</p>
                  </div>
                </div>

                {/* Footer Vendor Details */}
                <div className="p-4 border-t border-brand-border/60 bg-brand-bg/40 flex justify-between items-center text-[11px]">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-200 flex items-center gap-1">
                      {product.vendor}
                      {product.verified && <CheckCircle size={12} className="text-emerald-400" />}
                    </p>
                    <p className="text-brand-muted text-[10px] flex items-center gap-0.5">
                      <MapPin size={10} /> {product.location}
                    </p>
                  </div>
                  <button className="p-2 bg-brand-card hover:bg-brand-accent hover:text-white text-brand-muted border border-brand-border rounded-xl transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}