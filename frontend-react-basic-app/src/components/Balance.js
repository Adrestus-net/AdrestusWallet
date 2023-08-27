import React, {useContext} from "react";
import { MdOutlineHomeWork } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
import {GiGraduateCap, GiPayMoney} from "react-icons/gi";
import CardMenu from "./CardMenu";
import Card from "./card";
import Transaction from "./Transaction";
import {DashBoardContext} from "../pages/Dashboard";
import {FaMoneyBill1Wave} from "react-icons/fa6";
import DateUtil from "../util/DateUtil";
const Balance = (props) => {
    const {balance}=props
    const {transaction, address} = useContext(DashBoardContext)
    return (
        <Card extra={"p-4 h-full"}>
            <div
                className={`bg-image relative mt-[7px] flex h-fit w-full justify-between rounded-xl bg-brand-900 bg-ballanceDashboard bg-cover bg-right px-3 py-4 text-white dark:bg-navy-700`}
                bgSize="cover"
            >
                <div>
                    <p className="text-sm font-medium">ADR Balance </p>
                    <h5 className="text-[34px] !font-bold [word-spacing:25px]">{balance} ADR</h5>
                </div>
                <div className="flex flex-col items-end text-white">
                    <CardMenu transparent />
                    <div className="mt-3 text-lg">
                        <svg
                            width="41"
                            height="20"
                            viewBox="0 0 61 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 8.2C1.70238 11.8 4.5 18.5 11 18C17.5 17.5 18.2786 1 29.6571 1C41.0357 1 41.0357 20.0286 60 3.57143"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <p className="mt-[19px] text-sm font-medium text-gray-600">Recent</p>

            {/* Bill section */}
            <div className="relative flex flex-col flex-wrap mt-[1px] gap-4">
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
                {transaction != null && transaction.from.concat(transaction.to).length<=3 && transaction.from.concat(transaction.to).sort(function (a, b) {
                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                }).map((item) =>
                    item.from === address ?
                        <Transaction
                            title="Bill & Taxes"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"-$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <FaMoneyBill1Wave className="text-brand-500 dark:text-white" />
                            }
                            status='accepted'
                        /> :
                        <Transaction
                            title="Receive"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"+$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <GiPayMoney className="text-brand-500 dark:text-white" />
                            }
                            status='accepted'
                        />
                )}
                {transaction != null && transaction.from.concat(transaction.to).length>3 && transaction.from.concat(transaction.to).sort(function (a, b) {
                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                }).slice(0,3).map((item) =>
                    item.from === address ?
                        <Transaction
                            title="Bill & Taxes"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"-$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <FaMoneyBill1Wave className="text-brand-500 dark:text-white" />
                            }
                            status='accepted'
                        /> :
                        <Transaction
                            title="Receive"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"+$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <GiPayMoney className="text-brand-500 dark:text-white" />
                            }
                            status='accepted'
                        />
                )}
                {/*<Transaction*/}
                {/*    title="Bill & Taxes"*/}
                {/*    date="Today, 16:36"*/}
                {/*    sum="-$154.50"*/}
                {/*    mb="mb-[20px]"*/}
                {/*    icon={*/}
                {/*        <MdOutlineHomeWork className="text-brand-500 dark:text-white" />*/}
                {/*    }*/}
                {/*    status='accepted'*/}
                {/*/>*/}

                {/*<Transaction*/}
                {/*    title="Car Energy"*/}
                {/*    date="23 Jun, 13:06"*/}
                {/*    sum="-$40.50"*/}
                {/*    mb="mb-[20px]"*/}
                {/*    icon={<MdElectricCar className="text-green-500 dark:text-white" />}*/}
                {/*    status='accepted'*/}
                {/*/>*/}
                {/*<Transaction*/}
                {/*    title="Design Course"*/}
                {/*    date="21 Jun, 19:04"*/}
                {/*    sum="-$70.00"*/}
                {/*    mb="mb-[5px]"*/}
                {/*    icon={<GiGraduateCap className="text-yellow-500 dark:text-white" />}*/}
                {/*    status='accepted'*/}
                {/*/>*/}
            </div>
        </Card>
    );
}

export default Balance;
