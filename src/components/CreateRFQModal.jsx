import React, { useState } from 'react';
import { X, Send, Shield, Info } from 'lucide-react';
import { useRFQStore } from '../store/useRFQStore';

export default function CreateRFQModal() {
  const { isModalOpen, closeModal, addRFQ } = useRFQStore();

  const [formData, setFormData] = useState({
    title: '',
    category: 'PSA Systems',
    buyer: '',
    location: 'Haryana',
    budget: '',
    quantity: '',
    deadline: '',
    description: '',
    privacy: 'Public'
  });

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.buyer || !formData.budget) return;
    addRFQ(formData);
    setFormData({
      title: '',
      category: 'PSA Systems',
      buyer: '',
      location: 'Haryana',
      budget: '',
      quantity: '',
      deadline: '',
      description: '',
      privacy: 'Public'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-brand-border">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send size={18} className="text-brand-accent" />
              <span>Post Requirement (RFQ)</span>
            </h3>
            <p className="text-xs text-brand-muted">Submit your procurement details to verified suppliers</p>
          </div>
          <button 
            onClick={closeModal} 
            className="p-1.5 text-brand-muted hover:text-white rounded-xl bg-brand-bg/60 border border-brand-border transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-brand-muted block mb-1">Requirement Title *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. 500 Nm³/hr Skid Mounted PSA System" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent placeholder-brand-muted/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-brand-muted block mb-1">Category *</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
              >
                <option>PSA Systems</option>
                <option>Gas Compressors</option>
                <option>Digesters</option>
                <option>Gas Holders</option>
                <option>H2S Scrubbers</option>
                <option>Feedstock</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-brand-muted block mb-1">Buyer / Company Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Praj Industries / Private Owner" 
                value={formData.buyer}
                onChange={(e) => setFormData({ ...formData, buyer: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent placeholder-brand-muted/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-brand-muted block mb-1">Plant Location *</label>
              <select 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
              >
                <option>Haryana</option>
                <option>Gujarat</option>
                <option>Maharashtra</option>
                <option>Uttar Pradesh</option>
                <option>Punjab</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-brand-muted block mb-1">Estimated Budget *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. ₹1.2 Cr" 
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent placeholder-brand-muted/60"
              />
            </div>

            <div>
              <label className="font-semibold text-brand-muted block mb-1">Submission Deadline</label>
              <input 
                type="date" 
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-brand-muted block mb-1">Technical Specifications / Notes</label>
            <textarea 
              rows={3}
              placeholder="Mention operational pressure (bar), purity %, flow rates, or warranty requirements..." 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent placeholder-brand-muted/60 resize-none"
            />
          </div>

          {/* Privacy Toggle Box */}
          <div className="p-3 bg-brand-bg/60 rounded-xl border border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-accent" />
              <div>
                <p className="font-semibold text-white">Anonymize Buyer Profile</p>
                <p className="text-[10px] text-brand-muted">Hide company details until shortlisted</p>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={formData.privacy === 'Anonymized'}
              onChange={(e) => setFormData({ ...formData, privacy: e.target.checked ? 'Anonymized' : 'Public' })}
              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={closeModal}
              className="px-4 py-2 bg-brand-bg hover:bg-brand-border text-brand-muted hover:text-white rounded-xl border border-brand-border font-semibold transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold rounded-xl shadow-lg shadow-brand-accent/20 transition-all"
            >
              Publish RFQ
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}