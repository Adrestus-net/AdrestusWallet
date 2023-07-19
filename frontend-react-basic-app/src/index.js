import {AuthProvider, RequireAuth} from 'react-auth-kit'
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Login from "./pages/Login";
import Register from "./pages/Register";
import refreshApi from "./Services/refreshApi";
import Dashboard from "./pages/Dashboard";
import SignUp2 from "./pages/SignUp2";
import SignUp from "./pages/SignUp";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider authType={"cookie"}
                          authName={"_auth"}
                          cookieDomain={window.location.hostname}
                          cookieSecure={false}
                          refresh={refreshApi}>
                <Routes>
                    {/*<Route index element={<App/>}/>*/}
                    {/* <Route path="/App" element={<App/>}/>/
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/SignUp2" element={<SignUp2/>}/>*/}
                    <Route path="*" element={<Navigate to="/Login"/>}/>
                    <Route exact path="/Register" element={<Register/>}/>
                    <Route exact path="/Login" element={<Login/>}/>
                    {/*<Route exact path="/Dashboard" element={<Dashboard/>}/>*/}
                    {<Route exact path={'/Dashboard'} element={
                        <RequireAuth loginPath={'/login'}>
                            <Dashboard/>
                        </RequireAuth>
                    }/>}
                    <Route path="/Register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
//browserify src/crypto/Mnemonic.js --standalone myBundle > src/bundle/WalletBundle.js
