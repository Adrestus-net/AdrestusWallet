import Card from "./card";
import ActionButtons from "./ActionButtons";
import React, {useContext, useEffect, useRef, useState} from "react";
import {DashBoardContext} from "../pages/Dashboard";
import DateUtil from '../util/DateUtil.js'
import {MdUnfoldMore} from "react-icons/md";
const Invoice = (props) => {
    const {transaction,address} = useContext(DashBoardContext)
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
        <Card extra={"px-9 w-full h-full pt-[12px] pb-2"}>
            {/* Header */}
            <div className="mb-8 mt-3 flex items-center justify-between gap-3 ">
                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                    Invoices
                </h5>
                <h5 className="font-bold text-brand-500 hover:cursor-pointer dark:text-white">
                    See all invoices
                </h5>
            </div>
            {transaction == null &&
                <div className="flex items-center justify-between gap-3">
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
                <ActionButtons
                    mb="hover:bg-brand-100 group-hover:text-white mb-[42px] -mx-1"
                    name="SIM76-#024214"
                    date={DateUtil.UtcToLocal(item.timestamp.split('T')[0])}
                    sum={"$"+item.amount}
                    actionName="View Explorer"
                    address={address}
                    from={item.from}
                    to={item.to}
                    item={item}
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
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px] -mx-1"*/}
            {/*    name="SIM76-#024214"*/}
            {/*    date="January, 14 2022"*/}
            {/*    sum="$997"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px] -mx-1"*/}
            {/*    name="SIM23-#024213"*/}
            {/*    date="January, 03 2022"*/}
            {/*    sum="$233"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM42-#024212"*/}
            {/*    date="December, 29 2021"*/}
            {/*    sum="$342"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM93-#024211"*/}
            {/*    date="November, 30 2021"*/}
            {/*    sum="$798"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM13-#024210"*/}
            {/*    date="September, 07 2021"*/}
            {/*    sum="$844"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
        </Card>
    );
};

export default Invoice;
