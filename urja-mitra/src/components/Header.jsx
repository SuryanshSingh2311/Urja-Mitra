import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Plus, User, LogOut } from 'lucide-react';
import { useRFQStore } from '../store/useRFQStore';
import { useAuthStore } from '../store/useAuthStore';
import AuthModal from './AuthModal';

export default function Header() {
  const openModal = useRFQStore((state) => state.openModal);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <>
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
          <button 
            onClick={openModal} 
            className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-md shadow-brand-accent/20"
          >
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

          {/* Dynamic Authentication Controls */}
          <div className="flex items-center pl-3 border-l border-brand-border">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 bg-brand-card border border-brand-border px-3 py-1.5 rounded-xl">
                <div className="flex items-center space-x-2 text-xs text-white">
                  <User size={14} className="text-brand-accent" />
                  <span className="font-medium max-w-[120px] truncate">{user?.email}</span>
                  <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded-md font-semibold uppercase">
                    {user?.role || 'User'}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="text-brand-muted hover:text-red-400 transition-colors p-1"
                  title="Log Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-brand-card hover:bg-brand-card/80 border border-brand-border text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}