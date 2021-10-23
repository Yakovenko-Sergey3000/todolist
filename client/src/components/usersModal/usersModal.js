import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Input} from "@mui/material";
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";




function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [allUsers, setAllUsers] = useState([])
    const {request} = useHttp()

    const getUsers = async () => {
        const res = await request('/api/all-users')
        console.log(res)
        setAllUsers(res)
    }

    useEffect(() => {
        getUsers()
    }, [])


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    let i = 0
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Работники</DialogTitle>
            <List sx={{ pt: 0 , width: '400px', height: '300px'}}>
                {allUsers.map((user) => (
                    <ListItem button onClick={() => handleListItemClick({name: user.name, surname: user.surname, id: user._id})} key={user._id}>
                        <ListItemText primary={`${user.name} ${user.surname}`} />
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
    const [idUser, setIdUser] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(`${value.name} ${value.surname}`);
        setIdUser(value.id)
    };

    return (
        <div>
          <Input type='hidden' name='responsible' value={idUser}/>
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
