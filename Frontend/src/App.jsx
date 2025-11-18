import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import our components
import Navbar from './components/Navbar';

// Import ALL our pages
import HomePage from './pages/HomePage';
import PatientListPage from './pages/PatientListPage';
import CreatePatientPage from './pages/CreatePatientPage';
import EditPatientPage from './pages/EditPatientPage';
import HospitalListPage from './pages/HospitalListPage';
import CreateHospitalPage from './pages/CreateHospitalPage';
import EditHospitalPage from './pages/EditHospitalPage';
import ClaimListPage from './pages/ClaimListPage';
import ClaimDetailsPage from './pages/ClaimDetailsPage';
import SubmitClaimPage from './pages/SubmitClaimPage';
import PolicyListPage from './pages/PolicyListPage';
import CreatePolicyPage from './pages/CreatePolicyPage';
import EditPolicyPage from './pages/EditPolicyPage'; // <-- NEW

// Layout
function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="/patients" element={<PatientListPage />} />
        <Route path="/patients/new" element={<CreatePatientPage />} />
        <Route path="/patients/edit/:id" element={<EditPatientPage />} />

        <Route path="/hospitals" element={<HospitalListPage />} />
        <Route path="/hospitals/new" element={<CreateHospitalPage />} />
        <Route path="/hospitals/edit/:id" element={<EditHospitalPage />} />
        
        <Route path="/claims" element={<ClaimListPage />} />
        <Route path="/claims/:id" element={<ClaimDetailsPage />} />
        <Route path="/submit-claim" element={<SubmitClaimPage />} />
        
        <Route path="/policies" element={<PolicyListPage />} />
        <Route path="/policies/new" element={<CreatePolicyPage />} />
        <Route path="/policies/edit/:id" element={<EditPolicyPage />} /> {/* <-- NEW ROUTE */}
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;