import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Stages from '../util/Stages'
import Status from '../util/Status'
import Testnet from '../config/Testnet'
import apiRequest from "../Services/apiRequest";
import Card from "../components/card";
import InputField from "../components/fields/InputField";
import Checkbox from "../components/Checkbox";
import SolidSubtleAlert from "../components/SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";
import '../css/Toggle.scss'
import TextField from "../components/fields/TextField";
import Stepper from "../components/Stepper";
import shuffle from '../util/Random.js'
import {BsFillCheckCircleFill} from "react-icons/bs";
import Mnemonic from '../bundle/MnemonicBundle.js'
import Keypair from '../bundle/KeypairBundle.js';
import WalletAddress from '../bundle/WalletAddressBundle.js';
function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstname: '',
        last_name: '',
        email: '',
        password: '',
        pass: '',
        agreement: false
    })
    const [myArray12, updateMyArray12] = useState(new Array(0));
    const [myArray24, updateMyArray24] = useState(new Array(0));
    const [stages, setStages] = useState(Stages.Stage1);
    const [status, setStatus] = useState(Status.Pending);
    const [Message, setErrMessage] = useState('');
    const [mnemonic, setMnemonic] = useState(null);
    const [mnemArray, setMnemarray] = useState([]);
    const [selected, setSelected] = useState([]);
    const [array, setArray] = useState([]);
    const [address, setAddress] = useState('');


    const [name_state, setFirstNameState] = useState('');
    const [last_name_state, setLastNameState] = useState('');
    const [email_state, setEmailState] = useState('');
    const [password_state, setPassowrdState] = useState('');
    const [repeat_password_state, setRepeatPasswordState] = useState('');

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        {stepNo: 1, name: "Register Step 1"},
        {stepNo: 2, name: "Register Step 2"},
        {stepNo: 3, name: "Register Last Step"},
    ];

    useEffect(() => {
        let arr = Array.from(Array(12).keys())
        updateMyArray12(arr)
        updateMyArray24(new Array(0))
        setMnemCorrectly(new window.Mnemonic(128).create())
    }, []);


    const setMnemCorrectly = (myArray) => {
        setMnemarray(myArray)
        let rand = shuffle(Object.assign([], myArray))
        setArray(rand)
        var count = 0
        var toWrite = ''
        for (var i = 0; i < myArray.length; i++) {

            if (i == myArray.length - 1) {
                toWrite += myArray[i];
            } else if (count == 6) {
                toWrite += "\n" + myArray[i] + " ";
                count = 0;

            } else {
                toWrite += myArray[i] + " ";
            }
            count++;
        }
        setMnemonic(toWrite)
        console.log(mnemonic)
    }
    const onClick = (e) => {
        document.getElementById('pure-toggle-2').style.visibility = "hidden";
        if (myArray24.length == 24) {
            let arr = Array.from(Array(12).keys())
            updateMyArray12(arr)
            updateMyArray24(new Array(0))
            console.log(myArray12)
            let mnem = new window.Mnemonic(128)
            setMnemCorrectly(mnem.create())
            console.log(mnemonic)
        } else {
            let arr = Array.from(Array(24).keys())
            updateMyArray12(new Array(0))
            updateMyArray24(arr)
            let mnem = new window.Mnemonic(256)
            setMnemCorrectly(mnem.create())
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        var type = e.target.type;
        var idval = e.target.id;
        if (idval == "lastname") {
            var value = e.target.value;
            if (value != '') {
                setLastNameState('success')
                setFormData({...formData, last_name: value});
            }
        } else if (idval == "firstname") {
            var value = e.target.value;
            if (value != '') {
                setFirstNameState('success')
                setFormData({...formData, firstname: value});
            }
        } else if (idval == "mycheckbox") {
            if (e.target.checked) {
                setFormData({...formData, agreement: true});
            }

        }
        if (type == 'email') {
            var email = e.target.value;
            if (validator.isEmail(email)) {
                setStatus(Status.Approve)
                setErrMessage('');
                setEmailState("success")
                setFormData({...formData, email: e.target.value});
            } else {
                setStatus(Status.Reject)
                setErrMessage("Please, enter valid Email!")
                setEmailState("error")
            }
        }
        if (e.target.id === 'repeat_password') {
            setFormData({...formData, pass: e.target.value})
        } else if (e.target.id === 'password') {
            setFormData({...formData, password: e.target.value})
        }
        const password = document.getElementById('password');
        const repeat_password = document.getElementById('repeat_password');
        if (password.value == '' && repeat_password.value == "")
            return
        if (password.value === repeat_password.value) {
            setRepeatPasswordState("success")
            setPassowrdState("success")
            setStatus(Status.Approve)
            setErrMessage("")
        } else {
            setRepeatPasswordState("error")
            setPassowrdState("error")
            setStatus(Status.Reject)
            setErrMessage("Passwords, not matched!")
        }
    }
    const onStage1Submit = (e) => {
        e.preventDefault();
        console.log(formData)
        if (formData.agreement == false) {
            setStatus(Status.Reject)
            setErrMessage("Please accept the agreement to further proceed")
            return;
        }

        if (formData.email == '' || formData.password == '') {
            setStatus(Status.Reject)
            setErrMessage("Email or password must not be empty please fill in the data")
            return;

        }
        if (formData.password != formData.pass) {
            setStatus(Status.Reject)
            setErrMessage("Passwords not match please try again")
            return;
        }

        if (formData.password.length < 8) {
            setStatus(Status.Reject)
            setErrMessage("Password length must be at least 8 Characters")
            return;
        }

        if (stages === Stages.Stage1) {
            setStages(Stages.Stage2)
            setStatus(Status.Approve)
            setErrMessage("")
            setCurrentStep(2)
        }
        if (stages === Stages.Stage2) {
            setStages(Stages.Stage3)
            setStatus(Status.Approve)
            setErrMessage("")
            setCurrentStep(3)
        }
    }

    const onStage2Submit = (e) => {
        const equalsCheck = (a, b) => {
            return JSON.stringify(a) === JSON.stringify(b);
        }
        e.preventDefault()
        // console.log(mnemArray)
        // console.log(selected)
        if (equalsCheck(selected, mnemArray)) {
            setStatus(Status.Pending)
            setErrMessage('')
            setCurrentStep(3)
            setStages(Stages.Stage3)
        } else {
            setStatus(Status.Reject)
            setErrMessage("Mnemonic is not the same with given one please try again")
            return;
        }
    }
    const onStage3Submit = (e) => {
        e.preventDefault()
        let wallet = new window.WalletAddress();
        var username;
        if (myArray12.length != 0) {
            let mnem = new window.Mnemonic(128)
            let seed = mnem.createSeed(mnemArray.join(' '), formData.password)
            let keys = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.getPubBigInteger)
            setAddress(username)
        } else {
            let mnem = new window.Mnemonic(256)
            let seed = mnem.createSeed(mnemArray.join(' '), formData.password)
            let keys = new window.Keypair(seed);
            username = wallet.generate_address('0', keys.getPubBigInteger)
            setAddress(username)
        }
        const fetchItems = async () => {
            let data = {
                username: username,
                password: formData.email
            }
            const result = await apiRequest(Testnet.REGISTER_URL, 'POST', data);
            console.log(result)
            if (result == null) {
                setStatus(Status.Reject)
                setErrMessage("Registration is failed please try again later")
                return
            }
            if (result.status == 200) {
                setStatus(Status.Approve)
                setErrMessage("Registration is successfule please try to login")
                return
            } else {
                setStatus(Status.Reject)
                setErrMessage("Registration is failed with code " + result.status + " and with message " + result.statusText)
            }
        }
        fetchItems();
    }

    const handleAdd = (str, id) => {
        let temp = [...array];
        temp.splice(id, 1);
        setArray(temp);
        setSelected([...selected, str]);
    };

    // when the button clicked, the string removed
    const handleRemove = (str, id) => {
        let temp = [...selected];
        temp.splice(id, 1);
        setSelected(temp);
        setArray([...array, str]);
    };

    return (
        <>
            <div className="mt-3 h-full w-full">
                <div
                    className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brandLinear to-blueSecondary md:h-[390px]"/>
                <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
                    <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
                        <Stepper
                            action={setCurrentStep}
                            steps={steps}
                            currentStep={currentStep}
                        />
                    </div>
                    {stages === Stages.Stage1 ?
                        <Card
                            extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
                            <form onSubmit={onStage1Submit}>
                                <h3 className="flex flex-row flex-nowrap flex justify-center text-4xl font-bold text-navy-700 dark:text-white">
                                    Sign Up
                                </h3>
                                <p className="flex flex-row flex-nowrap flex justify-center mt-[10px] ml-1 text-base text-gray-600">
                                    Enter your email and password to sign up!
                                </p>
                                <div className="mt-6 mb-4 flex items-center gap-3">
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                    <p className="text-base font-medium text-gray-600"> or </p>
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                </div>
                                <div className="flex flex-col gap-4 flex-wrap: wrap flex items-stretch">
                                    <div class="flex flex-row flex-nowrap flex justify-center">
                                        <input type="checkbox" id="pure-toggle-2" onChange={(event) => onClick(event)}
                                               hidden/>
                                        <label className="pure-toggle impossible" htmlFor="pure-toggle-2">
                                            <span className="fontawesome-ok" type="text" role="textbox">12</span>
                                            <span className="fontawesome-remove" type="text" role="textbox">24</span>
                                        </label>
                                    </div>
                                    <div>
                                        <TextField
                                            state=""
                                            label="Mnemonic Key"
                                            id="textarea"
                                            cols="3"
                                            rows="6"
                                            value={mnemonic}
                                        />
                                    </div>
                                </div>
                                {/* user info */}
                                <InputField
                                    variant="auth"
                                    extra="mb-3"
                                    label="First Name*"
                                    placeholder="John"
                                    id="firstname"
                                    type="text"
                                    state={name_state}
                                    onchange={onChange}
                                />

                                <InputField
                                    variant="auth"
                                    extra="mb-3"
                                    label="Last Name*"
                                    placeholder="Doe"
                                    id="lastname"
                                    type="text"
                                    state={last_name_state}
                                    onchange={onChange}
                                />
                                {/* Email */}
                                <div>
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Email*"
                                        placeholder="mail@simmmple.com"
                                        id="email"
                                        type="email"
                                        state={email_state}
                                        onchange={onChange}
                                    />
                                </div>

                                {/* Password */}

                                <InputField
                                    variant="auth"
                                    extra="mb-3"
                                    label="Password*"
                                    placeholder="Min 8 characters"
                                    id="password"
                                    type={"password"}
                                    state={password_state}
                                    onchange={onChange}
                                />

                                <div className="flex flex-col flex flex-nowrap flex justify-start">
                                    {/* Password */}
                                    <div>
                                        <InputField
                                            variant="auth"
                                            extra="mb-3"
                                            label="Repeat Password*"
                                            placeholder="Min 8 characters"
                                            id="repeat_password"
                                            type={"password"}
                                            state={repeat_password_state}
                                            onchange={onChange}
                                        />
                                    </div>
                                    <div>
                                        {status == Status.Reject &&
                                            <SolidSubtleAlert
                                                title="SignUP Error"
                                                description={Message}
                                                icon={<AiFillExclamationCircle/>}
                                                iconColor="text-white dark:!text-navy-900"
                                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                                bg="bg-red-500 dark:!bg-red-300"
                                                mb="pt-2 pb-2"
                                                solid="solid"
                                            />
                                        }
                                    </div>
                                </div>
                                {/* Checkbox */}
                                <div className="mt-2 flex items-center justify-between px-2">
                                    <div className="flex">
                                        <Checkbox id="mycheckbox" onchange={onChange}/>
                                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                            By creating an account means you agree to the Terms and
                                            Conditions, and our Privacy Policy
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                    Register Step 1
                                </button>
                                <div className="mt-3">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
              Already a member?
            </span>
                                    <a
                                        href="/Login"
                                        className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                                    >
                                        Sign In
                                    </a>
                                </div>
                            </form>
                        </Card>
                        : stages === Stages.Stage2 ?
                            <Card
                                extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
                                <h3 className="flex flex-row flex-nowrap flex justify-center text-4xl font-bold text-navy-700 dark:text-white">
                                    Mnemonic Phase
                                </h3>
                                <p className="flex flex-row flex-nowrap flex justify-center mt-[10px] ml-1 text-base text-gray-600">
                                    Fill in correct form the Mnemonic phase!
                                </p>
                                <div className="mt-6 mb-4 flex items-center gap-3">
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                    <p className="text-base font-medium text-gray-600"> or </p>
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                </div>
                                <div className="flex justify-between gap-4 h-screen">
                                    <div className="mx-auto w-[1000px] container border bg-gray-100 p-2">
                                        <div className="grid grid-cols-4 gap-4 pb-40 gap-1 h-[350px]">
                                            {selected.map((item, id) => (
                                                <button
                                                    key={id}
                                                    onClick={() => handleRemove(item, id)}
                                                    className="flex justify-center bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow h-[50px]"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                        <hr className="py-3"/>
                                        <div className="grid grid-cols-4 gap-4 pb-40 gap-1 h-[350px]">
                                            {array.map((item, id) => (
                                                <button
                                                    key={id}
                                                    onClick={() => handleAdd(item, id)}
                                                    className="flex justify-center bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow h-[50px]"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                        <hr className="py-1"/>
                                        {status == Status.Reject && stages == Stages.Stage2 &&
                                            <SolidSubtleAlert
                                                title="Phase 2 Error"
                                                description={Message}
                                                icon={<AiFillExclamationCircle/>}
                                                iconColor="text-white dark:!text-navy-900"
                                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                                bg="bg-red-500 dark:!bg-red-300"
                                                mb="pt-2 pb-2"
                                                solid="solid"
                                            />
                                        }
                                        <div className="mt-30 pt-1">
                                            <button
                                                className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                                                onClick={onStage2Submit}
                                            >
                                                Submit Step 2
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            : <Card extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
                                <h3 className="flex flex-row flex-nowrap flex justify-center text-4xl font-bold text-navy-700 dark:text-white">
                                    Mnemonic Phase
                                </h3>
                                <p className="flex flex-row flex-nowrap flex justify-center mt-[10px] ml-1 text-base text-gray-600">
                                    Fill in correct form the Mnemonic phase!
                                </p>
                                <div className="mt-6 mb-4 flex items-center gap-3">
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                    <p className="text-base font-medium text-gray-600"> or </p>
                                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                                </div>
                                <form onSubmit={onStage3Submit}>
                                    <div className="flex flex-col justify-center text-align: center;">
                                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white text-center">You
                                            are all set open the extension and sign in to begin your interchain
                                            journey</p>
                                    </div>
                                    <button type="submit"
                                            className="mt-4 mb-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">Create
                                        my Account
                                    </button>
                                    {status == Status.Reject && stages == Stages.Stage3 &&
                                        <SolidSubtleAlert
                                            title="Phase 3 Error"
                                            description={Message}
                                            icon={<AiFillExclamationCircle/>}
                                            iconColor="text-white dark:!text-navy-900"
                                            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                            bg="bg-red-500 dark:!bg-red-300"
                                            mb="pt-2 pb-2"
                                            solid="solid"
                                        />
                                    }
                                    {status == Status.Approve && stages == Stages.Stage3 &&
                                        <div className="flex flex-col flex items-stretch gap-4">
                                            <div>
                                                <button onClick={() => navigate('/Login')} className="mt-4 mb-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to='/Login'>Log In</button>
                                            </div>
                                            <div>
                                                <SolidSubtleAlert
                                                    title="Registration Successful"
                                                    description="Your registration is succeed you can now Log in."
                                                    icon={<BsFillCheckCircleFill/>}
                                                    iconColor="text-white dark:!text-navy-900"
                                                    bg="bg-green-500 dark:!bg-green-300"
                                                    mb="mb-6"
                                                    closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                                    solid="solid"
                                                />
                                            </div>
                                        </div>
                                    }
                                </form>
                            </Card>
                    }
                </div>
            </div>

        </>
        // <div>
        //     {stages === Stages.Stage1 ?
        //         <form formaction="/action_one" onSubmit={onStage1Submit}>
        //             <h1 className="text-3xl font-bold underline underline-offset-4">
        //                 Hello world!
        //             </h1>
        //             {mnemonic!=null &&<textarea id="myTextarea" value={mnemonic == null ? '' : mnemonic}>{mnemonic}</textarea>}
        //             <button type={"twelve"} value="12" onClick={(event) => onClick(event)}>12 word</button>
        //             <button type={"fourtyfour"} value="24" onClick={(event) => onClick(event)}>24 word</button>
        //             <label>Enter your email:
        //                 <input type={"email"} onChange={(e) => onChange(e)}/>
        //             </label>
        //             <label>New password(minumum 8 characters):
        //                 <input type={"password"} onChange={(e) => onChange(e)}/>
        //                 <PasswordStrengthBar password={formData.password} minLength={8}/>
        //             </label>
        //             <label>Confirm password:
        //                 <input type={"password"} id="confirm_password" onChange={(e) => onChange(e)}/>
        //                 <PasswordStrengthBar password={formData.clonepassword} minLength={8}/>
        //             </label>
        //             <button type="submit" formaction="/action_one">Submit {stages}</button>
        //             {status == Status.Reject && <p>{Message}</p>}
        //         </form>
        //         : stages === Stages.Stage2 ?
        //             <form onSubmit={onStage2Submit}>
        //                 {myArray12.length == 12 && formData.email != '' && formData.password != '' && myArray12.map((value, index) =>
        //                     <TextFields index={index} myArray={myArray12} updateMyArray={updateMyArray12}/>)}
        //                 {myArray24.length == 24 && formData.email != '' && formData.password != '' && myArray24.map((value, index) =>
        //                     <TextFields index={index} myArray={myArray24} updateMyArray={updateMyArray24}/>)}
        //                 <button type="submit">Register {stages}</button>
        //                 {status == Status.Reject && <p>{Message}</p>}
        //             </form>
        //             :
        //             <form onSubmit={onStage3Submit}>
        //                 <div><p>You are all set open the extension and sign in to begin your interchain journey</p>
        //                 </div>
        //                 <button type="submit">Final Register {stages}</button>
        //                 {status == Status.Reject && <p>{Message}</p>}
        //                 {status == Status.Approve &&
        //                     <div>
        //                         <Link to="/Login" className="btn btn-primary">Login up</Link>
        //                         <p>{Message}</p>
        //                     </div>
        //                 }
        //             </form>
        //     }
        // </div>
    );
}

export default Register;
