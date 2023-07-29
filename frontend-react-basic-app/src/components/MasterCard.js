import React from "react";
import bgMaster from "../assets/img/dashboards/Debit.png";
import {RiMastercardFill} from "react-icons/ri";

function MasterCard(props) {
    const {number, CCV, expDate} = props;
    return (
        <div
            style={{backgroundImage: `url(${bgMaster})`}}
            className="w-full min-w-full rounded-xl bg-cover bg-no-repeat py-2 px-[20px]"
        >
            <div className="flex items-center justify-between pt-3">
                <h2 className="text-2xl font-bold text-white">Adrestus Wallet.</h2>
                <div className="text-[50px] text-white">
                    <RiMastercardFill/>
                </div>
            </div>
            <div className="flex flex-row flex-nowrap">
                <h3 className="mt-[40px] sm:break-all font-bold text-base line-clamp-2 text-center text-white">{number}</h3>
            </div>
            {/* Card info */}
            <div className="mt-3 flex justify-between [28px]">
                <div>
                    <h5 className="text-xs font-extralight text-white">VALID THRU</h5>
                    <p className="text-sm font-medium text-white"> {expDate} </p>
                </div>
                <div>
                    <h5 className="text-xs font-medium text-white">CVV</h5>
                    <p className="text-sm font-medium text-white"> {CCV} </p>
                </div>
            </div>
        </div>
    );
}

export default MasterCard;
