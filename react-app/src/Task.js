import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import './Task.css';

const Task = ({ taskText, onClick }) => {
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText primary={taskText} />
            </ListItem>
            <CheckIcon fontSize="large" style={{ opacity: 0.7 }} onClick={onClick} />
        </List>
    )
};

export default Task;
