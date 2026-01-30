import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Welcome } from './pages/Welcome';
import { Dashboard } from './pages/Dashboard';
import './index.css';

import Snowfall from 'react-snowfall';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ position: 'fixed', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 50 }}>
          <Snowfall
            color="#a5f3fc" // Light cyan/blue for a frosty look
            snowflakeCount={100}
            radius={[0.5, 3.0]} // Small to medium flakes
            speed={[0.5, 2.0]} // Gentle falling speed
            style={{ opacity: 0.6 }}
          />
        </div>
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
