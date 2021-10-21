import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Input} from "@mui/material";

const emails = ['username@gmail.com', 'user02@gmail.com' ,'username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com','username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Работники</DialogTitle>
            <List sx={{ pt: 0 , width: '400px', height: '300px'}}>
                {emails.map((email) => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function UsersModal() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
          <Input type='hidden' name='responsible' value={selectedValue}/>
            <Button variant="outlined" onClick={handleClickOpen} sx={{width: '100%'}}>
                {selectedValue ? selectedValue : 'Выбрать отвественного'}
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
