import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import uuid from 'react-uuid';

export const Modal = ({ type, modalOpen, setModalOpen, todo }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            alert('Please enter a title!');
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success('Task added successfully');
            }
            if (type === 'update') {
                dispatch(
                    updateTodo({
                        ...todo,
                        title,
                        status,
                    })
                );
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({ ...todo, title, status }));
                    toast.success('Task Updated successfully');
                } else {
                    toast.error('No changes made');
                    return;
                }
            }

            setModalOpen(false);
        }
    };

    return (
        modalOpen && (
            <div className="modal-wrapper">
                <div className="modal">
                    <button
                        className="modal-close"
                        onClick={() => setModalOpen(false)}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                        </svg>
                    </button>

                    <p className="modal-header">
                        {type === 'add' ? 'Add' : 'Update'} TODO
                    </p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={'incomplete'}>Incomplete</option>
                            <option value={'completed'}>Completed</option>
                        </select>
                        <div className="buttons">
                            <button className="button" type="submit">
                                {type === 'add' ? 'Add' : 'Update'} Task
                            </button>
                            <button
                                className="button"
                                type="button"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};
