import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { X, Lock, Mail, User, Building } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    company_name: '',
    role: 'Buyer'
  });

  const { login, signup, error, isLoading } = useAuthStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await signup(formData);
    }
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md p-6 relative space-y-4 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-brand-muted hover:text-white">
          <X size={18} />
        </button>

        <h3 className="text-lg font-bold text-white">{isLogin ? 'Login to Bharat UrjaSetu' : 'Create an Account'}</h3>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {!isLogin && (
            <>
              <div>
                <label className="text-brand-muted block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <label className="text-brand-muted block mb-1">Company / Organization</label>
                <input 
                  type="text" 
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <label className="text-brand-muted block mb-1">User Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="Buyer">Buyer (Bioenergy / Gas Purchaser)</option>
                  <option value="EPC_Vendor">EPC Vendor / Equipment Supplier</option>
                  <option value="Plant_Owner">Plant Owner / Developer</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-brand-muted block mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="text-brand-muted block mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-2.5 rounded-xl text-xs transition-colors mt-2"
          >
            {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-brand-accent font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}