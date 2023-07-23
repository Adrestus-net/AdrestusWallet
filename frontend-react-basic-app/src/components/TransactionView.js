import React from "react";
import Transaction from "./Transaction";
import {
    MdLocalBar,
    MdOutlineDirectionsBus,
    MdOutlineShoppingBasket,
    MdOutlineSubscriptions,
    MdOutlineWeekend
} from "react-icons/md";
import {RiNetflixFill} from "react-icons/ri";

function TransactionView(props) {
    return (
        // <div className={`flex justify-between ${mb} mt-2 items-center px-1`}>
        <div>
            <h5 className="mt-[42px] ml-2 text-lg font-bold text-navy-700 dark:text-white">
                Your transactions
            </h5>

            <div className="mt-9">
                <Transaction
                    title="Public Transport"
                    date="22 September 2022"
                    sum="-$15.50"
                    mb="mb-[20px]"
                    icon={
                        <MdOutlineDirectionsBus className="text-brand-500 dark:text-white" />
                    }
                />

                <Transaction
                    title="Grocery Store"
                    date="18 September 2022"
                    sum="-$42.28"
                    mb="mb-[30px]"
                    icon={
                        <MdOutlineShoppingBasket className="text-green-500 dark:text-white" />
                    }
                />

                <Transaction
                    title="Public Transport"
                    date="15 September 2022"
                    sum="-$11.37"
                    mb="mb-[30px]"
                    icon={
                        <MdOutlineSubscriptions className="text-yellow-500 dark:text-white" />
                    }
                />

                <Transaction
                    title="Netflix"
                    date="12 September 2022"
                    sum="-$34.90"
                    mb="mb-[30px]"
                    icon={<RiNetflixFill className="text-red-500 dark:text-white" />}
                />

                <Transaction
                    title="Drink Store"
                    date="09 September 2022"
                    sum="-$5.21"
                    mb="mb-[20px]"
                    icon={<MdLocalBar className="text-brand-500 dark:text-white" />}
                />

                <Transaction
                    title="Drink Store"
                    date="09 September 2022"
                    sum="-$5.21"
                    mb="mb-[20px]"
                    icon={<MdLocalBar className="text-brand-500 dark:text-white" />}
                />

                <Transaction
                    title="Apartment Debt"
                    date="05 September 2022"
                    sum="-$314.90"
                    mb="mb-[30px]"
                    icon={<MdOutlineWeekend className="text-green-500 dark:text-white" />}
                />
            </div>
        </div>
    );
}

export default TransactionView;