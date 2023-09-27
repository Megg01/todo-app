export const AddTask = ({ onClick }) => {
    return (
        <div className="add-task">
            <button className="button" onClick={onClick}>
                Add Task
            </button>
        </div>
    );
};
