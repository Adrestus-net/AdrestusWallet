import { PiArrowCircleRightFill } from "react-icons/pi";
const ActionButtons = (props) => {
    const {mb, date, sum, name, action, actionName,address,from,to} = props;

    function getShortenStartAddress(val){
        const str=String(val)
        return str.substring(0,23)
    }
    function getShortenEndAddress(val){
        const str=String(val)
        return str.substring(49,str.length)
    }
    return (
        <div className={`flex items-center justify-between ${mb}`}>
            <div className="hover:cursor-pointer">
                <p className="text-base font-bold text-navy-700 dark:text-white">
                    {date}
                </p>
                <div className="flex lg:flex-row md:flex-col sm:flex-col flex-wrap justify-between gap-4">
                    <div>
                        {/*<p className="[word-spacing:10px] text-sm text-gray-700"> From ADR-GBXZ-Z5UR-3UVR-6XUE....VLBJ</p>*/}
                        <p className="[word-spacing:10px] text-sm text-gray-700"> From {getShortenStartAddress(from)}....{getShortenEndAddress(from)}</p>
                    </div>
                    <div className="self-center">
                        <PiArrowCircleRightFill  className="text-green-500 dark:text-white" />
                    </div>
                    <div>
                        <p className="[word-spacing:10px] text-sm text-gray-700"> To {getShortenStartAddress(to)}....{getShortenEndAddress(to)}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 md:hover:cursor-pointer">
                <p className="text-md font-medium text-navy-700 dark:text-white">
                    {sum}
                </p>
                <button
                    onClick={action}
                    className="flex items-center justify-center rounded-full bg-lightPrimary px-5 py-3 text-sm font-medium text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                >
                    {actionName}
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
