import {useEffect, useState} from 'react';
import TextFields from "../components/TextFields";
import { Link } from "react-router-dom";
import SignUp2 from "./SignUp2";
function SignUp() {

    const [formData, setFormData] = useState({email: '', password: ''})
    const [myArray12, updateMyArray12] = useState(new Array(0));
    const [myArray24, updateMyArray24] = useState(new Array(0));

    useEffect(() => {
        console.log(myArray12)
    }, [myArray12]);
    useEffect(() => {
        console.log(myArray24)
    }, [myArray24]);
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    const onClick = (e) => {
        e.preventDefault()
        if (e.target.value == 12) {
            let arr = Array.from(Array(12).keys())
            updateMyArray12(arr)
            updateMyArray24(new Array(0))
            console.log(myArray12)
        } else {
            let arr = Array.from(Array(24).keys())
            updateMyArray12(new Array(0))
            updateMyArray24(arr)
        }
    }
    return (
        <div>
            <form formaction="/action_one" onSubmit={onSubmit}>
                <button type={"twelve"} value="12" onClick={(event) => onClick(event)}>12</button>
                <button type={"fourtyfour"} value="24" onClick={(event) => onClick(event)}>24</button>
                <label>Enter your name:
                    <input type={"email"} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </label>
                <label>Enter your password:
                    <input type={"password"} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </label>
                <button type="submit" formaction="/action_one">Submit</button>
            </form>
            <Link to="/SignUp2" state={{myArray12:myArray12,formData:formData}}>
                Go to Profile Page
            </Link>
            {myArray12.length == 12 && formData.email != '' && formData.password != '' && myArray12.map((value, index) =>
                <TextFields index={index} myArray={myArray12} updateMyArray={updateMyArray12}/>)}
            {myArray24.length == 24 && formData.email != '' && formData.password != '' && myArray24.map((value, index) =>
                <TextFields index={index} myArray={myArray24} updateMyArray={updateMyArray24}/>)}
        </div>
    );
}

export default SignUp;
