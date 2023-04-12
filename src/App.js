import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration.jsx"
import UserInfo from "./pages/UserInfo";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="registration" element={<Registration/>}/>
            <Route path="info" element={<UserInfo/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;