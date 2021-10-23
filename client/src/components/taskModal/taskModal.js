import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputSelect from '../inputSekect/inputSelect'



const style = {
    position: 'absolute',
    height: '500px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    overflow: 'auto'
};

const formStyle = {
   display: 'flex',
    flexDirection: 'column'

}

const formStyle__item = {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column'
}

export default function TaskModal({open, handleClose, user}) {
    const [value, setValue] = React.useState(null );
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    // const [] = useState('')
    // const [] = useState('')
    // const [] = useState('')
    const disabled = user.position === 'user';




    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h4'>Задача</Typography>
                    <form style={formStyle}>
                        <div style={formStyle__item}>
                            <Typography variant="body">Заголовок:</Typography>
                            <TextField
                                size='small'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={disabled}
                            />

                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Описание:</Typography>
                            <TextField
                                size='small'
                                value={text}
                                multiline
                                onChange={(e) => setText(e.target.value)}
                                disabled={disabled}
                            />
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Дата окончания:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} name="date_end" sx={{width: '100%'}} size="small" />}
                                    minDate={new Date()}
                                    disabled={disabled}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Дата обновления:</Typography>
                            <TextField  size='small' value="10/21/21" disabled />
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Дата создания:</Typography>
                            <TextField  size='small' value="10/21/21" disabled/>
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Приоритет:</Typography>
                            <InputSelect
                                disabled={disabled}
                            />
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Статус:</Typography>
                            <InputSelect
                                type="status"
                                isAdmin={user.position === 'admin'}
                            />
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Создатель:</Typography>
                            <TextField  size='small' value="Иванов" disabled/>
                        </div>
                        <div style={formStyle__item}>
                            <Typography variant="body">Отвественный:</Typography>
                            <TextField  size='small' value="Петров" disabled/>
                        </div>
                        <div style={formStyle__item}>
                            <Button type="submit">Готово</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
