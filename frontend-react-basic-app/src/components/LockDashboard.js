import InputField from "./fields/InputField";
import React from "react";
import Stages from "../util/Stages";
import Status from "../util/Status"
const LockDashboard = (props) => {
    const {setStages, setMessage, setStatus,message, password} = props
    const onClick = () => {
        const pass = document.getElementById("password").value
        if (pass === password) {
            setMessage("")
            setStatus(Status.Pending)
            setStages(Stages.Stage1)
        } else {
            setMessage("Password is wrong please retype it")
        }
    }
    const onChange = () => {}

    return (
        <>
            <p className="mx-3 my-3 text-4xl font-bold text-navy-700 dark:text-white">
                Adrestus Lock Dashboard
            </p>
            <p className="mt-[10px] mb-8 ml-1 text-base text-gray-600">
                Enter your password to unlock your account!
            </p>
            {/* Email */}
            <InputField
                extra="mb-3"
                label="password"
                placeholder="password"
                id="password"
                type="password"
                onchange={onChange}
                readonly={false}
                result={message}
                setResult={setMessage}
                setStatus={setStatus}
            />
            {/* button */}
            <button onClick={onClick}
                    className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Unlock
            </button>
        </>
    )
}

export default LockDashboard