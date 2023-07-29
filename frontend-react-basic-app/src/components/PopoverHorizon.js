import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/popover";
import {PopoverBody, PopoverFooter} from "@chakra-ui/react";
const PopoverHorizon = (props) => {
    const { extra, trigger, content} = props;
    return (
        <Popover placement='right-start' trigger="hover">
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent className={`w-fit h-14 rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none`}>
                <PopoverBody>{content}</PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverHorizon;
