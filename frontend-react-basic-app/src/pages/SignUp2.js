import {useEffect, useState} from 'react';
import { useLocation, Link } from "react-router-dom";

function SignUp2() {
    const location = useLocation();
    const state = location.state;
    return (
        <div>
           <h2>Here {state.myArray12[0]}{state.formData.email}</h2>
        </div>
    );
}

export default SignUp2;
