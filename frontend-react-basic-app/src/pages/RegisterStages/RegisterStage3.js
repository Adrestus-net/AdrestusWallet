import Status from "../../util/Status";
import Stages from "../../util/Stages";
import SolidSubtleAlert from "../../components/SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";
import {BsFillCheckCircleFill} from "react-icons/bs";
import Card from "../../components/card";
import {useNavigate} from "react-router-dom";

const registerStage3 = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const {onStage3Submit,status,stages,Message } = props;
    return (
        <Card extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
            <h3 className="flex flex-row flex-nowrap flex justify-center text-4xl font-bold text-navy-700 dark:text-white">
                Mnemonic Phase
            </h3>
            <p className="flex flex-row flex-nowrap flex justify-center mt-[10px] ml-1 text-base text-gray-600">
                Fill in correct form the Mnemonic phase!
            </p>
            <div className="mt-6 mb-4 flex items-center gap-3">
                <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
                <p className="text-base font-medium text-gray-600"> or </p>
                <div className="h-px w-full bg-gray-200 dark:!bg-navy-700"/>
            </div>
            <form onSubmit={onStage3Submit}>
                <div className="flex flex-col justify-center text-align: center;">
                    <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white text-center">You
                        are all set open the extension and sign in to begin your interchain
                        journey</p>
                </div>
                <button type="submit"
                        className="mt-4 mb-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Create my Account
                </button>
                {status == Status.Reject && stages == Stages.Stage3 &&
                    <SolidSubtleAlert
                        title="Phase 3 Error"
                        description={Message}
                        icon={<AiFillExclamationCircle/>}
                        iconColor="text-white dark:!text-navy-900"
                        closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                        bg="bg-red-500 dark:!bg-red-300"
                        mb="pt-2 pb-2"
                        solid="solid"
                    />
                }
                {status == Status.Approve && stages == Stages.Stage3 &&
                    <div className="flex flex-col flex items-stretch gap-4">
                        <div>
                            <button onClick={() => navigate('/Login')} className="mt-4 mb-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to='/Login'>Log In</button>
                        </div>
                        <div>
                            <SolidSubtleAlert
                                title="Registration Successful"
                                description="Your registration is succeed you can now Log in."
                                icon={<BsFillCheckCircleFill/>}
                                iconColor="text-white dark:!text-navy-900"
                                bg="bg-green-500 dark:!bg-green-300"
                                mb="mb-6"
                                closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                                solid="solid"
                            />
                        </div>
                    </div>
                }
            </form>
        </Card>
    );
};

export default registerStage3;
