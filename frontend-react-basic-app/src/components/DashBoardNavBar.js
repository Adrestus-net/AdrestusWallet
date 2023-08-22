import logo from "../assets/img/others/Adrestus.png";
import Dropdown from "./Dropdown";
import {IoMdNotificationsOutline} from "react-icons/io";
import {BsArrowBarUp} from "react-icons/bs";
import {RiMoonFill, RiSunFill} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import React, {useContext, useState, useEffect, useRef} from "react";
import {DashBoardContext} from "../pages/Dashboard";
import DateUtil from "../util/DateUtil";

const DashBoardNavBar= (props) => {
    const {transaction, address} = useContext(DashBoardContext)
    const {dropDown, setDropdown, darkmode, setDarkmode} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [isNotificationBell, setisNotificationBell] = useState(true);
    const transaction_arrays = useRef(new Array(3));
    function toggle(event,bool,val) {
        setIsOpened(bool);
        if(val!='')
            setDropdown(val)
    }
    useEffect(() => {
        if(transaction==null)
            return;

        if(transaction_arrays.current===null) {
            transaction.from.concat(transaction.to).sort(function (a, b) {
                return Date.parse(b.timestamp) - Date.parse(a.timestamp);
            }).slice(0, 3).map((item) =>   transaction_arrays.current.push(item))
            return;
        }


        var temp_arr=[]
        transaction.from.concat(transaction.to).sort(function (a, b) {
            return Date.parse(b.timestamp) - Date.parse(a.timestamp);
        }).slice(0, 3).map((item) =>   temp_arr.push(item))
        if(JSON.stringify(transaction_arrays.current)===JSON.stringify(temp_arr)){
            setisNotificationBell(false)
        }
        else {
            console.log(temp_arr)
            console.log(transaction_arrays.current)
            setisNotificationBell(true)
        }
    }, [transaction]); // <- add the count variable here

    function getShortenStartAddress(val){
        const str=String(val)
        return str.substring(0,23)
    }
    function getShortenEndAddress(val){
        const str=String(val)
        return str.substring(49,str.length)
    }

    function NotificationClick() {
        transaction_arrays.current.splice(0,  transaction_arrays.current.length);
        transaction.from.concat(transaction.to).sort(function (a, b) {
            return Date.parse(b.timestamp) - Date.parse(a.timestamp);
        }).slice(0, 3).map((item) =>   transaction_arrays.current.push(item))
         setisNotificationBell(false)
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mx-auto p-10 rounded-full border-gray-800 border-2 border-light-blue-500 border-opacity-50">
            {/*Adrestus Log left bar*/}
            <div className="md:col-span-10 lg:col-span-10 xl:col-span-10 ">
                <a href="https://www.adrestus.net/" className="flex items-center">
                    <img src={logo} className="h-20 mr-3"
                         alt="Adrestus Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Adrestus</span>
                </a>
            </div>

            {/*Network Drop down list*/}
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 self-center flex flex-row flex flex-nowrap justify-end gap-6 ml-7 ">
                <div className="self-start">
                    <Dropdown
                        button={
                            <button id="dropdownDefaultButton"
                                    onClick={(event) => toggle(event,true,'')}
                                    onMouseEnter={(event) => toggle(event,true,'')}
                                    data-dropdown-toggle="dropdown"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button">{dropDown}
                                <svg className="w-1.5 h-1.5 ml-1.5"
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
                            isOpened &&(
                            <div id="dropdown" className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                <ul className="py-2 text-sm text-gray-900 dark:text-gray-200"
                                    aria-labelledby="dropdownDefaultButton">
                                    <li className="hover:cursor-pointer">
                                        <a onClick={(event) => toggle(event,false,"Testnet")}
                                           className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Testnet</a>
                                    </li>
                                    <li className="hover:cursor-pointer">
                                        {/*<a onClick={(event) => setDropdown('Mainet')}*/}
                                        <a onClick={(event) => toggle(event,false,"Mainet")}
                                           className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">Mainet</a>
                                    </li>
                                </ul>
                            </div>
                            )
                        }
                        classNames={"py-2 top-4 -left-[130px] md:-left-[140px] w-max"}
                    />
                </div>

                {/*Notifications Section*/}
                <div className="cursor-pointer self-center text-gray-600">
                    <Dropdown
                        button={
                            <p className="cursor-pointer">
                                <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white"/>
                                {isNotificationBell &&
                                <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
                                }
                            </p>
                        }
                        animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                        children={
                            <div
                                className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-bold text-navy-700 dark:text-white">
                                        Notification
                                    </p>
                                    <p onClick={NotificationClick} className="text-sm font-bold text-navy-700 dark:text-white">
                                        Mark all read
                                    </p>
                                </div>
                                {transaction != null && transaction.from.concat(transaction.to).sort(function (a, b) {
                                    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                                }).slice(0, 3).map((item) =>
                                <button className="flex w-full items-center">
                                    <div
                                        className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                                        <BsArrowBarUp/>
                                    </div>
                                    <div
                                        className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                                        <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                                            Transaction: {DateUtil.UtcToLocal(item.timestamp.split('T')[0])}
                                        </p>
                                        <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                                            From {getShortenStartAddress(item.from)}....{getShortenEndAddress(item.from)}
                                        </p>
                                        <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                                            To {getShortenStartAddress(item.to)}....{getShortenEndAddress(item.to)}
                                        </p>
                                    </div>
                                </button>
                                )}

                                {/*<button className="flex w-full items-center">*/}
                                {/*    <div*/}
                                {/*        className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">*/}
                                {/*        <BsArrowBarUp/>*/}
                                {/*    </div>*/}
                                {/*    <div*/}
                                {/*        className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">*/}
                                {/*        <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">*/}
                                {/*            New Update: Horizon UI Dashboard PRO*/}
                                {/*        </p>*/}
                                {/*        <p className="font-base text-left text-xs text-gray-900 dark:text-white">*/}
                                {/*            A new update for your downloaded item is available!*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</button>*/}
                            </div>
                        }
                        classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
                    />
                </div>

                {/*Button change background color*/}
                <div
                    className="cursor-pointer self-center text-gray-600"
                    onClick={() => {
                        if (darkmode) {
                            document.body.classList.remove("dark");
                            setDarkmode(false);
                        } else {
                            document.body.classList.add("dark");
                            setDarkmode(true);
                        }
                    }}
                >
                    {darkmode ? (
                        <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white"/>
                    ) : (
                        <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white"/>
                    )}
                </div>

                {/* Profile & Dropdown */}
                <div className="cursor-pointer self-center text-gray-600">
                    <Dropdown
                        button={
                            <span className="cursor-pointer"><CgProfile/></span>
                        }
                        children={
                            <div
                                className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                <div className="mt-3 ml-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                                            👋 Hey, Adela
                                        </p>{" "}
                                    </div>
                                </div>
                                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 "/>

                                <div className="mt-3 ml-4 flex flex-col">
                                    <a
                                        href=" "
                                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        Profile Settings
                                    </a>
                                    <a
                                        href=" "
                                        className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                                    >
                                        Newsletter Settings
                                    </a>
                                    <a
                                        href=" "
                                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                                    >
                                        Log Out
                                    </a>
                                </div>
                            </div>
                        }
                        classNames={"py-2 top-8 -left-[180px] w-max"}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashBoardNavBar;
