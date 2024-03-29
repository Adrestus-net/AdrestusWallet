import React, {useEffect, useRef, useState, createContext} from 'react';
import Card from "../components/card";
import Balance from "../components/Balance";
import Address from "../components/Address";
import TransactionView from "../components/TransactionView";
import DashboardButtons from "../components/DashboardButtons";
import Invoice from "../components/Invoice";
import Market from "../components/Market";
import DashBoardNavBar from "../components/DashBoardNavBar";
import Stages from "../util/Stages";
import TransactionSetup from "../components/TransactionSetup";
import Testnet from "../config/Testnet";
import Timeout from "../config/Timeout"
import {useLocation} from "react-router-dom";
import apiRequest from "../Services/apiRequest";
import TransactionModel from '../model/TransactionModel'
import DateUtil from '../util/DateUtil.js'
import {useIdleTimer} from 'react-idle-timer'
import Mnemonic from '../bundle/MnemonicBundle.js'
import Keypair from '../bundle/KeypairBundle.js';
import WalletAddress from '../bundle/WalletAddressBundle.js';
import HashFunction from '../bundle/HashFunctionBundle.js'
import ECDSASignature from '../bundle/ECDSASignatureBundle'
import UtilBase64 from '../bundle/UtilBase64Bundle.js'
import axios from "axios";
import LockDashboard from "../components/LockDashboard";
import Status from "../util/Status";
import Util from "../crypto/Util";
import BalanceModel from "../model/BalanceModel";
export const DashBoardContext = createContext();

