import Card from "../../components/card";
import Status from "../../util/Status";
import Stages from "../../util/Stages";
import SolidSubtleAlert from "../../components/SolidSubtleAlert";
import {AiFillExclamationCircle} from "react-icons/ai";

const RegisterStage2 = (props) => {
    const {selected,handleRemove,array,handleAdd,status,stages,Message,onStage2Submit} = props;
    return (
        <Card
            extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
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
            <div className="flex justify-between gap-4 h-screen">
                <div className="mx-auto w-[1000px] container border bg-gray-100 p-2">
                    <div className="grid grid-cols-4 gap-4 pb-40 gap-1 h-[350px]">
                        {selected.map((item, id) => (
                            <button
                                key={id}
                                onClick={() => handleRemove(item, id)}
                                className="flex justify-center bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow h-[50px]"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <hr className="py-3"/>
                    <div className="grid grid-cols-4 gap-4 pb-40 gap-1 h-[350px]">
                        {array.map((item, id) => (
                            <button
                                key={id}
                                onClick={() => handleAdd(item, id)}
                                className="flex justify-center bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow h-[50px]"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <hr className="py-1"/>
                    {status == Status.Reject && stages == Stages.Stage2 &&
                        <SolidSubtleAlert
                            title="Phase 2 Error"
                            description={Message}
                            icon={<AiFillExclamationCircle/>}
                            iconColor="text-white dark:!text-navy-900"
                            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
                            bg="bg-red-500 dark:!bg-red-300"
                            mb="pt-2 pb-2"
                            solid="solid"
                        />
                    }
                    <div className="mt-30 pt-1">
                        <button
                            className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                            onClick={onStage2Submit}
                        >
                            Submit Step 2
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RegisterStage2;
