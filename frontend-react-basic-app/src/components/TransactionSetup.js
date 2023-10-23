import Dropdown from "./Dropdown";
import React, {useState,useEffect} from "react";
import SolidSubtleAlert from "./SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";
import InputField from "./fields/InputField";
import {useNavigate} from "react-router-dom";
import Stages from "../util/Stages";
import {BsFillCheckCircleFill} from "react-icons/bs";
const TransactionSetup = (props) => {
    const {setStages,from,setFrom, to,setTo, amount,setAmount, message,setMessage,formData,setFormData, handleRegistration, onchange, onAmountCheck,APIMessage,setAPIMessage} = props;
    const [isfromOpened, setIsfromOpened] = useState(false);
    const [fromdropDown, setFromDropdown] = React.useState('From Zone 0');
    const [istoOpened, setIstoOpened] = useState(false);
    const [todropDown, setToDropdown] = React.useState('To Zone 0');


    function onBackClick()
    {
        setAPIMessage("");
        setStages(Stages.Stage1)
    }
    function togglefrom(event, bool, val) {
        setIsfromOpened(bool);
        if (val != '')
            setFromDropdown(val)

        if(val==='From Zone 0')
            setFormData({...formData,  zoneFrom: 0});
        else if(val==='From Zone 1')
            setFormData({...formData,  zoneFrom: 1});
        else if(val==='From Zone 2')
            setFormData({...formData, zoneFrom: 2});
        else if(val==='From Zone 3')
            setFormData({...formData, zoneFrom: 3});
    }

    function toggleto(event, bool, val) {
        setIstoOpened(bool);
        if (val != '')
            setToDropdown(val)

        if(val==='To Zone 0')
            setFormData({...formData,  zoneTo: 0});
        else if(val==='To Zone 1')
            setFormData({...formData,  zoneTo: 1});
        else if(val==='To Zone 2')
            setFormData({...formData, zoneTo: 2});
        else if(val==='To Zone 3')
            setFormData({...formData, zoneTo: 3});
    }

    return (
        <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
            {/* Header */}
            <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
                Transaction Info
            </h4>

            {/* content */}

            <form onSubmit={handleRegistration}>
                <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 content-between gap-4 mt-7">
                    <InputField
                        extra="mb-3"
                        label="from"
                        placeholder="Sender Address"
                        id="from"
                        type="text"
                        onchange={onchange}
                        readonly={false}
                        result={from}
                        setResult={setFrom}
                    />
                    <InputField
                        extra="mb-3"
                        label="to"
                        placeholder="Recipient Address"
                        id="to"
                        type="text"
                        onchange={onchange}
                        readonly={false}
                        result={to}
                        setResult={setTo}
                    />
                    <div className="mx-4 my-2 justify-self-center">
                        <Dropdown
                            button={
                                <button id="togglefrom"
                                        onClick={(event) => togglefrom(event, true, '')}
                                        onMouseEnter={(event) => togglefrom(event, true, '')}
                                        data-dropdown-toggle="dropdown"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                                                <a onClick={(event) => togglefrom(event, false, "From Zone 0")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">From Zone
                                                    0</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "From Zone 1")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">From Zone
                                                    1</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "From Zone 2")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">From Zone
                                                    2</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => togglefrom(event, false, "From Zone 3")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">From Zone
                                                    3</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            classNames={"py-2 top-4 -left-[130px] md:-left-[140px] w-max"}
                        />
                    </div>
                    <div className="mx-4 my-2 justify-self-center">
                        <Dropdown
                            button={
                                <button id="toggleto"
                                        onClick={(event) => toggleto(event, true, '')}
                                        onMouseEnter={(event) => toggleto(event, true, '')}
                                        data-dropdown-toggle="dropdown"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button">{todropDown}
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
                                istoOpened && (
                                    <div id="dropdown"
                                         className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                        <ul className="py-2 text-sm text-center text-gray-900 dark:text-gray-200"
                                            aria-labelledby="dropdownDefaultButton">
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => toggleto(event, false, "To Zone 0")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white"> To Zone
                                                    0</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => toggleto(event, false, "To Zone 1")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">To Zone
                                                    1</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => toggleto(event, false, "To Zone 2")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">To Zone
                                                    2</a>
                                            </li>
                                            <li className="hover:cursor-pointer">
                                                <a onClick={(event) => toggleto(event, false, "To Zone 3")}
                                                   className="block px-4 py-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-900 dark:hover:text-white">To Zone
                                                    3</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            classNames={"py-2 top-4 -left-[130px] md:-left-[140px] w-max"}
                        />
                    </div>
                    <InputField
                        extra="mb-3"
                        label="Amount"
                        placeholder="Amount"
                        id="Amount"
                        type="text"
                        onchange={onAmountCheck}
                        readonly={false}
                        result={amount}
                        setResult={setAmount}
                    />
                    <InputField
                        extra="mb-3"
                        label="fees"
                        placeholder="fees"
                        id="fees"
                        type="text"
                        readonly={true}
                        result=''
                    />
                    {message !== "" &&
                        <div class="col-span-2">
                            <SolidSubtleAlert
                                title="Transaction General Error"
                                description={message}
                                icon={<AiFillExclamationCircle/>}
                                iconColor="text-white dark:!text-navy-900"
                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                bg="bg-red-500 dark:!bg-red-300"
                                mb="pt-2 pb-2"
                                solid="solid"
                                setResult={setMessage}
                            />
                        </div>
                        }
                        {APIMessage !== "" &&
                            <div class="col-span-2">
                            <SolidSubtleAlert
                                title="Transaction send Successful to Adrestus Network"
                                description={APIMessage}
                                icon={<BsFillCheckCircleFill/>}
                                iconColor="text-white dark:!text-navy-900"
                                bg="bg-green-500 dark:!bg-green-300"
                                mb="mb-6"
                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                solid="solid"
                                setResult={setAPIMessage}
                            />
                            </div>
                        }
                    <div>
                        <button
                            onClick={onBackClick}
                            className="w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                            Back
                        </button>
                    </div>
                    <div>
                        <button type="submit" className="w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                            Submit Transaction
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TransactionSetup;
