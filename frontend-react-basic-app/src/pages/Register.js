import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import validator from "validator";
import TextFields from "../components/TextFields";
import Stages from '../util/Stages'
import Status from '../util/Status'
import Testnet from '../config/Testnet'
import apiRequest from "../Services/apiRequest";
import Mnemonic from '../bundle/MnemonicBundle.js'
import Keypair from '../bundle/KeypairBundle.js';
import WalletAddress from '../bundle/WalletAddressBundle.js';
function Register() {
    const [formData, setFormData] = useState({email: '', password: '', clonepasswrd: ''})
    const [myArray12, updateMyArray12] = useState(new Array(0));
    const [myArray24, updateMyArray24] = useState(new Array(0));
    const [stages, setStages] = useState(Stages.Stage1);
    const [status, setStatus] = useState(Status.Pending);
    const [Message, setErrMessage] = useState('');
    const [mnemonic, setMnemonic] = useState(null);
    const [address, setAddress] = useState('');


   /* useEffect(() => {
        let arr = Array.from(Array(12).keys())
        updateMyArray12(arr)
        updateMyArray24(new Array(0))
        setMnemonic(new window.Mnemonic(128).create())
    }, []);*/

    const onClick = (e) => {
        e.preventDefault()
        if (e.target.value == 12) {
            let arr = Array.from(Array(12).keys())
            updateMyArray12(arr)
            updateMyArray24(new Array(0))
            console.log(myArray12)
            let mnem = new window.Mnemonic(128)
            setMnemonic(mnem.create())
            console.log(mnemonic)
        } else {
            let arr = Array.from(Array(24).keys())
            updateMyArray12(new Array(0))
            updateMyArray24(arr)
            let mnem = new window.Mnemonic(256)
            setMnemonic(mnem.create())
        }
    }

    const onChange = (e) => {
        var type = e.target.type;
        if (type == 'email') {
            var email = e.target.value;
            if (validator.isEmail(email)) {
                setStatus(Status.Approve)
                setErrMessage('');
                setFormData({...formData, email: e.target.value});
            } else {
                setStatus(Status.Reject)
                setErrMessage("Please, enter valid Email!")
            }
        } else if (type === 'password') {
            if (e.target.id == 'confirm_password') {
                setFormData({...formData, clonepasswrd: e.target.value})
            } else {
                setFormData({...formData, password: e.target.value})
            }
        }
    }
    const onStage1Submit = (e) => {
        e.preventDefault()
        if (formData.email == '' || formData.password == '') {
            setStatus(Status.Reject)
            setErrMessage("Email or password must not be empty please fill in the data")
            return;

        }
        if (formData.password != formData.clonepasswrd) {
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
        }
        if (stages === Stages.Stage2) {
            setStages(Stages.Stage3)
            setStatus(Status.Approve)
            setErrMessage("")
        }
    }

    const onStage2Submit = (e) => {
        e.preventDefault()
        if (myArray12.length != 0) {
            if (JSON.stringify(mnemonic) != JSON.stringify(myArray12)) {
                console.log(mnemonic)
                console.log(myArray12)
                setStatus(Status.Reject)
                setErrMessage("Mnemonic is not the same with given one please try again")
                return;
            }
        } else {
            if (JSON.stringify(mnemonic) != JSON.stringify(myArray24)) {
                setStatus(Status.Reject)
                setErrMessage("Mnemonic is not the same with given one please try again")
                return;
            }
        }
        setStatus(Status.Approve)
        setErrMessage('')
        if (stages === Stages.Stage2) {
            setStages(Stages.Stage3)
        }
    }
    const onStage3Submit = (e) => {
        e.preventDefault()
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
    return (
        <div>
            {stages === Stages.Stage1 ?
                <form formaction="/action_one" onSubmit={onStage1Submit}>
                    {mnemonic!=null &&<textarea id="myTextarea" value={mnemonic == null ? '' : mnemonic}>{mnemonic}</textarea>}
                    <button type={"twelve"} value="12" onClick={(event) => onClick(event)}>12 word</button>
                    <button type={"fourtyfour"} value="24" onClick={(event) => onClick(event)}>24 word</button>
                    <label>Enter your email:
                        <input type={"email"} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>New password(minumum 8 characters):
                        <input type={"password"} onChange={(e) => onChange(e)}/>
                        <PasswordStrengthBar password={formData.password} minLength={8}/>
                    </label>
                    <label>Confirm password:
                        <input type={"password"} id="confirm_password" onChange={(e) => onChange(e)}/>
                        <PasswordStrengthBar password={formData.clonepasswrd} minLength={8}/>
                    </label>
                    <button type="submit" formaction="/action_one">Submit {stages}</button>
                    {status == Status.Reject && <p>{Message}</p>}
                </form>
                : stages === Stages.Stage2 ?
                    <form onSubmit={onStage2Submit}>
                        {myArray12.length == 12 && formData.email != '' && formData.password != '' && myArray12.map((value, index) =>
                            <TextFields index={index} myArray={myArray12} updateMyArray={updateMyArray12}/>)}
                        {myArray24.length == 24 && formData.email != '' && formData.password != '' && myArray24.map((value, index) =>
                            <TextFields index={index} myArray={myArray24} updateMyArray={updateMyArray24}/>)}
                        <button type="submit">Register {stages}</button>
                        {status == Status.Reject && <p>{Message}</p>}
                    </form>
                    :
                    <form onSubmit={onStage3Submit}>
                        <div><p>You are all set open the extension and sign in to begin your interchain journey</p>
                        </div>
                        <button type="submit">Final Register {stages}</button>
                        {status == Status.Reject && <p>{Message}</p>}
                        {status == Status.Approve &&
                            <div>
                                <Link to="/Login" className="btn btn-primary">Login up</Link>
                                <p>{Message}</p>
                            </div>
                        }
                    </form>
            }
        </div>
    );
}

export default Register;
