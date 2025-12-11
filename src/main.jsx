import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Console from './components/Console.jsx'
import TermsOfService from './components/TermsOfService.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import RefundPolicy from './components/RefundPolicy.jsx'
import Services from './components/Services.jsx'

// Auth components
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './components/auth/Login.jsx'
import PhoneVerification from './components/auth/PhoneVerification.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import ProtectedRoute, { PublicRoute, PhoneVerificationRoute } from './components/auth/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<App />} />
          <Route path="/console" element={<Console />} />
          <Route path="/services" element={<Services />} />
          <Route path="/terms-and-conditions" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          
          {/* Auth pages */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/verify" 
            element={
              <PhoneVerificationRoute>
                <PhoneVerification />
              </PhoneVerificationRoute>
            } 
          />
          
          {/* Protected pages */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
