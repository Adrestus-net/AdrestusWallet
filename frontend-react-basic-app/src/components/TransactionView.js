import React, {useContext, useEffect, useRef, useState} from "react";
import Card from "./card";
import Transaction from "./Transaction";
import {BsFillSendCheckFill} from "react-icons/bs";
import {RiUserReceived2Line} from "react-icons/ri";
import {MdOutlineSubscriptions, MdUnfoldMore} from "react-icons/md";
import {DashBoardContext} from "../pages/Dashboard";
import {FaMoneyBill1, FaMoneyBill1Wave} from "react-icons/fa6";
import {GiPayMoney, GiReceiveMoney} from "react-icons/gi";
import DateUtil from '../util/DateUtil.js'
function TransactionView(props) {
    const {transaction, address} = useContext(DashBoardContext)
    const [num, setNum] = useState(0);
    const [CurrentItems,setCurrentItems]=useState(null);

    const counter = useRef(5);
    const stepper = useRef(0);
    const divider = useRef(5);
    const SumLength = useRef(0);

    useEffect(() => {
        if(transaction==null)
            return

        if(transaction.from.length === 0 && transaction.to.length === 0)
            return;

        SumLength.current=transaction.from.length+transaction.to.length;
        if( SumLength<divider.current){
            setCurrentItems(transaction.from.concat(transaction.to))
        }
        else{
            stepper.current=SumLength/5;
            setCurrentItems(transaction.from.concat(transaction.to).slice(0, counter.current))
        }

    },[transaction])
    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        switch (rand) {
            case 1:
                return <BsFillSendCheckFill className="text-brand-500 dark:text-white"/>
            case 2:
                return <RiUserReceived2Line className="text-green-500 dark:text-white"/>
            case 3:
                return <MdOutlineSubscriptions className="text-yellow-500 dark:text-white"/>
            case 4:
                return <FaMoneyBill1 className="text-orange-500 dark:text-white"/>
            case 5:
                return <GiPayMoney className="text-brand-500 dark:text-white"/>
            case 6:
                return <GiReceiveMoney className="text-brand-500 dark:text-white"/>
            case 7:
                return <FaMoneyBill1Wave className="text-green-500 dark:text-white"/>

        }
    }

    const onViewMore = (e) => {
        if(stepper.current===1){
            setCurrentItems(transaction.from.concat(transaction.to).slice(counter.current, SumLength.current))
            return
        }
        var local_stepper=counter.current/divider.current;
        if(local_stepper===stepper.current){
            setCurrentItems(transaction.from.concat(transaction.to).slice(0, SumLength.current))
        }
        else {
            setCurrentItems(transaction.from.concat(transaction.to).slice(0, counter.current + 5))
            counter.current=counter.current+5
        }
    }
    return (
        // <div className={`flex justify-between ${mb} mt-2 items-center px-1`}>
        <Card
            // extra={
            //     "w-full h-4/5 overflow-y auto hover:overflow-y-scroll  py-4 px-[33px] mx-1"
            // }
            extra={
                "w-full h-4/5 py-4 px-[33px] mx-1"
            }
        >
            <h5 className="mt-[15px] ml-2 text-lg font-bold text-navy-700 dark:text-white">
                Your transactions
            </h5>

            <div className="relative mt-9">
                {transaction == null &&
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                    </div>
                }
                {transaction != null && transaction.from.length === 0 && transaction.to.length === 0 &&
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                    </div>
                }
                {CurrentItems != null && CurrentItems.sort(function (a, b) {
                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                }).map((item) =>
                    item.from === address ?
                        <Transaction
                            title="Transmit"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"-$" + item.amount}
                            mb="mb-[20px]"
                            icon={randomNumberInRange(1, 7)}
                            status='accepted'
                        /> :
                        <Transaction
                            title="Receive"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"+$" + item.amount}
                            mb="mb-[20px]"
                            icon={randomNumberInRange(1, 7)}
                            status='accepted'
                        />
                )}
                {CurrentItems != null &&
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={event => onViewMore(event)} className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-yellow-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
                            <MdUnfoldMore />
                        </button>
                        <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                            View More
                        </h5>
                    </div>
                }
                {/*<Transaction*/}
                {/*    title="Public Transport"*/}
                {/*    date="22/07/2022"*/}
                {/*    sum="+$15.50"*/}
                {/*    mb="mb-[20px]"*/}
                {/*    icon={*/}
                {/*        <BsFillSendCheckFill className="text-brand-500 dark:text-white" />*/}
                {/*    }*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Grocery Store"*/}
                {/*    date="18 September 2022"*/}
                {/*    sum="-$42.28"*/}
                {/*    mb="mb-[30px]"*/}
                {/*    icon={*/}
                {/*        <RiUserReceived2Line className="text-green-500 dark:text-white" />*/}
                {/*    }*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Public Transport"*/}
                {/*    date="15 September 2022"*/}
                {/*    sum="-$11.37"*/}
                {/*    mb="mb-[30px]"*/}
                {/*    icon={*/}
                {/*        <MdOutlineSubscriptions className="text-yellow-500 dark:text-white" />*/}
                {/*    }*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Netflix"*/}
                {/*    date="12 September 2022"*/}
                {/*    sum="-$34.90"*/}
                {/*    mb="mb-[30px]"*/}
                {/*    icon={<RiNetflixFill className="text-red-500 dark:text-white" />}*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Drink Store"*/}
                {/*    date="09 September 2022"*/}
                {/*    sum="-$5.21"*/}
                {/*    mb="mb-[20px]"*/}
                {/*    icon={<MdLocalBar className="text-brand-500 dark:text-white" />}*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Drink Store"*/}
                {/*    date="09 September 2022"*/}
                {/*    sum="-$5.21"*/}
                {/*    mb="mb-[20px]"*/}
                {/*    icon={<MdLocalBar className="text-brand-500 dark:text-white" />}*/}
                {/*    status='rejected'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Apartment Debt"*/}
                {/*    date="05 September 2022"*/}
                {/*    sum="-$314.90"*/}
                {/*    mb="mb-[30px]"*/}
                {/*    icon={<MdOutlineWeekend className="text-green-500 dark:text-white" />}*/}
                {/*    status='accepted'*/}
                {/*/>*/}
                {/*<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">*/}
                {/*    <p className="text-lg font-medium text-gray-800">Empty transactions</p>*/}
                {/*</div>*/}
            </div>
        </Card>
    );
}

export default TransactionView;