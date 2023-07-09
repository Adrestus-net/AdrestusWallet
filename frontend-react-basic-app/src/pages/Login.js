import {useSignIn,useIsAuthenticated} from 'react-auth-kit'
import React, {useState} from "react"
import Testnet from '../config/Testnet'
import validator from "validator";
import Stages from '../util/Stages'
import Status from '../util/Status'
import TextFields from "../components/TextFields";
import apiRequest from "../Services/apiRequest";

function Login() {
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const [formData, setFormData] = useState({email: '', password: ''})
    const [stages, setStages] = useState(Stages.Stage1);
    const [status, setStatus] = useState(Status.Pending);
    const [Message, setErrMessage] = useState('');
    const [myArray12, updateMyArray12] = useState(new Array(0));
    const [myArray24, updateMyArray24] = useState(new Array(0));
    const [mnemonic, setMnemonic] = useState(null);
    const [address, setAddress] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.email == '' || formData.password == '') {
            setStatus(Status.Reject)
            setErrMessage("Email or password must not be empty please fill in the data")
            return;

        }
        if (myArray12.length == 0 && myArray24.length == 0) {
            setStatus(Status.Reject)
            setErrMessage("You should choose at least choose 12 or 24 words")
            return;
        }

        let wallet = new window.WalletAddress();
        var username;
        if (myArray12.length != 0) {
            let mnem = new window.Mnemonic(128)
            let seed = mnem.createSeed(myArray12.join(' '), formData.password)
            let keys = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.getPubBigInteger)
            setAddress(username)
        } else {
            let mnem = new window.Mnemonic(256)
            let seed = mnem.createSeed(myArray24.join(' '), formData.password)
            let keys = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.getPubBigInteger)
            setAddress(username)
        }
        const fetchItems = async () => {
            let data = {
                username: username,
                password: formData.email
            }
            const result = await apiRequest(Testnet.LOGIN_URL, 'POST', data);
            if (result == null) {
                setStatus(Status.Reject)
                setErrMessage("Registration is failed please try again later")
                return
            }
            if (result.status == 200) {
                const json_response = await result.json();
                console.log(json_response)
                try {
                    if(isAuthenticated()){
                        setStatus(Status.Approve)
                        setErrMessage("You are already authenticated and login")
                        return
                    }
                    if (signIn(
                        {
                            token: json_response.token,
                            expiresIn: 1,
                            tokenType: "Bearer",
                            authState: formData.email,
                            refreshToken: json_response.token,
                            refreshTokenExpireIn: 1
                        }
                    )) {
                        setStatus(Status.Approve)
                        setErrMessage("Login is successful")
                    } else {
                        setStatus(Status.Reject)
                        setErrMessage("Login is successful but Cookie not set")
                    }
                } catch (err) {
                    setStatus(Status.Reject)
                    setErrMessage("Login is successful but token authentication Failed" + err)
                }
                return
            } else {
                setStatus(Status.Reject)
                setErrMessage("Login is failed with code " + result.status + " and with message " + result.statusText)
            }
        }
        fetchItems();
    }

    const onClick = (e) => {
        e.preventDefault()
        if (e.target.value == 12) {
            let arr = Array.from(Array(12).keys())
            updateMyArray12(arr)
            updateMyArray24(new Array(0))
            console.log(myArray12)
            setMnemonic(new window.Mnemonic(128).create())
            console.log(mnemonic)
        } else {
            let arr = Array.from(Array(24).keys())
            updateMyArray12(new Array(0))
            updateMyArray24(arr)
            setMnemonic(new window.Mnemonic(256).create())
        }
    }
    const onChange = (e) => {
        var type = e.target.type;
        if (type == 'email') {
            var email = e.target.value;
            if (validator.isEmail(email)) {
                setFormData({...formData, email: e.target.value});
            } else {
            }
        } else if (type === 'password') {
            setFormData({...formData, password: e.target.value})
        }
    }
    return (
        <form formaction="/login" onSubmit={onSubmit}>
            <button type={"twelve"} value="12" onClick={(event) => onClick(event)}>12 words</button>
            <button type={"fourtyfour"} value="24" onClick={(event) => onClick(event)}>24 words</button>
            <label>Enter your email:
                <input type={"email"} onChange={(e) => onChange(e)}/>
            </label>
            <label>Enter your password:
                <input type={"password"} onChange={(e) => onChange(e)}/>
            </label>
            {myArray12.length == 12 && formData.email != '' && formData.password != '' && myArray12.map((value, index) =>
                <TextFields index={index} myArray={myArray12} updateMyArray={updateMyArray12}/>)}
            {myArray24.length == 24 && formData.email != '' && formData.password != '' && myArray24.map((value, index) =>
                <TextFields index={index} myArray={myArray24} updateMyArray={updateMyArray24}/>)}
            <button type="submit" formAction="/login">Login</button>
            {status == Status.Reject && <p>{Message}</p>}
            {status == Status.Approve && <p>{Message}</p>}
        </form>
    );
}

export default Login;
