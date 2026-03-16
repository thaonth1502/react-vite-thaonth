const TodoNew = (props) => {
    console.log(">>> check point: ", props)
    const { addNewTodo } = props;
    // addNewTodo("Rosemary")
    const handleClick = () => {
        alert("click me")
    }
    const handleOnchange = (name) => {
        console.log(">>> handleOnChange", name)
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnchange(event.target.value)}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    )
}
export default TodoNew