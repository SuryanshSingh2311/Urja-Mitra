import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Building2, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  MapPin 
} from 'lucide-react';
import { useRFQStore } from '../store/useRFQStore';

export default function Dashboard() {
  const navigate = useNavigate();
  // Read live RFQs and modal action from Zustand store
  const { rfqs, openModal } = useRFQStore();

  // Metrics dynamically bind to live store length
  const metrics = [
    { title: 'Total CBG Production', value: '450 TPD', change: '+12.5%', isPositive: true, icon: Zap },
    { title: 'Active RFQs', value: `${rfqs.length} Active`, change: `+${rfqs.length}`, isPositive: true, icon: FileText },
    { title: 'Listed Plants', value: '211 Listed', change: '+4.2%', isPositive: true, icon: Building2 },
    { title: 'Verified Vendors', value: '520 Vendors', change: '+15.3%', isPositive: true, icon: ShieldCheck },
  ];

  // Quick Plant Directory Snapshot
  const topPlants = [
    { name: 'IOCL Panipat CBG Facility', capacity: '12 TPD', feedstock: 'Press Mud, Dung', location: 'Panipat, Haryana' },
    { name: 'Praj Industries Bio-Refinery', capacity: '20 TPD', feedstock: 'Rice Straw', location: 'Anand, Gujarat' },
    { name: 'EverEnviro CBG Project', capacity: '15 TPD', feedstock: 'Municipal Solid Waste', location: 'Indore, MP' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-brand-accent/10 text-brand-accent text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-brand-accent/20">
              V1.0 Operational
            </span>
            <span className="text-xs text-brand-muted">Welcome back</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Bharat UrjaSetu Overview</h2>
          <p className="text-xs text-brand-muted max-w-xl">
            Monitor real-time bioenergy procurement, active plant installations, and commercial bids across India.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={() => navigate('/map')}
            className="bg-brand-card hover:bg-brand-border text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-brand-border transition-colors"
          >
            Explore Map
          </button>
          <button 
            onClick={openModal}
            className="bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-accent/20 transition-colors"
          >
            Post Requirement
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, idx) => (
          <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-accent/40 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs text-brand-muted font-medium">{item.title}</span>
              <div className="p-2 bg-brand-bg text-brand-accent rounded-xl border border-brand-border">
                <item.icon size={18} />
              </div>
            </div>
            
            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-white tracking-tight">{item.value}</h3>
              <span className={`text-[11px] font-semibold flex items-center ${item.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                <TrendingUp size={12} className="mr-0.5" />
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: RFQ Table & Quick Plant Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent RFQs Table */}
        <div className="lg:col-span-2 bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-brand-border">
            <div>
              <h3 className="text-sm font-bold text-white">Live Procurement RFQs</h3>
              <p className="text-[11px] text-brand-muted">Active equipment & service tenders ({rfqs.length} Total)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted font-medium">
                  <th className="py-2.5 px-3">Req ID / Title</th>
                  <th className="py-2.5 px-3">Buyer</th>
                  <th className="py-2.5 px-3">Est. Value</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-brand-bg/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{rfq.title}</div>
                      <div className="text-[10px] text-brand-muted">{rfq.id} • {rfq.category}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200">
                        {rfq.privacy === 'Anonymized' ? '🔒 Anonymized Buyer' : rfq.buyer}
                      </div>
                      <div className="text-[10px] text-brand-muted flex items-center gap-0.5">
                        <MapPin size={10} /> {rfq.location}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-brand-accent">{rfq.budget}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        rfq.status === 'Open' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : rfq.status === 'Awarded'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured CBG Plants Sidebar Panel */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-brand-border">
            <div>
              <h3 className="text-sm font-bold text-white">Featured CBG Plants</h3>
              <p className="text-[11px] text-brand-muted">Operational installations across India</p>
            </div>
          </div>

          <div className="space-y-3">
            {topPlants.map((plant, idx) => (
              <div key={idx} className="p-3.5 bg-brand-bg/60 rounded-xl border border-brand-border/70 hover:border-brand-accent/30 transition-all space-y-1.5">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-white leading-tight">{plant.name}</h4>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                    {plant.capacity}
                  </span>
                </div>
                <div className="text-[11px] text-brand-muted flex items-center justify-between">
                  <span>Feedstock: <strong className="text-slate-300">{plant.feedstock}</strong></span>
                </div>
                <div className="text-[10px] text-brand-muted flex items-center gap-1 pt-1 border-t border-brand-border/40">
                  <MapPin size={10} className="text-brand-accent" />
                  <span>{plant.location}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/map')}
            className="w-full bg-brand-bg hover:bg-brand-border text-brand-muted hover:text-white font-semibold py-2 rounded-xl text-xs border border-brand-border transition-colors flex items-center justify-center gap-1"
          >
            <span>Explore Full Plant Directory Map</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>

    </div>
  );
}