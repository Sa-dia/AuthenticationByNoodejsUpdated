// frontend/src/App.js

import React from 'react';
import { getToken } from './utils/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SURegisterForm from './components/SURegeisterForm';
import SULinkGenerator from './components/SULinkGenerator';
import SULoginForm from './components/SULoginForm';
import SUDashboard from './components/SUDashboard';
import DepartmentUpload from './components/superuser/DepartmentUpload';
import CsvToXmlTeacher from './components/superuser/CsvToXmlTeacher';
import SessionUpload from './components/superuser/SessionUpload';
import StudentUpload from './components/superuser/StudentUpload';
import ExamYearUpload from './components/superuser/ExamYearUpload';

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/su-login" />;
};


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/generate-su-link" element={<SULinkGenerator />} />
        <Route path="/su-register/:token" element={<SURegisterForm />} />
        <Route path="/su-login" element={<SULoginForm />} />
        <Route path="/su-dashboard" element={<PrivateRoute><SUDashboard /></PrivateRoute>}/>
        <Route path="/upload-student" element={<StudentUpload/>}/>
        <Route path="/upload-session" element={<SessionUpload/>}/>
        <Route path="/upload-department" element={<DepartmentUpload/>} /> 
        <Route path="/CsvToXmlTeacher" element={<CsvToXmlTeacher/>}/>
        <Route path="/upload-examyear" element={<ExamYearUpload/>}/>

        {/* Add other routes as needed */}
        <Route path="/" element={<Navigate to="/su-login" />} /> 
      </Routes>
    </Router>
  );
}

export default App;