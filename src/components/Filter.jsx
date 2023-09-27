export const Filter = ({ ...rest }) => {
    return (
        <div>
            <select className="button filter" {...rest}>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='completed'>Completed</option>
            </select>
        </div>
    );
};
