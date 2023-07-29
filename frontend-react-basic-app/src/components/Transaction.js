import React from "react";

function Transaction(props) {
    const {title, date, sum, icon, mb, status} = props;

    return (
        <>
            <div className={`flex flex-row sm:flex-row justify-between ${mb} mt-2 items-center px-1`}>
                <div className="flex items-center gap-3">
                    <div
                        className="first-letter flex items-center justify-center rounded-full bg-lightPrimary p-2.5 text-xl text-brand-500 dark:bg-navy-700 dark:text-white">
                        {icon}
                    </div>
                    <div>
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            {" "}
                            {title}{" "}
                        </h5>
                        <p className="text-xs font-medium text-gray-800"> {date}</p>
                    </div>
                </div>
                {/*<div className="sm:min-w-[900px] md:min-w-[150px] lg:min-w-[unset]">*/}
                <div className="">
                    <div
                        className={`flex w-[85px] items-center justify-center rounded-[10px] py-1.5 text-sm font-bold uppercase ${
                            status === "rejected"
                                ? "bg-red-100 text-red-500 dark:bg-red-50"
                                : "bg-green-100 text-green-500 dark:bg-green-50"
                        }`}
                    >
                        {status}
                    </div>
                </div>
                <div
                    className={`flex items-center justify-center rounded-xl px-2.5 py-1 ${
                        sum[0] === "-"
                            ? "bg-red-50 text-red-500"
                            : "bg-green-50 text-green-500"
                    }`}
                >
                    <p className="text-sm font-bold"> {sum} </p>
                </div>
            </div>
        </>
    );
}

export default Transaction;
