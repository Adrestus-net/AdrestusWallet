import React from "react";
//assets
import Card from "./card";
import PopoverHorizon from "./PopoverHorizon";
import MasterCard from "./MasterCard";

const Address = (props) => {
    const {address}=props
    function getDate(){
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        return utc.toString();
    }
    return (
        <Card
            extra={"cursor-pointer bg-brand-500 hover:bg-brand-400 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 rounded-xl my-2 px-10 py-13 text-base font-medium text-white transition duration-200 dark:text-white flex flex-col h-fit 3xl:h-full px-1 pt-1 2xl:pb-5"}>
            {/* MasterCard */}
            {/* Card bellow info */}
            <PopoverHorizon
                trigger={
                    <div className="w-96">
                        <div
                            onClick={(event) => navigator.clipboard.writeText(address)}
                            className="sm:w-11 md:w-12 lg:w-12 min-w-fit max-w-sm mt-[25px] px-[2px] md:px-10 xl:px-1">
                            <MasterCard number={address} CCV="ADR" expDate={`${getDate()}`}/>
                        </div>
                        <div className="mt-8 w-full rounded-xl bg-lightPrimary px-3 py-3 dark:bg-navy-700">
                            <h5 className="text-sm font-bold text-navy-700 dark:text-white">
                                Use for added security online
                            </h5>
                            <p className="text-sm font-medium text-gray-600">
                                The card number is refreshed automatically after each use. Each number
                                cand be used only once.
                            </p>
                        </div>
                    </div>
                }
                content={<p className="text-center text-sm font-medium text-gray-600">Copy Address.</p>}
               />
        </Card>
    );
}

export default Address;