function Dashboard() {
    const location = useLocation();
    const state = location.state;

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        zoneFrom: '0',
        zoneTo: '0',
        fees: '',
    })
    const [status, setStatus] = useState(Status.Pending);
    const [money, setMoney] = useState('')
    const [APIMessage, setAPIMessage] = useState('')
    const [address, setAddress] = useState(state.address)
    const [mnemArray, setMnemArray] = useState(state.mnemArray)
    const [password, setPassword] = useState(state.formData.password)
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [stages, setStages] = useState(Stages.Stage1);
    const [balance, setBalance] = useState(100);
    const [fetchError, setFetchError] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [moedas, setMoedas] = useState([]);


    const [dropDown, setDropdown] = React.useState('Testnet');
    const [darkmode, setDarkmode] = React.useState(document.body.classList.contains("dark"));


    const bloom_filter_api = useRef(null);
    const keys = useRef(null);
    const timer = useRef();
    const hash = useRef(new window.HashFunction());
    const sign = useRef(new window.ECDSASignature());
    const enc = useRef(new window.UtilBase64());

    const [remaining, setRemaining] = useState(0)

    const onIdle = () => {
        setStages(Stages.Stage3)
    }

    const onActive = () => {
    }

    const onAction = () => {
    }

    const {getRemainingTime} = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: Timeout.LOCK_ACCOUNT_TIMER,
        throttle: Timeout.THROTTLE
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })


    useEffect(() => {
        if (mnemArray.length == 12) {
            let mnem = new window.Mnemonic(128)
            let seed = mnem.createSeed(mnemArray.join(' '), password)
            keys.current = new window.Keypair(seed);
        } else {
            let mnem = new window.Mnemonic(256)
            let seed = mnem.createSeed(mnemArray.join(' '), password)
            keys.current = new window.Keypair(seed);
        }

        const fetchBalance = async () => {
            try {
                const balancemodel = new BalanceModel()
                balancemodel.Address = address
                balancemodel.Zone = 0
                const result = await apiRequest(Testnet.BALANCE_URL, 'POST', balancemodel, localStorage.getItem("bearer"));
                if (result.status == 200) {
                    result.text().then(function (val){
                        setBalance(val)
                    });
                }
            } catch (err) {
                setFetchError(err.message);
            } finally {
            }
        }
        fetchBalance()

        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
            )
            .then((res) => {
                setMoedas(res.data);
                console.log(res.data);
            })
            .catch((error) => console.log(error));


        async function callAsync() {
            await window.cheerpjInit();
            const lib = await window.cheerpjRunLibrary("/app/BloomFilter.jar");
            bloom_filter_api.current=lib
        }
        callAsync();

        const fetchItems = async () => {
            try {
                const Creation = await bloom_filter_api.current.io.Adrestus.bloom_filter.Creation;
                const creation = await new Creation();
                const jsonToSend=await creation.create(address);
                const response = await apiRequest(Testnet.BLOOM_FILTER_URL, 'GET', jsonToSend, localStorage.getItem("bearer"));
                if (!response.ok) throw Error('Did not receive expected data');
                const jsonRes = await response.json();
                const map=JSON.parse(jsonRes);
                let myMap = new Map(Object.entries(map));
                const entry=myMap.get(address);
                if (entry !== undefined) {
                    setTransaction(entry)
                    setFetchError(null);
                }
                setFetchError("Transactions fetched from server failed please make sure your browser extensions not overlapped");
            } catch (err) {
                setFetchError(err.message);
            } finally {
            }
        }
        fetchItems()
    }, []);

    useEffect(() => {
        if (stages === Stages.Stage1) {
            timer.current = setInterval(() => {
                const fetchItems = async () => {
                    try {
                        const Creation = await bloom_filter_api.current.io.Adrestus.bloom_filter.Creation;
                        const creation = await new Creation();
                        const jsonToSend=await creation.create(address);
                        const response = await apiRequest(Testnet.BLOOM_FILTER_URL, 'GET', jsonToSend, localStorage.getItem("bearer"));
                        console.log(response)
                        if (!response.ok) throw Error('Did not receive expected data');
                        const jsonRes = await response.json();
                        const map=JSON.parse(jsonRes);
                        let myMap = new Map(Object.entries(map));
                        const entry=myMap.get(address);
                        if (entry !== undefined) {
                            setTransaction(entry)
                            setFetchError(null);
                        }
                        setFetchError("Transactions fetched from server failed please make sure your browser extensions not overlapped");
                    } catch (err) {
                        setFetchError(err.message);
                    } finally {
                    }
                }
                fetchItems()

            }, Timeout.TRANSACTIONS_RETRIEVE);

        }
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        };
    }, [stages]);


    const handleRegistration = async (e) => {
        e.preventDefault()

        if (formData.from.length != 53) {
            setFrom("from Address Length is invalid")
            return
        }
        if(formData.to.length!=53){
            setTo("to Address Length is invalid ")
            return
        }
        if (from != '' || to != "" || amount != '') {
            setStages(Stages.Stage2)
            setMessage("Fields are not correct please make sure they are all correct")
            return
        }

        if (formData.from === "" || formData.to === "") {
            setStages(Stages.Stage2)
            setMessage("Fields are not correct please make sure they are all correct")
            return
        }

        if (balance < money) {
            setStages(Stages.Stage2)
            setAmount("Not sufficient balances")
            return;
        }

        var bill = Number(money);
        console.log("bill"+bill)
        if (isNaN(bill)|| bill===0) {
            setStages(Stages.Stage2)
            setAmount("Not sufficient balances")
            return;
        }

        if (balance < bill+(bill * (10 / 100))) {
            setStages(Stages.Stage2)
            setAmount("Not sufficient balances")
            return;
        }

        const transactionModel = new TransactionModel()
        transactionModel.Transactiontype = 'RegularTransaction'
        transactionModel.Type = 'REGULAR'
        transactionModel.Status = 'PENDING'
        transactionModel.Timestamp = DateUtil.getTimeInString()
        transactionModel.Hash = ''
        let nonce=0;
        if(transaction!=null) {
            for (let i = 0; i < transaction.from.length; i++) {
                if (transaction.from[i].zoneFrom == formData.zoneFrom) {
                    nonce = nonce + 1
                }

            }
        }
        transactionModel.Nonce = nonce+1
        transactionModel.BlockNumber = 0
        transactionModel.From = formData.from
        transactionModel.To = formData.to
        transactionModel.ZoneFrom = formData.zoneFrom
        transactionModel.ZoneTo = formData.zoneTo
        if (Util.isInt(money)) {
            transactionModel.Amount = money.toFixed(1)
        } else {
            transactionModel.Amount = money
        }
        if (Util.isInt(formData.fees)) {
            transactionModel.AmountWithTransactionFee = formData.fees.toFixed(1)
        } else {
            transactionModel.AmountWithTransactionFee = formData.fees
        }
        transactionModel.Xaxis = keys.current.getPubPoint.geXAxis
        transactionModel.Yaxis = keys.current.getPubPoint.getYAxis
        const signature_model = {v: 0, r: "", s: "", pub: ''};
        transactionModel.Signature = signature_model
        var json = Util.trimJsonStringNumbers(JSON.stringify(transactionModel))
        console.log("String before hash: " + json)
        transactionModel.Hash = hash.current.hashString(json)
        let signature = sign.current.sign(keys.current.getKeypair, transactionModel.hash)
        signature_model.v = signature.recoveryParam
        signature_model.r = enc.current.convertToBase64(signature.r.toString())
        signature_model.s = enc.current.convertToBase64(signature.s.toString())
        transactionModel.Signature = signature_model
        const result = await apiRequest(Testnet.TRANSACTION_URL, 'POST', transactionModel, localStorage.getItem("bearer"));
        if (result.status == 200) {
            console.log("success")
            result.text().then(function (val){
                setAPIMessage(val)
            });
        }
        else {
            setMessage("Transaction Failed to send to Adrestus Network Please try again later")
        }
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
        } else {
            if (e.target.name == 'from') {
                setFormData({...formData, from: e.target.value});
            } else if (e.target.name == 'to') {
                setFormData({...formData, to: e.target.value});
            }
        }
        if (e.target.value.substring(0, 3) != "ADR") {
            if (e.target.name == 'from') {
                setFrom("from Address is invalid please type a correct Address")
                return;
            } else if (e.target.name == 'to') {
                setTo("to Address is invalid please type a correct Address")
                return;
            }
        } else {
            if (e.target.name == 'from') {
                setFormData({...formData, from: e.target.value});
            } else if (e.target.name == 'to') {
                setFormData({...formData, to: e.target.value});
            }
        }
        setAmount('')
    }

    const onAmountCheck = (e) => {
        e.preventDefault()
        var bill = Number(e.target.value);
        console.log(bill)
        if (isNaN(bill)) {
            setAmount("This field must be a number")
            setMoney(bill)
            document.getElementById("fees").value = bill * (10 / 100);
            return
        }

        if (balance < bill+(bill * (10 / 100))) {
            setAmount("Not sufficient balance")
            setMoney(bill)
            document.getElementById("fees").value = bill * (10 / 100);
            return;
        }
        setMoney(bill)
        document.getElementById("fees").value = bill * (10 / 100);
        setFormData({...formData, fees: bill * (10 / 100)});
        setAmount('');
    }


    return (
        <div className="mt-3 h-full w-full">
            <div id="mydiv"></div>
            <div
                className="h-[350px] w-full rounded-[20px] bg-gradient-to-br from-brandLinear to-blueSecondary md:h-[390px]"/>
            <div className="w-md:2/3 mx-auto h-full w-5/6 md:px-3  3xl:w-7/12">
                <div className="-mt-[280px] w-full pb-10 md:-mt-[240px] md:px-[70px]">
                </div>

                <Card
                    extra="max-w-[805px] md:max-w-[810px] md:w-[910px] h-max min-w-full mx-2.5 md:mx-auto mt-[150px] mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
                    {/*<div className="flex flex-row flex flex-nowrap justify-end mx-auto p-4 rounded-full border-gray-800 border-2 border-light-blue-500 border-opacity-50">*/}
                    <DashBoardContext.Provider value={{transaction, address}}>
                        <DashBoardNavBar
                            dropDown={dropDown}
                            setDropdown={setDropdown}
                            darkmode={darkmode}
                            setDarkmode={setDarkmode}
                        />
                        {stages == Stages.Stage1 &&
                            <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 content-between gap-4">
                                <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                    <Balance
                                        balance={balance}
                                        setBalance={setBalance}
                                    />
                                </div>
                                <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                    <Address address={address}/>
                                </div>
                                <div className="my-2 py-3 px-6 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                    <DashboardButtons
                                        setStages={setStages}/>
                                </div>
                                <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 h-full">
                                    <TransactionView/>
                                </div>
                                <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 h-full">
                                    <Market moedas={moedas}/>
                                </div>
                                <div className="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                    <Invoice address={address}/>
                                </div>
                            </div>
                        }
                    </DashBoardContext.Provider>
                    {stages == Stages.Stage2 &&
                        <TransactionSetup
                            setStages={setStages}
                            from={from}
                            setFrom={setFrom}
                            to={to}
                            setTo={setTo}
                            amount={amount}
                            setAmount={setAmount}
                            message={message}
                            setMessage={setMessage}
                            formData={formData}
                            setFormData={setFormData}
                            handleRegistration={handleRegistration}
                            onchange={onChangeText}
                            onAmountCheck={onAmountCheck}
                            APIMessage={APIMessage}
                            setAPIMessage={setAPIMessage}/>
                    }

                    {stages == Stages.Stage3 &&
                        <LockDashboard
                            setStages={setStages}
                            setMessage={setMessage}
                            setStatus={setStatus}
                            message={message}
                            password={password}
                        />
                    }
                </Card>

            </div>
        </div>
    );
}

export default Dashboard;