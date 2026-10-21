import React, { useState } from 'react';
import { 
  Calculator, 
  Zap, 
  Flame, 
  Gauge, 
  Info,
  Send,
  ArrowRight
} from 'lucide-react';
import { useRFQStore } from '../store/useRFQStore';

export default function Calculators() {
  const openModal = useRFQStore((state) => state.openModal);

  const [calculatorType, setCalculatorType] = useState('Biogas Yield Calculator');
  const [feedstockType, setFeedstockType] = useState('Cattle Dung');
  const [feedstockQty, setFeedstockQty] = useState(100); // MT/day

  // Technical Parameter Constants
  const FEEDSTOCK_PARAMS = {
    'Cattle Dung': { dm: 18, vs: 80, yieldVS: 0.38, methane: '55 - 60', ch4Ratio: 0.58 },
    'Press Mud': { dm: 25, vs: 75, yieldVS: 0.52, methane: '60 - 65', ch4Ratio: 0.62 },
    'Poultry Litter': { dm: 75, vs: 70, yieldVS: 0.48, methane: '60 - 65', ch4Ratio: 0.60 },
    'Food Waste': { dm: 10, vs: 85, yieldVS: 0.65, methane: '55 - 60', ch4Ratio: 0.58 },
    'Agri Residue': { dm: 85, vs: 82, yieldVS: 0.35, methane: '50 - 55', ch4Ratio: 0.54 }
  };

  const currentParam = FEEDSTOCK_PARAMS[feedstockType] || FEEDSTOCK_PARAMS['Cattle Dung'];
  const [vsOverride, setVsOverride] = useState(currentParam.vs);

  // Calculate results based on real chemical formulas
  // Daily Feedstock (MT) -> Total Solids (TS) -> Volatile Solids (VS) -> Biogas m3/day
  const dailyKg = feedstockQty * 1000;
  const tsKg = dailyKg * (currentParam.dm / 100);
  const vsKg = tsKg * (vsOverride / 100);
  const totalBiogas = vsKg * currentParam.yieldVS;
  const methaneVolume = totalBiogas * currentParam.ch4Ratio;
  const energyKWh = methaneVolume * 10; // ~10 kWh per m3 CH4

  const handleExportToRFQ = () => {
    openModal();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Engineering Calculators & Knowledge Hub</h2>
          <p className="text-xs text-brand-muted">Scientific estimation tools for plant design, feedstock yields, and energy sizing</p>
        </div>
      </div>

      {/* Main Tools Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Tool Selector Menu */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-4 h-fit space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
            <Calculator size={14} className="text-brand-accent" />
            <span>Select Calculator</span>
          </h3>
          <div className="space-y-1">
            {[
              'Biogas Yield Calculator',
              'Methane Production Calculator',
              'Digester Volume Calculator',
              'HRT Calculator',
              'O&M Calculator'
            ].map((item) => (
              <button
                key={item}
                onClick={() => setCalculatorType(item)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  calculatorType === item
                    ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20'
                    : 'text-brand-muted hover:text-white hover:bg-brand-bg/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs & Output Display */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Form Inputs Container */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">{calculatorType}</h3>
                <p className="text-xs text-brand-muted mt-0.5">Calculated using volatile solid (VS) conversion factors</p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-brand-muted block mb-1">Feedstock Category</label>
                  <select 
                    value={feedstockType} 
                    onChange={(e) => {
                      const newType = e.target.value;
                      setFeedstockType(newType);
                      setVsOverride(FEEDSTOCK_PARAMS[newType].vs);
                    }}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option>Cattle Dung</option>
                    <option>Press Mud</option>
                    <option>Poultry Litter</option>
                    <option>Food Waste</option>
                    <option>Agri Residue</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-brand-muted block mb-1">Feedstock Quantity (MT/day)</label>
                  <input 
                    type="number" 
                    value={feedstockQty} 
                    onChange={(e) => setFeedstockQty(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-brand-muted block mb-1">Dry Matter (DM %)</label>
                    <input 
                      type="text" 
                      disabled
                      value={`${currentParam.dm}%`}
                      className="w-full bg-brand-bg/50 border border-brand-border/60 rounded-xl p-2.5 text-brand-muted"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-brand-muted block mb-1">Volatile Solids (VS %)</label>
                    <input 
                      type="number" 
                      value={vsOverride}
                      onChange={(e) => setVsOverride(Number(e.target.value))}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-white focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="p-3 bg-brand-bg/40 rounded-xl border border-brand-border/60 text-[11px] text-brand-muted space-y-1">
                  <p>• Specific Yield: <strong className="text-slate-200">{currentParam.yieldVS} m³/kg VS</strong></p>
                  <p>• Methane Potential: <strong className="text-slate-200">{currentParam.methane}% CH₄</strong></p>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Display */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Live Estimation Results</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-bg/60 p-3.5 rounded-xl border border-brand-border text-center">
                    <span className="text-[10px] text-brand-muted font-semibold uppercase tracking-wider block">Total Biogas</span>
                    <span className="text-xl font-bold text-white tracking-tight">
                      {totalBiogas.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-brand-muted block">m³/day</span>
                  </div>

                  <div className="bg-brand-bg/60 p-3.5 rounded-xl border border-brand-border text-center">
                    <span className="text-[10px] text-brand-muted font-semibold uppercase tracking-wider block">Methane Content</span>
                    <span className="text-xl font-bold text-amber-400 tracking-tight">{currentParam.methane}</span>
                    <span className="text-[10px] text-brand-muted block">% CH₄</span>
                  </div>

                  <div className="bg-brand-bg/60 p-3.5 rounded-xl border border-brand-border text-center">
                    <span className="text-[10px] text-brand-muted font-semibold uppercase tracking-wider block">Pure Methane</span>
                    <span className="text-xl font-bold text-emerald-400 tracking-tight">
                      {methaneVolume.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-brand-muted block">m³ CH₄/day</span>
                  </div>

                  <div className="bg-brand-bg/60 p-3.5 rounded-xl border border-brand-border text-center">
                    <span className="text-[10px] text-brand-muted font-semibold uppercase tracking-wider block">Energy Potential</span>
                    <span className="text-xl font-bold text-brand-accent tracking-tight">
                      {energyKWh.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-brand-muted block">kWh/day</span>
                  </div>
                </div>
              </div>

              {/* Convert to RFQ Action Button */}
              <button 
                onClick={handleExportToRFQ}
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 transition-all"
              >
                <Send size={14} />
                <span>Convert Yield to RFQ Requirement</span>
              </button>
            </div>

          </div>

          {/* Reference Table */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-white text-sm">Bioenergy Conversion Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-border text-brand-muted">
                    <th className="py-2.5 px-3">Feedstock Type</th>
                    <th className="py-2.5 px-3">Dry Matter %</th>
                    <th className="py-2.5 px-3">VS (% of DM)</th>
                    <th className="py-2.5 px-3">Yield (m³/kg VS)</th>
                    <th className="py-2.5 px-3">CH₄ Content %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 text-slate-300">
                  {Object.entries(FEEDSTOCK_PARAMS).map(([name, param]) => (
                    <tr key={name} className="hover:bg-brand-bg/40">
                      <td className="py-2.5 px-3 font-semibold text-white">{name}</td>
                      <td className="py-2.5 px-3">{param.dm}%</td>
                      <td className="py-2.5 px-3">{param.vs}%</td>
                      <td className="py-2.5 px-3">{param.yieldVS}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">{param.methane}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}