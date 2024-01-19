import { List, ListItem, ListItemAvatar, ListItemText, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './Task.css';

const Task = ({ taskText, onClick }) => {
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText
                    primary={`${taskText}`}
                />
            </ListItem>
            <Checkbox
                onClick={onClick}
            />
        </List>
    )
};

export default Task;
