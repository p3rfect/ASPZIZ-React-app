import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration.jsx"
import UserInfo from "./pages/UserInfo";
import NotFound from "./pages/NotFound";
import Submitting from "./pages/Submitting";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import UserExams from "./pages/UserExams";
import UserSpecialities from "./pages/UserSpecialities";

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
            <Route path="/error" element={<NotFound/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </HashRouter>
  );
}

export default App;