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
import RegisterStage1 from "./RegisterStages/RegisterStage1";
import RegisterStage2 from "./RegisterStages/RegisterStage2";
import RegisterStage3 from "./RegisterStages/RegisterStage3";
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
                         <RegisterStage1
                             onStage1Submit={onStage1Submit}
                             onClick={onClick}
                             mnemonic={mnemonic}
                             name_state={name_state}
                             onChange={onChange}
                             last_name_state={last_name_state}
                             email_state={email_state}
                             password_state={password_state}
                             repeat_password_state={repeat_password_state}
                             status={status}
                             Message={Message}
                             setErrMessage={setErrMessage}
                         />
                        : stages === Stages.Stage2 ?
                           <RegisterStage2
                               selected={selected}
                               handleRemove={handleRemove}
                               array={array}
                               handleAdd={handleAdd}
                               status={status}
                               stages={stages}
                               Message={Message}
                               onStage2Submit={onStage2Submit}
                                 />
                            : <RegisterStage3
                                onStage3Submit={onStage3Submit}
                                status={status}
                                stages={stages}
                                Message={Message}
                            />
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
