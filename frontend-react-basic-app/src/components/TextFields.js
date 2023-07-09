import ListItems from "./ListItems";

const TextFields = ({index, myArray, updateMyArray}) => {

    const onChange = (e) => {
        let newArr = [...myArray];
        newArr[index] = e.target.value.replace(/\s/g, '');
        updateMyArray(newArr)
    }

    return (
        <div>
            <label>Enter {index} input
                <input type="text" id={index} name="lname" onChange={(event) => onChange(event)}/>
            </label>
        </div>
    )
}

ListItems.defaultProps = {
    value: "Default Title"
}
export default TextFields