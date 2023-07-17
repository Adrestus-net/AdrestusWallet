const ListItems = ({index,value}) => {
    return (
        <li key={index}>{JSON.stringify(value)}</li>
    )
}

ListItems.defaultProps = {
    value: "Default Title"
}
export default ListItems