import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import WalletView from "./pages/WalletView";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SignUp2 from "./pages/SignUp2";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            {/*<Route index element={<App/>}/>*/}
            <Route path="/App" element={<App/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/SignUp2" element={<SignUp2/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/WalletView" element={<WalletView/>}/>
        </Routes>
    </BrowserRouter>
);
