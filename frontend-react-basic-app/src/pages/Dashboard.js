import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import Stages from '../util/Stages'
import TransactionModel from '../model/TransactionModel'
import getTimeInString from '../util/DateUtil.js'
import {useLocation} from "react-router-dom";
import apiRequest from "../Services/apiRequest";
import Testnet from "../config/Testnet";
import ListItems from "../components/ListItems";
import Mnemonic from '../bundle/MnemonicBundle.js'
import Keypair from '../bundle/KeypairBundle.js';
import WalletAddress from '../bundle/WalletAddressBundle.js';
import HashFunction from '../bundle/HashFunctionBundle.js'
import ECDSASignature from '../bundle/ECDSASignatureBundle'
function Dashboard() {
    const location = useLocation();
    const state = location.state;

    const {register, handleSubmit,reset} = useForm();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [Arrfrom, setArrfrom] = useState(new Array(0));
    const [ArrTo, setArrTo] = useState(new Array(0));
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [stages, setStages] = useState(Stages.Stage1);
    const [balance, setBalance] = useState(100);

    const [fetchError, setFetchError] = useState(null);


    const keys = useRef(null);
    const nonce = useRef(1);
    const timer = useRef();
    const hash = useRef(new window.HashFunction());
    const sign = useRef(new window.ECDSASignature());

    useEffect(() => {
        if (state.mnemArray.length == 12) {
            let mnem = new window.Mnemonic(128)
            let seed = mnem.createSeed(state.mnemArray.join(' '), state.formData.password)
            keys.current = new window.Keypair(seed);
        } else {
            let mnem = new window.Mnemonic(256)
            let seed = mnem.createSeed(state.mnemArray.join(' '), state.formData.password)
            keys.current = new window.Keypair(seed);
        }

    }, []);

    useEffect(() => {
        if (stages === Stages.Stage1) {
            timer.current = setInterval(() => {
                const fetchItems = async () => {
                    try {
                        const response = await apiRequest(Testnet.TRANSACTION_URL + state.address, 'GET', null, localStorage.getItem("bearer"));
                        console.log(response)
                        if (!response.ok) throw Error('Did not receive expected data');
                        const listItems = await response.json();
                        console.log(listItems)
                        listItems.from.map(val => console.log(JSON.stringify(val)));
                        setArrfrom(listItems.from)
                        setArrTo(listItems.to)
                        setFetchError(null);
                    } catch (err) {
                        setFetchError(err.message);
                    } finally {
                    }
                }
                fetchItems()

            }, 10000);

        }
        return () => {
            clearInterval(timer.current);
            timer.current=null;
            setArrfrom(new Array(0))
            setArrTo(new Array(0))
        };
    }, [stages]);
    /*useEffect(() => {
        var address=new window.WalletAddress();
        let mnemonic_array = "bench hurt jump file august wise shallow faculty impulse spring exact slush thunder author capable act festival slice deposit sauce coconut afford frown better";
        let passphrase = "p4ssphr4se"
        let seed = new window.Mnemonic(128).createSeed(mnemonic_array, passphrase);
        keys = new window.Keypair(seed);
        setAddress(address.generate_address("0", keys.getPubBigInteger));
        setMykey(keys);
        let transactionModel = new TransactionModel()
        transactionModel.Type="as"
        transactionModel.From="asas"
        transactionModel.Pub= keys.getPubBigInteger
        console.log(transactionModel)
    }, []);*/

    const handleRegistration = async (data) => {
        if (from != '' || to != "" || amount != '') {
            setMessage("Field are not correct please make sure they are all correct")
        }
        const transactionModel = new TransactionModel()
        transactionModel.Type = 'RegularTransactionDao'
        transactionModel.TransactionDaoType = 'REGULAR'
        transactionModel.ZoneFrom = data.myListFrom
        transactionModel.ZoneTo = data.myListTo
        transactionModel.Timestamp = getTimeInString()
        transactionModel.From = data.from
        transactionModel.To = data.to
        transactionModel.Amount = data.amount
        transactionModel.AmountWithTransactionFee = data.amount * (10 / 100)
        transactionModel.Nonce = nonce.current
        nonce.current = nonce.current + 1
        transactionModel.V = 0
        transactionModel.R = ''
        transactionModel.S = ''
        transactionModel.Pub = keys.current.getPubBigInteger
        transactionModel.Xaxis = keys.current.getPubPoint.geXAxis
        transactionModel.Yaxis = keys.current.getPubPoint.getYAxis
        transactionModel.Hash = hash.current.hashString(JSON.stringify(transactionModel))
       // console.log(JSON.stringify(transactionModel))
        let signature = sign.current.sign(keys.current.getKeypair, transactionModel.hash)
        transactionModel.V = signature.recoveryParam
        transactionModel.R = signature.r.toString()
        transactionModel.S = signature.s.toString()
        const result = await apiRequest(Testnet.TRANSACTION_URL, 'POST', transactionModel, localStorage.getItem("bearer"));
        if (result.status == 200) {
            console.log("success")
        }
        console.log(result)
        reset()
        setStages(Stages.Stage1)
    }

    const onChangeText = (e) => {
        e.preventDefault()
        if (e.target.value.length != 53) {
            if (e.target.name == 'from') {
                setFrom("from Address Length is invalid")
                return
            } else {
                setTo("to Address Length is invalid ")
                return
            }
        }
        if (e.target.value.substring(0, 3) != "ADR") {
            if (e.target.name == 'from') {
                setFrom("from Address is invalid please type a correct Address")
                return;
            } else {
                setTo("to Address is invalid please type a correct Address")
                return;
            }
        }
        setFrom('');
        setTo('')
    }
    const onAmountCheck = (e) => {
        e.preventDefault()
        var amount = Number(e.target.value);
        console.log(amount)
        if (isNaN(amount)) {
            setAmount("This field must be a number")
            return
        }

        if (balance < amount) {
            setAmount("Not sufficient balance please make sure you have enough cash from this zone")
            return;
        }
        setAmount('');
        document.getElementById("fees").value = amount * (10 / 100);
    }
    const onZoneChange = (e) => {
        console.log(e.target.value)
    }
    const onClick = (e) => {
        e.preventDefault()
        var type = e.target.value;
        if (type == "Send") {
            setStages(Stages.Stage2)
        } else if (type == "Return") {
            setStages(Stages.Stage1)
        } else if (type == "Deposit") {
            setStages(Stages.Stage3)
        }
    }
    return (
        <>
            {stages == Stages.Stage1 &&
                <div>
                    <p>{state.address}</p>
                    <p>{balance}</p>
                    <div>
                        <label>Zones</label>
                        <select id="zones" name='zones' onChange={(e) => {
                            onZoneChange(e);
                        }}>
                            <option value='0' selected="selected"> Zone 0</option>
                            <option value="1"> Zone 1</option>
                            <option value="2"> Zone 2</option>
                            <option value="3"> Zone 3</option>
                        </select>
                    </div>
                    <button type="submit" value="Send" onClick={(event) => onClick(event)}>Send</button>
                    <button type="submit" value="Deposit" onClick={(event) => onClick(event)}>Deposit</button>
                    <div>
                        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
                        {Arrfrom.length == 0 && <p style={{color: "red"}}>{`'Empty array'}`}</p>}
                        {Arrfrom.length != 0 &&
                            <ul>
                                {Arrfrom.map((item) =>
                                    <ListItems value={item}/>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            }
            {stages == Stages.Stage2 &&
                <>
                    <div>
                        <form onSubmit={handleSubmit(handleRegistration)}>
                            <div>
                                <label>from</label>
                                <input name="from" {...register('from')} onChange={(e) => {
                                    onChangeText(e);
                                }}/>
                                {from != '' && <p>{from}</p>}
                            </div>
                            <div>
                                <label>to</label>
                                <input type="text" name="to" {...register('to')} onChange={(e) => {
                                    onChangeText(e);
                                }}/>
                                {to != '' && <p>{to}</p>}
                            </div>
                            <div>
                                <label>Choose Zone from</label>
                                <select id="myListFrom" name='myListFrom' {...register('myListFrom')}>
                                    <option value='0' selected="selected"> Zone 0</option>
                                    <option value="1"> Zone 1</option>
                                    <option value="2"> Zone 2</option>
                                    <option value="3"> Zone 3</option>
                                </select>
                            </div>
                            <br/>
                            <div>
                                <label>Choose Zone To</label>
                                <select id="myListTo" name='myListTo' {...register('myListTo')}>
                                    <option value='0' selected="selected"> Zone 0</option>
                                    <option value="1"> Zone 1</option>
                                    <option value="2"> Zone 2</option>
                                    <option value="3"> Zone 3</option>
                                </select>
                            </div>
                            <div>
                                <label>amount</label>
                                <input type="text" name="amount" {...register('amount')} onChange={(e) => {
                                    onAmountCheck(e);
                                }}/>
                                {amount != '' && <p>{amount}</p>}
                            </div>
                            <div>
                                <label>fees</label>
                                <input type="text" id="fees" readOnly={true} name="fees" {...register('fees')} />
                            </div>
                            <button type="submit" value="Confirm">Confirm</button>
                            {message != '' && <p>{message}</p>}
                        </form>
                    </div>
                </>
            }

            {stages == Stages.Stage3 &&
                <div>
                    <p>{state.address}</p>
                    <button onClick={() => navigator.clipboard.writeText(state.address)}>
                        Copy Address
                    </button>
                    <button type="submit" value="Return" onClick={(event) => onClick(event)}>Return</button>
                </div>
            }
        </>
    )
}

export default Dashboard;
