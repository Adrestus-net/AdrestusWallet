import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import React, {useEffect, useRef, useState} from "react"
import Testnet from '../config/Testnet'
import validator from "validator";
import Stages from '../util/Stages'
import Status from '../util/Status'
import apiRequest from "../Services/apiRequest";
import EXPIRATION from "../config/Expiration"
import {useNavigate} from "react-router-dom";
import Card from "../components/card";
import Checkbox from "../components/Checkbox";
import Mnemonic from '../bundle/MnemonicBundle.js'
import Keypair from '../bundle/KeypairBundle.js';
import WalletAddress from '../bundle/WalletAddressBundle.js';
import HashFunction from '../bundle/HashFunctionBundle.js'
import ECDSASignature from '../bundle/ECDSASignatureBundle'
import TextField from "../components/fields/TextField";
import InputField from "../components/fields/InputField";
import SolidSubtleAlert from "../components/SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";
import '../css/loader.css'

function Login() {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const [formData, setFormData] = useState({email: '', password: ''})
    const [stages, setStages] = useState(Stages.Stage1);
    const [status, setStatus] = useState(Status.Pending);
    const [Message, setErrMessage] = useState('');
    const [myArray12, updateMyArray12] = useState(new Array(0));
    const [myArray24, updateMyArray24] = useState(new Array(0));
    const [myMnemArray, setMyMnemArray] = useState([]);
    const [mnemonic, setMnemonic] = useState(null);
    const [address, setAddress] = useState('');
    const [isloadingBar, setisloadingBar] = useState(false);
    const keys = useRef(null);


    const [email_state, setEmailState] = useState('');
    const [password_state, setPassowrdState] = useState('');

    useEffect(() => {
        let arr = Array.from(Array(12).keys())
        updateMyArray12(arr)
        updateMyArray24(new Array(0))
        setMnemonic(new window.Mnemonic(128).create())
    }, []);

    const onSubmit = (e) => {
        e.preventDefault()
        setisloadingBar(true)
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

            let myarray=[]
            for(var i=0;i<myArray12.length;i++){
                const field = document.getElementById(i).value;
                myarray.push(field)
            }
            let mnem = new window.Mnemonic(128)
            let seed = mnem.createSeed(myarray.join(' '), formData.password)
            keys.current = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.current.getPubBigInteger)
            setAddress(username)
            setMyMnemArray(myarray)
        } else {
            let myarray=[]
            for(var i=0;i<myArray24.length;i++){
                const field = document.getElementById(i).value;
                myarray.push(field)
            }
            let mnem = new window.Mnemonic(256)
            let seed = mnem.createSeed(myArray24.join(' '), formData.password)
            keys.current = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.current.getPubBigInteger)
            setAddress(username)
            setMyMnemArray(myarray)
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
                    if (isAuthenticated()) {
                        setStatus(Status.Approve)
                        setErrMessage("You are already authenticated and login")
                        return
                    }
                    if (signIn(
                        {
                            token: json_response.token,
                            expiresIn: EXPIRATION.EXPIRATION_BEARER,
                            tokenType: "Bearer",
                            authState: formData.email,
                            refreshToken: json_response.token,
                            refreshTokenExpireIn: 1
                        }
                    )) {
                        localStorage.setItem("bearer", json_response.token)
                        setStatus(Status.Approve)
                        setErrMessage('')
                    } else {
                        setStatus(Status.Reject)
                        setErrMessage("Login is successful but Cookie not set")
                    }
                } catch (err) {
                    setStatus(Status.Reject)
                    setErrMessage("Login is successful but token authentication Failed" + err)
                }
                setisloadingBar(false)
                return
            } else {
                setStatus(Status.Reject)
                setErrMessage("Login is failed with code " + result.status + " and with message " + result.statusText)
                setisloadingBar(false)
            }
        }
        fetchItems();
    }

    const onClick = (e) => {
        document.getElementById('pure-toggle-2').style.visibility = "hidden";
        if (myArray24.length == 24) {
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
        var val = e.target.value;
        if (type == 'email') {
            var email = e.target.value;
            if (validator.isEmail(email)) {
                setFormData({...formData, email: e.target.value});
                setEmailState('success')
            } else {
                setEmailState('error')
            }
        } else if (type === 'password') {
            setFormData({...formData, password: e.target.value})
            setPassowrdState('success')
        }
    }
    return (
        <div className="mt-3 h-full w-full">
            <div className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brandLinear to-blueSecondary md:h-[390px]"/>
            <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
                <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
                </div>
                <Card extra="max-w-[705px] md:max-w-[810px] md:w-[810px] h-max mx-2.5 md:mx-auto mt-[50px] mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
                    <form formaction="/login" onSubmit={onSubmit}>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex flex-row justify-center">
                            <h3 className="mb-[10px] text-4xl font-bold text-gray-900 dark:text-white">
                                Sign In
                            </h3>
                        </div>
                        <div className="flex flex-row justify-center">
                            <p className="mb-9 ml-1 text-base text-gray-600">
                                Enter your email, mnemonic and password to sign in!
                            </p>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                        <p className="text-base font-medium text-gray-600"> or </p>
                        <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                    </div>
                    <div className="flex flex-col gap-4 flex-wrap: wrap flex items-stretch">
                        <div className="flex flex-row flex-nowrap flex justify-center">
                            <input type="checkbox" id="pure-toggle-2" onChange={(event) => onClick(event)}
                                   hidden/>
                            <label className="pure-toggle impossible" htmlFor="pure-toggle-2">
                                <span className="fontawesome-ok" type="text" role="textbox">12</span>
                                <span className="fontawesome-remove" type="text" role="textbox">24</span>
                            </label>
                        </div>
                    </div>
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email*"
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="email"
                        state={email_state}
                        onchange={onChange}
                        result={''}
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password*"
                        placeholder="Min. 8 characters"
                        id="password"
                        type="password"
                        state={password_state}
                        onchange={onChange}
                        result={''}
                    />
                    <div class="grid grid-cols-4 gap-4">
                        {myArray12.length == 0 ? myArray24.map((item, num) => (
                            <TextField
                                variant="auth"
                                extra="flex flex-row justify-items-center content-center gap-0.5"
                                extra2="self-center"
                                label={num}
                                placeholder={num}
                                id={num}
                                type="text"
                            />
                        )) : myArray12.map((item, num) => (
                            <TextField
                                variant="auth"
                                extra="flex flex-row justify-items-center content-center gap-0.5"
                                extra2="self-center"
                                label={num}
                                placeholder={num}
                                id={num}
                                type="text"
                            />
                        ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between px-2">
                        <div className="flex items-center">
                            <Checkbox onChange={onChange}/>
                            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                Keep me logged In
                            </p>
                        </div>
                    </div>
                        <div className="mb-3 mt-4">
                            {Message !== '' &&
                                <SolidSubtleAlert
                                    title="Sign In Error"
                                    description={Message}
                                    icon={<AiFillExclamationCircle/>}
                                    iconColor="text-white dark:!text-navy-900"
                                    closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                    bg="bg-red-500 dark:!bg-red-300"
                                    mb="pt-2 pb-2"
                                    solid="solid"
                                    setResult={setErrMessage}
                                    setStatus={setStatus}
                                />
                            }
                        </div>
                    <button
                        type="submit"
                        className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Sign In
                    </button>
                    <div className="flex flex row justify-evenly">
                        <div>
                            <span className="text-sm font-medium text-navy-700 dark:text-gray-500 text-center">
                              Not registered yet?
                            </span>
                        </div>
                        {isloadingBar && <div className="custom-loader"></div>}
                        <div>
                            <a href="/Register"
                               className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white">
                                Create an Account
                            </a>
                        </div>
                    </div>
                    </form>
                     {status == Status.Approve && navigate("/Dashboard",{state:{formData:formData,address:address,mnemArray:myMnemArray}})}
                </Card>
                }
            </div>
        </div>
        // <form formaction="/login" onSubmit={onSubmit}>
        //     <button type={"twelve"} value="12" onClick={(event) => onClick(event)}>12 words</button>
        //     <button type={"fourtyfour"} value="24" onClick={(event) => onClick(event)}>24 words</button>
        //     <label>Enter your email:
        //         <input type={"email"} onChange={(e) => onChange(e)}/>
        //     </label>
        //     <label>Enter your password:
        //         <input type={"password"} onChange={(e) => onChange(e)}/>
        //     </label>
        //     {myArray12.length == 12 && formData.email != '' && formData.password != '' && myArray12.map((value, index) =>
        //         <TextFields index={index} myArray={myArray12} updateMyArray={updateMyArray12}/>)}
        //     {myArray24.length == 24 && formData.email != '' && formData.password != '' && myArray24.map((value, index) =>
        //         <TextFields index={index} myArray={myArray24} updateMyArray={updateMyArray24}/>)}
        //     <button type="submit" formAction="/login">Login</button>
        //     <Link to="/Register" className="btn btn-primary">Sign up</Link>
        //     {status == Status.Reject && <p>{Message}</p>}
        //     {status == Status.Approve && navigate("/Dashboard",{state:{formData:formData,address:address,myArray12:myArray12,myArray24:myArray24}})};
        // </form>
    );
}

export default Login;
