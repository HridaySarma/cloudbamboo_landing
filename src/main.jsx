import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Console from './components/Console.jsx'
import TermsOfService from './components/TermsOfService.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import RefundPolicy from './components/RefundPolicy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/console" element={<Console />} />
        <Route path="/terms-and-conditions" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
