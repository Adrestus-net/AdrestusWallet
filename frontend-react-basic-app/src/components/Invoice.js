import Card from "./card";
import ActionButtons from "./ActionButtons";
import React, {useContext} from "react";
import {DashBoardContext} from "../pages/Dashboard";
import DateUtil from '../util/DateUtil.js'
const Invoice = (props) => {
    const {transaction,address} = useContext(DashBoardContext)
    return (
        <Card extra={"px-9 w-full h-full pt-[12px] pb-2"}>
            {/* Header */}
            <div className="mb-8 mt-3 flex items-center justify-between gap-3 ">
                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                    Invoices
                </h5>
                <h5 className="font-bold text-brand-500 hover:cursor-pointer dark:text-white">
                    See all invoices
                </h5>
            </div>
            {transaction == null &&
                <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                </div>
            }
            {transaction != null && transaction.from.length === 0 && transaction.to.length === 0 &&
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                </div>
            }
            {transaction != null && transaction.from.concat(transaction.to).sort(function (a, b) {
                return Date.parse(b.timestamp) - Date.parse(a.timestamp);
            }).map((item) =>
                <ActionButtons
                    mb="hover:bg-brand-100 group-hover:text-white mb-[42px] -mx-1"
                    name="SIM76-#024214"
                    date={DateUtil.UtcToLocal(item.timestamp.split('T')[0])}
                    sum={"$"+item.amount}
                    actionName="View Explorer"
                    address={address}
                    from={item.from}
                    to={item.to}
                    item={item}
                />
            )}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px] -mx-1"*/}
            {/*    name="SIM76-#024214"*/}
            {/*    date="January, 14 2022"*/}
            {/*    sum="$997"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px] -mx-1"*/}
            {/*    name="SIM23-#024213"*/}
            {/*    date="January, 03 2022"*/}
            {/*    sum="$233"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM42-#024212"*/}
            {/*    date="December, 29 2021"*/}
            {/*    sum="$342"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM93-#024211"*/}
            {/*    date="November, 30 2021"*/}
            {/*    sum="$798"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
            {/*<ActionButtons*/}
            {/*    mb="mb-[42px]"*/}
            {/*    name="SIM13-#024210"*/}
            {/*    date="September, 07 2021"*/}
            {/*    sum="$844"*/}
            {/*    actionName="View Explorer"*/}
            {/*    address={address}*/}
            {/*/>*/}
        </Card>
    );
};

export default Invoice;
