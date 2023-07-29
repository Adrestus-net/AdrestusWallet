// Custom components
import React from "react";
import SolidSubtleAlert from "../SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";

function InputField(props) {
    const {label, id, extra, type, placeholder, variant, state, disabled, onchange, readOnly,result,setResult} = props;
    return (
        <div className={`${extra}`}>
            <label
                htmlFor={id}
                className={`text-sm text-navy-700 dark:text-white ${
                    variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
                }`}
            >
                {label}
            </label>
            <input
                disabled={disabled}
                type={type}
                id={id}
                name={id}
                readOnly={readOnly}
                onChange={(e) => onchange(e)}
                placeholder={placeholder}
                className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                    disabled === true
                        ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                        : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                : "border-gray-200 dark:!border-white/10 dark:text-white"
                }`}
            />
            {result !== '' &&
                <SolidSubtleAlert
                    title={`${id} Address Error`}
                    description={result}
                    icon={<AiFillExclamationCircle/>}
                    iconColor="text-white dark:!text-navy-900"
                    closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                    bg="bg-red-500 dark:!bg-red-300"
                    mb="pt-2 pb-2 my-3"
                    solid="solid"
                    setResult={setResult}
                />
            }
        </div>
    );
}

export default InputField;
