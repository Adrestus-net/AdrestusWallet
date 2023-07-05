const ListItems = ({value}) => {
    return (
        <li>{JSON.stringify(value)}</li>
    )
}

ListItems.defaultProps = {
    value: "Default Title"
}
export default ListItems