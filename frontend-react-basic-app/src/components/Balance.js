import React, {useContext, useState} from "react";
import {GiPayMoney} from "react-icons/gi";
import CardMenu from "./CardMenu";
import Card from "./card";
import Transaction from "./Transaction";
import {DashBoardContext} from "../pages/Dashboard";
import {FaMoneyBill1Wave} from "react-icons/fa6";
import DateUtil from "../util/DateUtil";
import Dropdown from "./Dropdown";
import BalanceModel from '../model/BalanceModel.js'
import apiRequest from "../Services/apiRequest";
import Testnet from "../config/Testnet";

const Balance = (props) => {
    const {balance,setBalance} = props
    const {transaction, address} = useContext(DashBoardContext)
    const [isfromOpened, setIsfromOpened] = useState(false);
    const [fromdropDown, setFromDropdown] = React.useState('Balance Zone 0');

    async function togglefrom(event, bool, val) {
        setIsfromOpened(bool);
        if (val != '')
            setFromDropdown(val)

        const balancemodel = new BalanceModel()
        if (val === 'Balance Zone 0') {
            balancemodel.Address = address
            balancemodel.Zone = 0
        } else if (val === 'Balance Zone 1') {
            balancemodel.Address = address
            balancemodel.Zone = 1
        } else if (val === 'Balance Zone 2') {
            balancemodel.Address = address
            balancemodel.Zone = 2
        } else if (val === 'Balance Zone 3') {
            balancemodel.Address = address
            balancemodel.Zone = 3
        }

        const result = await apiRequest(Testnet.BALANCE_URL, 'POST', balancemodel, localStorage.getItem("bearer"));
        if (result.status == 200) {
            result.text().then(function (val){
                setBalance(val)
            });
        }
    }

    return (
        <Card extra={"p-4 h-full"}>
            <div
                className={`bg-image relative mt-[7px] flex h-fit w-full justify-between rounded-xl bg-brand-900 bg-ballanceDashboard bg-cover bg-right px-3 py-4 text-white dark:bg-navy-700`}
                bgSize="cover"
            >
                <div class="flex flex-col flex-wrap content-center">
                    <div class="flex-row flex-wrap justify-end">
                        <div>
                            <h5 className="px-6 text-[28px] !font-bold [word-spacing:55px]">{balance} ADR</h5>
                        </div>
                    </div>
                    <div class="flex-row flex-wrap justify-end">
                        <Dropdown
                            button={
                                <button id="togglefrom"
                                        onClick={(event) => togglefrom(event, true, '')}
                                        onMouseEnter={(event) => togglefrom(event, true, '')}
                                        data-dropdown-toggle="dropdown"
                                        className="text-white bg-brand-900 bg-ballanceDashboard bg-cover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button">{fromdropDown}
                                    <svg className="w-2.5 h-2.5 ml-2.5"
                                         aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 10 6">
                                        {/*<span>{<PiDotOutlineFill/>}</span>*/}
                                        <path stroke="currentColor" stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                            }
                            animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                            children={
                                isfromOpened && (
                                    <div id="dropdown"
                                         className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                        <ul className="py-2 text-sm text-center text-gray-900 dark:text-gray-200"
                                            aria-labelledby="dropdownDefaultButton">
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "Balance Zone 0")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Balance
                                                    Zone
                                                    0</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "Balance Zone 1")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Balance
                                                    Zone
                                                    1</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "Balance Zone 2")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Balance
                                                    Zone
                                                    2</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "Balance Zone 3")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Balance
                                                    Zone
                                                    3</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            classNames={"py-2 top-4 -left-[130px] md:-left-[140px] w-max"}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-end text-white">
                    <CardMenu transparent/>
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
                {transaction != null && transaction.from.concat(transaction.to).length <= 3 && transaction.from.concat(transaction.to).sort(function (a, b) {
                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                }).map((item) =>
                    item.from === address ?
                        <Transaction
                            title="Bill & Taxes"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"-$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <FaMoneyBill1Wave className="text-brand-500 dark:text-white"/>
                            }
                            status='accepted'
                        /> :
                        <Transaction
                            title="Receive"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"+$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <GiPayMoney className="text-brand-500 dark:text-white"/>
                            }
                            status='accepted'
                        />
                )}
                {transaction != null && transaction.from.concat(transaction.to).length > 3 && transaction.from.concat(transaction.to).sort(function (a, b) {
                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                }).slice(0, 3).map((item) =>
                    item.from === address ?
                        <Transaction
                            title="Bill & Taxes"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"-$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <FaMoneyBill1Wave className="text-brand-500 dark:text-white"/>
                            }
                            status='accepted'
                        /> :
                        <Transaction
                            title="Receive"
                            date={DateUtil.UtcToLocal(item.timestamp)}
                            sum={"+$" + item.amount}
                            mb="mb-[20px]"
                            icon={
                                <GiPayMoney className="text-brand-500 dark:text-white"/>
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
