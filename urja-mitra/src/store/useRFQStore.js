import { create } from 'zustand';

export const useRFQStore = create((set) => ({
  rfqs: [
    { id: 'RFQ-1042', title: '500 Nm³/hr PSA System Skid', category: 'PSA Systems', buyer: 'IOCL Panipat Unit', location: 'Haryana', budget: '₹1.8 Cr', quantity: '1 Unit', deadline: '2026-11-15', status: 'Open', privacy: 'Public' },
    { id: 'RFQ-1041', title: 'High-Pressure Biogas Compressor', category: 'Gas Compressors', buyer: 'BioRise India', location: 'Gujarat', budget: '₹45 Lakhs', quantity: '2 Units', deadline: '2026-10-30', status: 'In Review', privacy: 'Public' },
    { id: 'RFQ-1040', title: 'Double Membrane Gas Holder (1000m³)', category: 'Gas Holders', buyer: 'GreenGas Pvt Ltd', location: 'Maharashtra', budget: '₹22 Lakhs', quantity: '1 Unit', deadline: '2026-11-05', status: 'Open', privacy: 'Anonymized' },
    { id: 'RFQ-1039', title: 'Press Mud Feedstock Supply', category: 'Feedstock', buyer: 'Avadh Sugar & Energy', location: 'Uttar Pradesh', budget: 'Contract', quantity: '100 MT/day', deadline: '2026-12-01', status: 'Awarded', privacy: 'Public' },
  ],

  isModalOpen: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  addRFQ: (newRFQ) => set((state) => ({
    rfqs: [
      {
        id: `RFQ-${1043 + state.rfqs.length}`,
        status: 'Open',
        ...newRFQ
      },
      ...state.rfqs
    ],
    isModalOpen: false
  }))
}));