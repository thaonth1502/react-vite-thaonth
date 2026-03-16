import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;

    const [valueInput, setValueInput] = useState("rosemary")

    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("");
    }

    const handleOnchange = (name) => {
        setValueInput(name)
    }

    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnchange(event.target.value)}
                value={valueInput}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            <div> My text input is: {valueInput} </div>
        </div>
    )
}
export default TodoNew