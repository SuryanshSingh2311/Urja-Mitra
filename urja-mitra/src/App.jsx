import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import PlantMap from './pages/PlantMap';
import Calculators from './pages/Calculators';
import CreateRFQModal from './components/CreateRFQModal';
import Jobs from './pages/Jobs';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-brand-bg text-brand-text">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-64 flex flex-col">
          <Header />
          <main className="p-6 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/plant-map" element={<PlantMap />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/jobs" element={<Jobs />} />
            </Routes>
          </main>
        </div>

        {/* Global RFQ Modal */}
        <CreateRFQModal />
      </div>
      <div className="min-h-screen bg-brand-bg text-slate-100 flex flex-col font-sans">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<PlantMap />} />
            
            {/* Standalone Auth Routes redirecting to Modal on home */}
            <Route path="/login" element={<AuthPage defaultLogin={true} />} />
            <Route path="/signup" element={<AuthPage defaultLogin={false} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

  function AuthPage({ defaultLogin }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
