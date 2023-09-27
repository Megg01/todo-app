import { useState } from 'react';
import { AddTask } from './AddTask';
import { Filter } from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../slices/todoSlice';
import { Modal } from './Modal';

export default function UpBar() {
    const [modalOpen, setModalOpen] = useState(false);
    const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
    const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
    const dispatch = useDispatch();

    const updateFilter = (e) => {
        setFilterStatus(e.target.value);
        dispatch(updateFilterStatus(e.target.value));
    };

    return (
        <div className="up-bar">
            <AddTask onClick={setModalOpen} />
            <Filter onChange={(e) => updateFilter(e)} value={filterStatus} />

            <Modal
                type="add"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}
