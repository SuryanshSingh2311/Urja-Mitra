import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  Calculator, 
  Briefcase, 
  ShieldCheck, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

export default function Sidebar() {
  const mainNav = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Find My Plant', path: '/plant-map', icon: MapPin },
    { name: 'Calculators', path: '/calculators', icon: Calculator },
    { name: 'Jobs & Careers', path: '/jobs', icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-brand-card border-r border-brand-border h-screen flex flex-col justify-between p-4 fixed left-0 top-0 z-40">
      <div className="space-y-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-10 h-10 bg-brand-accent text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-brand-accent/30">
            US
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Bharat UrjaSetu</h1>
            <p className="text-[10px] text-brand-muted font-medium">B2B Bioenergy Ecosystem</p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider px-3 mb-2">Main Menu</p>
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20'
                      : 'text-brand-muted hover:text-white hover:bg-brand-border/40'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Verified Status Banner */}
      <div className="space-y-4">
        <div className="p-3.5 bg-brand-bg/60 rounded-2xl border border-brand-border text-center space-y-2">
          <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <ShieldCheck size={18} />
          </div>
          <p className="text-xs font-bold text-white">Verified Tier 1</p>
          <p className="text-[10px] text-brand-muted leading-tight">Access live buyer RFQs & plant networks</p>
        </div>

        {/* System Settings Options */}
        <div className="pt-2 border-t border-brand-border/50 flex justify-around text-brand-muted">
          <button className="hover:text-white transition-colors p-2"><Settings size={16} /></button>
          <button className="hover:text-white transition-colors p-2"><HelpCircle size={16} /></button>
        </div>
      </div>
    </aside>
  );
}