import React from "react";
import {MdAdd, MdAttachMoney, MdCached, MdMoreHoriz} from "react-icons/md";


function DashboardButtons(props) {
    return (
        <div>
            {/* Buttons */}
            <div className="mt-10 flex w-full justify-between px-3 md:justify-around xl:justify-between">
                <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-brand-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
                        <MdCached />
                    </button>
                    <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                        Transfer
                    </h5>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-yellow-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
                        <MdAdd />
                    </button>
                    <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                        Top Up
                    </h5>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-green-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
                        <MdAttachMoney />
                    </button>
                    <h5 className="mt-2 text-sm font-medium text-navy-700 dark:text-white">
                        Pay Bills
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default DashboardButtons;