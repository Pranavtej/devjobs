import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import Login from './components/Login/Login_app';
import Index from './components/Landing';
import Signup from './components/Signup/signup';
import Dashboard from './components/Dashboard/dashboard';
import AppliedJobs from './/components//Dashboard//appliedjobs//appliedjobs';
import ComapanySignup from './components/Signup/comapanySignup';
import CompanyLogin from './components/Login/login_Company';
import Company from './components/Dashboard//Company/Company';
import PostedJobs from './/components///Dashboard///Company///postedjobs';
import ViewApplicants from './components/Dashboard/Company/applicants';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Index />} />
      <Route path='/login'element={<Login/>} />
      <Route path='/signup'element={<Signup />} />
      <Route path='/dashboard'element={<Dashboard />} />
      <Route path='/appliedJobs'element={<AppliedJobs />} />
      <Route path='/companySignup'element={<ComapanySignup />} />
      <Route path='/companyLogin'element={<CompanyLogin />} />
      <Route path='/company'element={<Company/>} />
      <Route path='/postedJobs'element={<PostedJobs />} />
      <Route path='/viewApplications/:id'element={<ViewApplicants />} />






    </Routes>
    </BrowserRouter>
  );
}

export default App;
