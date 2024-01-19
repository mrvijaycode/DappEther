import { List, ListItem, ListItemAvatar, ListItemText, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './Task.css';

const Task = ({ taskText, isCompleted, onClick }) => {
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText
                    primary={`${taskText} ${isCompleted ? '(Completed)' : '(Pending)'}`}
                />
            </ListItem>
            <Checkbox
                checked={isCompleted}
                onClick={onClick}
            />
        </List>
    )
};

export default Task;
