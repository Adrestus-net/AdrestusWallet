import {AuthProvider, RequireAuth} from 'react-auth-kit'
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Login from "./pages/Login";
import Register from "./pages/Register";
import refreshApi from "./Services/refreshApi";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import App from "./pages/test";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
            <AuthProvider authType={"cookie"}
                          authName={"_auth"}
                          cookieDomain={window.location.hostname}
                          cookieSecure={false}
                          refresh={refreshApi}>
                <Routes>
                    <Route path="*" element={<Navigate to="/test"/>}/>
                    <Route exact path="/Register" element={<Register/>}/>
                    <Route exact path="/Login" element={<Login/>}/>
                    <Route exact path="/test" element={<App/>}/>
                    {/*<Route exact path="/View" element={<Dashboard/>}/>*/}
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
);
//browserify src/crypto/Mnemonic.js --standalone myBundle > src/bundle/WalletBundle.js
