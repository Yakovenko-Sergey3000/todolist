import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import InputSelect from '../inputSekect/inputSelect'
import InputDatePicker from "../inputDatePicker/inputDatePicker";
import moment from "moment";





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

const styleTitle = {
    marginBottom: '10px'
}
export default function TaskModal({open, handleClose, user, task,  updateData}) {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [date_created, setDate_created] = useState('')
    const [date_updated, setDate_updated] = useState('')
    const [creator,setCreator ] = useState('')
    const [responsible, setResponsible] = useState('')
    const disabled = user.position === 'user';
    const [valueDatePicker, setValueDatePicker] = useState(null)
    const [valueSelectPrioriry, setValueSelectPriority] = useState('')
    const [valueSelectStatus, setValueSelectStatus] = useState('')



    useEffect(() => {
        if(task) {
            setTitle(task.title)
            setText(task.text)
            setValueSelectPriority(task.priority)
            setValueSelectStatus(task.status)
            setDate_created(moment(task.date_created).format('DD MMMM YYYY'))
            setDate_updated(moment(task.date_updated).format('DD MMMM YYYY'))
            setValueDatePicker(moment(task.date_end))
            setResponsible(`${task.responsibleName} ${task.responsibleSurname}`)
            setCreator(`${task.creatorName} ${task.creatorSurname}`)
        }

    }, [task])




    const updateTask = (e) => {
        e.preventDefault()

        if(task) {
            const data = {
                _id: task._id,
                title:title,
                text: text,
                date_created: moment(task.date_created).format('YYYY-MM-DD'),
                date_updated: moment().format('YYYY-MM-DD'),
                date_end: moment(Date.parse(valueDatePicker)).format('YYYY-MM-DD'),
                responsible: task.responsible,
                creator: task.creator,
                status: valueSelectStatus,
                priority: valueSelectPrioriry,
            }
            updateData(data)

        }
    }

    const setDate = (newValue) => {
        setValueDatePicker(newValue);
    }

    const handleChangeSelectPriority = (event) => {
        setValueSelectPriority(event.target.value);
    };

    const handleChangeSelectStatus = (event) => {
        setValueSelectStatus(event.target.value);
    };




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
                    <form style={formStyle} onSubmit={updateTask}>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Заголовок:</Typography>
                            <TextField
                                size='small'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={disabled}
                            />

                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Описание:</Typography>
                            <TextField
                                size='small'
                                value={text}
                                multiline
                                onChange={(e) => setText(e.target.value)}
                                disabled={disabled}
                            />
                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Дата окончания:</Typography>
                            <InputDatePicker
                                valueDate={valueDatePicker}
                                setDate={setDate}
                                formaDate={{inputFormat: 'ru', masks: 'ru'}}
                                disablet={disabled}
                            />
                        </div>

                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Приоритет:</Typography>
                            <InputSelect
                                disabled={disabled}
                                value={valueSelectPrioriry}
                                handleChange={handleChangeSelectPriority}
                            />
                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Статус:</Typography>
                            <InputSelect
                                type="status"
                                isAdmin={user.position === 'admin'}
                                value={valueSelectStatus}
                                handleChange={handleChangeSelectStatus}
                                disabled={task && task.status === 'done'}
                            />
                        </div>
                        <hr style={{width: '100%', margin: '30px 0', color: '#999'}}/>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Дата обновления:</Typography>
                            <TextField  size='small' value={date_updated} disabled />
                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Дата создания:</Typography>
                            <TextField  size='small' value={date_created} disabled/>
                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Создатель:</Typography>
                            <TextField  size='small' value={creator} disabled/>
                        </div>
                        <div style={formStyle__item}>
                            <Typography sx={styleTitle} variant="body">Отвественный:</Typography>
                            <TextField  size='small' value={responsible} disabled/>
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
