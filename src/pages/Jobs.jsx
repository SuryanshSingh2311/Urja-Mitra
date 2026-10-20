import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle, 
  X, 
  Send,
  DollarSign,
  GraduationCap
} from 'lucide-react';

export default function Jobs() {
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Job Postings Dataset
  const jobListings = [
    {
      id: 1,
      title: 'Senior Process Engineer - CBG & Biogas',
      company: 'Praj Industries Ltd.',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      experience: '5-8 Years',
      salary: '₹14 - ₹18 LPA',
      tags: ['Anaerobic Digestion', 'PSA Systems', 'PFD / P&ID'],
      posted: '2 days ago',
      verified: true,
      description: 'Lead process engineering for commercial 12-30 TPD CBG plants. Experience in anaerobic digestion modeling and gas purification required.'
    },
    {
      id: 2,
      title: 'Plant Operations Manager',
      company: 'IOCL Panipat Unit',
      location: 'Panipat, Haryana',
      type: 'Full-time',
      experience: '8-12 Years',
      salary: '₹18 - ₹24 LPA',
      tags: ['Feedstock Management', 'SCADA / PLC', 'Safety Standards'],
      posted: '1 day ago',
      verified: true,
      description: 'Oversee daily operations, preventative maintenance, and feedstock throughput for a 12 TPD compressed biogas plant.'
    },
    {
      id: 3,
      title: 'Biogas Technical Specialist (Consultant)',
      company: 'GreenGas Solutions Pvt Ltd',
      location: 'Remote / Pune',
      type: 'Contract',
      experience: '3-6 Years',
      salary: '₹80,000 / month',
      tags: ['Commissioning', 'H2S Scrubbing', 'O&M'],
      posted: 'Just now',
      verified: true,
      description: 'Provide technical consultancy for biological H2S scrubber setup and troubleshooting across client sites in Western India.'
    },
    {
      id: 4,
      title: 'Feedstock Supply Chain Specialist',
      company: 'Avadh Sugar & Energy',
      location: 'Sitapur, Uttar Pradesh',
      type: 'Full-time',
      experience: '2-5 Years',
      salary: '₹7 - ₹10 LPA',
      tags: ['Press Mud Logistics', 'Agri Residue', 'Procurement'],
      posted: '3 days ago',
      verified: true,
      description: 'Manage seasonal press mud and agricultural waste procurement and transport logistics for sugar mill bio-refineries.'
    },
    {
      id: 5,
      title: 'Bioenergy Process Intern',
      company: 'BioRise India',
      location: 'Hyderabad, Telangana',
      type: 'Internship',
      experience: 'Freshers',
      salary: '₹25,000 / month',
      tags: ['Biogas Yield Lab', 'Data Logging', 'Chemical Analysis'],
      posted: '4 days ago',
      verified: false,
      description: 'Assist engineering teams in volatile solids (VS) chemical testing, pilot-scale digester data logging, and feedstock trial reports.'
    }
  ];

  // Filter Pipeline
  const filteredJobs = jobListings.filter(job => {
    const matchType = selectedType === 'All Types' || job.type === selectedType;
    const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setSelectedJobForApply(null);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Bioenergy Career & Talent Network</h2>
          <p className="text-xs text-brand-muted">Specialized career opportunities, consulting roles, and talent sourcing for clean energy</p>
        </div>

        <button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-accent/20 transition-all self-start md:self-auto">
          <Plus size={16} />
          <span>Post Job Opening</span>
        </button>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-card border border-brand-border p-4 rounded-2xl">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input 
            type="text" 
            placeholder="Search role, skill, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-bg border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>

        {/* Job Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['All Types', 'Full-time', 'Contract', 'Internship'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20'
                  : 'bg-brand-bg text-brand-muted hover:text-white border border-brand-border'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-accent/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Header Info */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-brand-accent transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 size={12} className="text-brand-muted" />
                    <span>{job.company}</span>
                    {job.verified && <CheckCircle size={12} className="text-emerald-400" />}
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  job.type === 'Full-time' 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                    : job.type === 'Contract'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {job.type}
                </span>
              </div>

              {/* Meta Stats Badges */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-brand-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-brand-accent" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} /> {job.experience}
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <DollarSign size={12} /> {job.salary}
                </span>
              </div>

              <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="bg-brand-bg border border-brand-border/70 text-slate-300 text-[10px] px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between pt-3 border-t border-brand-border/60 text-[11px]">
              <span className="text-brand-muted flex items-center gap-1">
                <Clock size={12} /> {job.posted}
              </span>
              <button 
                onClick={() => setSelectedJobForApply(job)}
                className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-brand-accent/20"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            
            <div className="flex justify-between items-start pb-3 border-b border-brand-border">
              <div>
                <h3 className="text-base font-bold text-white">Apply for {selectedJobForApply.title}</h3>
                <p className="text-xs text-brand-muted">{selectedJobForApply.company} • {selectedJobForApply.location}</p>
              </div>
              <button 
                onClick={() => setSelectedJobForApply(null)} 
                className="p-1.5 text-brand-muted hover:text-white rounded-xl bg-brand-bg/60 border border-brand-border transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle size={24} />
                </div>
                <h4 className="text-base font-bold text-white">Application Sent!</h4>
                <p className="text-xs text-brand-muted">Your profile and application details have been submitted to {selectedJobForApply.company}.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-brand-muted block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    defaultValue="Arthur Taylor"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-brand-muted block mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      defaultValue="arthur@urjamitra.in"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-brand-muted block mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-brand-muted block mb-1">Years of Relevant Bioenergy Experience</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5 Years in PSA Systems & CBG"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="font-semibold text-brand-muted block mb-1">Cover Note / Technical Expertise Summary</label>
                  <textarea 
                    rows={3} 
                    placeholder="Mention relevant plant design experience, certifications, or commissioning projects..."
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setSelectedJobForApply(null)}
                    className="px-4 py-2 bg-brand-bg hover:bg-brand-border text-brand-muted hover:text-white rounded-xl border border-brand-border font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-1.5 transition-all"
                  >
                    <Send size={14} />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}