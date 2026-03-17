const TodoData = (props) => {

    const { todoList } = props;

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {

                return (
                    <div>
                        <div className={`todo-item`} key={index.id}>
                            {item.name}
                            <button>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default TodoData