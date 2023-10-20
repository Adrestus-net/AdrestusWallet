import Card from "../../components/card";
import TextField from "../../components/fields/TextField";
import InputField from "../../components/fields/InputField";
import Status from "../../util/Status";
import SolidSubtleAlert from "../../components/SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";
import Checkbox from "../../components/Checkbox";

const RegisterStage1 = (props) => {
    const {onStage1Submit,onClick,mnemonic,name_state,onChange,last_name_state,email_state,password_state,repeat_password_state,status,Message,setErrMessage} = props;
    return (
        <Card
            extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
            <form onSubmit={onStage1Submit}>
                <h3 className="flex flex-row flex-nowrap flex justify-center text-4xl font-bold text-navy-700 dark:text-white">
                    Sign Up
                </h3>
                <p className="flex flex-row flex-nowrap flex justify-center mt-[10px] ml-1 text-base text-gray-600">
                    Enter your email and password to sign up!
                </p>
                <div className="mt-6 mb-4 flex items-center gap-3">
                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                    <p className="text-base font-medium text-gray-600"> or </p>
                    <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                </div>
                <div className="flex flex-col gap-4 flex-wrap: wrap flex items-stretch">
                    <div class="flex flex-row flex-nowrap flex justify-center">
                        <input type="checkbox" id="pure-toggle-2" onChange={(event) => onClick(event)}
                               hidden/>
                        <label className="pure-toggle impossible" htmlFor="pure-toggle-2">
                            <span className="fontawesome-ok" type="text" role="textbox">12</span>
                            <span className="fontawesome-remove" type="text" role="textbox">24</span>
                        </label>
                    </div>
                    <div>
                        <TextField
                            state=""
                            label="Mnemonic Key"
                            id="textarea"
                            cols="3"
                            rows="6"
                            value={mnemonic}
                        />
                    </div>
                </div>
                {/* user info */}
                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="First Name*"
                    placeholder="John"
                    id="firstname"
                    type="text"
                    state={name_state}
                    onchange={onChange}
                    result={''}
                />

                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Last Name*"
                    placeholder="Doe"
                    id="lastname"
                    type="text"
                    state={last_name_state}
                    onchange={onChange}
                    result={''}
                />
                {/* Email */}
                <div>
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email*"
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="email"
                        state={email_state}
                        onchange={onChange}
                        result={''}
                    />
                </div>

                {/* Password */}

                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Password*"
                    placeholder="Min 8 characters"
                    id="password"
                    type={"password"}
                    state={password_state}
                    onchange={onChange}
                    result={''}
                />

                <div className="flex flex-col flex flex-nowrap flex justify-start">
                    {/* Password */}
                    <div>
                        <InputField
                            variant="auth"
                            extra="mb-3"
                            label="Repeat Password*"
                            placeholder="Min 8 characters"
                            id="repeat_password"
                            type={"password"}
                            state={repeat_password_state}
                            onchange={onChange}
                            result={''}
                        />
                    </div>
                    <div>
                        {Message !== '' &&
                            <SolidSubtleAlert
                                title="SignUP Error"
                                description={Message}
                                icon={<AiFillExclamationCircle/>}
                                iconColor="text-white dark:!text-navy-900"
                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                bg="bg-red-500 dark:!bg-red-300"
                                mb="pt-2 pb-2"
                                solid="solid"
                                setResult={setErrMessage}
                            />
                        }
                    </div>
                </div>
                {/* Checkbox */}
                <div className="mt-2 flex items-center justify-between px-2">
                    <div className="flex">
                        <Checkbox id="mycheckbox" onchange={onChange}/>
                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                            By creating an account means you agree to the Terms and
                            Conditions, and our Privacy Policy
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Register Step 1
                </button>
                <div className="mt-3">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
              Already a member?
            </span>
                    <a
                        href="/Login"
                        className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    >
                        Sign In
                    </a>
                </div>
            </form>
        </Card>
    );
};

export default RegisterStage1;
