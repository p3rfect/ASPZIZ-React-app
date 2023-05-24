import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration.jsx"
import UserInfo from "./pages/UserInfo/UserInfo";
import NotFound from "./pages/NotFound/NotFound";
import Submitting from "./pages/Submitting/Submitting";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserExams from "./pages/UserExams/UserExams";
import UserSpecialities from "./pages/UserSpecialities/UserSpecialities";
import Admin from "./pages/Admin/Admin";
import Trustee from "./pages/Trustee/Trustee";

function App() {
  return (
      <HashRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/info" element={<UserInfo/>}/>
            <Route path="/exams" element={<UserExams/>}/>
            <Route path="/applic" element={<UserSpecialities/>}/>
            <Route path="/submitting" element={<Submitting/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/trustee" element={<Trustee/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </HashRouter>
  );
}

export default App;