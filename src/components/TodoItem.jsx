import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import { Modal } from './Modal';

export const TodoItem = ({ todo }) => {
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (todo.status === 'completed') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({
                ...todo,
                status: checked ? 'incomplete' : 'completed',
            })
        );
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success('Todo deleted');
    };

    return (
        <>
            <div className="todo-item">
                <div className="todo-ct">
                    <input
                        type="checkbox"
                        className="check-box"
                        checked={checked}
                        onChange={handleCheck}
                    />
                    <script>console.log(todo.status);</script>
                    <div className="title-date">
                        <p
                            className="item-title"
                            style={
                                todo.status === 'completed'
                                    ? {
                                          textDecoration: 'line-through',
                                          color: 'gray',
                                      }
                                    : {}
                            }
                        >
                            {todo.title}
                        </p>
                        <p className="item-date">
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="todo-de">
                    <div role="button" onClick={handleDelete}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                        </svg>
                    </div>
                    <div role="button" onClick={handleUpdate}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <Modal
                type="update"
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
                todo={todo}
            />
        </>
    );
};
