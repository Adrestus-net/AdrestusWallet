import {AuthProvider, RequireAuth} from 'react-auth-kit'
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import WalletView from "./pages/WalletView";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SignUp2 from "./pages/SignUp2";
import Register from "./pages/Register";
import refreshApi from "./Services/refreshApi";

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
                    <Route exact path="/" component={<Register/>}/>
                    <Route path="/App" element={<App/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/SignUp2" element={<SignUp2/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path={'/WalletView'} element={
                        <RequireAuth loginPath={'/login'}>
                            <WalletView/>
                        </RequireAuth>
                    }/>
                    <Route path="/Register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
//browserify src/crypto/Mnemonic.js --standalone myBundle > src/bundle/WalletBundle.js
