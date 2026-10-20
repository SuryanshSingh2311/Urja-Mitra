import React from 'react';
import { Search, Bell, MessageSquare, Plus } from 'lucide-react';
import { useRFQStore } from '../store/useRFQStore';

export default function Header() {
  const openModal = useRFQStore((state) => state.openModal);
  return (
    <header className="h-16 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input 
          type="text" 
          placeholder="Search equipment, RFQs, suppliers..." 
          className="w-full bg-brand-card border border-brand-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
        />
      </div>

      {/* Action Buttons & User Profile */}
      <div className="flex items-center space-x-3">
        <button onClick={openModal} className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-md shadow-brand-accent/20">
          <Plus size={16} />
          <span>Post RFQ</span>
        </button>

        <button className="p-2 text-brand-muted hover:text-white bg-brand-card border border-brand-border rounded-xl transition-colors relative">
          <MessageSquare size={16} />
        </button>

        <button className="p-2 text-brand-muted hover:text-white bg-brand-card border border-brand-border rounded-xl transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 pl-3 border-l border-brand-border">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-xl object-cover border border-brand-accent/40"
          />
        </div>
      </div>
    </header>
  );
}