import {PiArrowCircleRightFill} from "react-icons/pi";
import {useEffect, useState} from "react";

const ActionButtons = (props) => {
    const {mb, date, sum, name, action, actionName, address, from, to, item} = props;
    const [showModal, setShowModal] = useState(false);

    function getShortenStartAddress(val) {
        const str = String(val)
        return str.substring(0, 23)
    }

    function getShortenEndAddress(val) {
        const str = String(val)
        return str.substring(49, str.length)
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleXClick = () => {
        closeModal();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("Hi, this is copied text");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains("modal-backdrop") && showModal) {
                closeModal();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            <div className={`flex items-center justify-between ${mb}`} onClick={openModal}>
                <div className="hover:cursor-pointer">
                    <p className="text-base font-bold text-navy-700 dark:text-white">
                        {date}
                    </p>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col flex-wrap justify-between gap-4">
                        <div>
                            {/*<p className="[word-spacing:10px] text-sm text-gray-700"> From ADR-GBXZ-Z5UR-3UVR-6XUE....VLBJ</p>*/}
                            <p className="[word-spacing:10px] text-sm text-slate-500 group-hover:text-white"> From {getShortenStartAddress(from)}....{getShortenEndAddress(from)}</p>
                        </div>
                        <div className="self-center">
                            <PiArrowCircleRightFill className="text-green-500 dark:text-white"/>
                        </div>
                        <div>
                            <p className="[word-spacing:10px] text-sm text-slate-500 group-hover:text-white"> To {getShortenStartAddress(to)}....{getShortenEndAddress(to)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 md:hover:cursor-pointer">
                    <p className="text-md font-medium text-navy-700 dark:text-white">
                        {sum}
                    </p>
                    <button
                        onClick={action}
                        className="flex items-center justify-center rounded-full bg-lightPrimary px-5 py-3 text-sm font-medium text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    >
                        {actionName}
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 w-full">
                    <div className="bg-black bg-opacity-90 absolute inset-0 modal-backdrop"></div>
                    <div className="bg-white rounded-lg absolute flex flex-col items-center pb-3">
                        {/* Modal content */}
                        <div className="relative py-2 w-full">
                            <span className="">Activity Details</span>
                            <button className="absolute right-5" onClick={handleXClick}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 items-center border-t py-3">
                            <div className="flex flex-row w-full justify-between px-3">
                                <div className="flex flex-col gap-1 justify-center items-start">
                                    <div className="flex flex-row gap-1">
                                        <span className="font-bold text-[16px]">Transfer ADR</span>
                                        <span className="rounded-[10px] py-[1px] px-2 text-sm font-bold uppercase bg-green-100 text-green-500 dark:bg-green-50">
                      Success
                    </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                    {date}
                  </span>
                                    {/* today */}
                                </div>
                                <div className="flex flex-row items-center gap-2">
                  <span
                      onClick={handleCopy}
                      className=" rounded-full p-2 bg-gray-200 hover:bg-gray-400 hover:cursor-pointer"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                      />
                    </svg>
                  </span>
                                    <span
                                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-400 hover:cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </span>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className=" rounded-lg border pt-3 w-full flex flex-col gap-3">
                                    <div className="flex flex-row gap-2 justify-center w-full">
                                        <img
                                            src="test-logo.jpg"
                                            className="rounded-full w-6 h-6"
                                            alt="logo"
                                        />
                                        <span className="font-bold">{item.amount} ADR</span>
                                    </div>
                                    <div className="flex flex-row gap-5 justify-between items-center px-2">
                                        <div
                                            className="flex flex-col justify-center bg-gray-300/80 py-1 px-2 rounded-lg">
                                            <span className=" text-md font-semibold">Account #1</span>
                                            <span className=" text-sm">
                        Adrestus: ${from.substring(0, 5)}...$
                                                {from.substring(from.length - 5)}
                      </span>
                                        </div>
                                        <div className=" text-blue-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className="flex flex-col justify-center bg-gray-300/80 py-1 px-2 rounded-lg">
                                            <span className=" text-md font-semibold">Recipient</span>
                                            <span className=" text-sm">
                        Adrestus: ${to.substring(0, 5)}...$
                                                {to.substring(from.length - 5)}
                      </span>
                                        </div>
                                    </div>
                                    <div
                                        className=" bg-gray-100/80 mt-2 w-full rounded-b-lg px-5 py-4 flex flex-col items-start gap-3">
                    <span className=" text-[12px] font-medium">
                      TRANSACTION FEE
                    </span>
                                        <span className="text-[16px] font-bold">{item.amountWithTransactionFee} ADR</span>
                                        <hr className="w-full py-[1px] bg-blue-400 opacity-100 h-[1px]"/>
                                        <div
                                            className="flex flex-row justify-between pr-2 pl-1 w-full items-center pt-2">
                                            <span className="text-sm">TRANSACTION DATA</span>
                                            <span className="text-blue-500 text-sm font-semibold">
                        SHOW
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionButtons;
