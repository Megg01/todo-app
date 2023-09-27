import { TodoItem } from './TodoItem';
import { useSelector } from 'react-redux';

export default function TodoContainer() {
    const todoList = useSelector((state) => state.todo.todoList);
    const filterStatus = useSelector((state) => state.todo.filterStatus);

    const completedTodoList = todoList.filter(
        (todo) => todo.status === 'completed'
    );
    const incompleteTodoList = todoList.filter(
        (todo) => todo.status === 'incomplete'
    );

    const displayList =
        filterStatus === 'all'
            ? todoList
            : filterStatus === 'completed'
            ? completedTodoList
            : incompleteTodoList;

    return (
        <div className="todo-container">
            {displayList.length > 0 ? (
                displayList.map((todo) => (
                    <TodoItem key={todo.id} todo={todo}></TodoItem>
                ))
            ) : (
                <p style={{ color: 'black', fontSize: '1.2em' }}>No Todo</p>
            )}
        </div>
    );
}
