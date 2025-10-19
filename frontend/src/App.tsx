import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/NavBar';
import Landing from './pages/Landing';
import Features from './pages/Features';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import About from './pages/About';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}