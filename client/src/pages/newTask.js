import {Box, Button, Input, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import InputDatePicker from "../components/inputDatePicker/inputDatePicker";
import InputSelect from "../components/inputSekect/inputSelect";
import UsersModal from "../components/usersModal/usersModal";
import {useHttp} from "../hooks/http.hook";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import moment from "moment";
import Shackbar from "../components/snackBar/shackbar";
import * as React from "react";


const useStaled = makeStyles({
    box: {
        width: '350px',
        margin: '40px 0 0 50px',

    },
    formNewTask : {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px'
    },
    formNewTask__item: {
        margin: '7px 0'
    }


})
const NewTask = () => {
    const classes = useStaled();
    const {user} = useContext(AuthContext)
    const {request} = useHttp()
    const [openSkackBar, setOpenShackBar] = useState({
        open: false,
        msg: ''
    })

    const [valueDatePicker, setValueDatePicker] = useState(null)
    const [valueSelect, setValueSelect] = useState('')
    const [trigerModal, setTrigerModal] = useState({triger: false})


    const resetForm = (inputs) => {
        inputs.reset()
        setValueDatePicker(null)
        setValueSelect('')
        setTrigerModal({...trigerModal, triger: !trigerModal.triger})
    }

    const setDate = (newValue) => {
        setValueDatePicker(newValue);
    }

    const handleChangeSelect = (event) => {
        setValueSelect(event.target.value);
    };


    const handleClickSnackBar = (msg) => {
        setOpenShackBar({ ...openSkackBar , open: true, msg: msg});
    };

    const handleCloseSkackBar = () => {
        setOpenShackBar({ ...openSkackBar , open: false});
    };

    const submitForm = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const data = {};
        for (let keys of form.entries()) {
            data[keys[0]] = keys[1]
        }



        const res = await request(
            'api/create-task',
            'POST',
            JSON.stringify(data)
        )
        res.forEach(i => {
            if(i.status === 200) {
                resetForm(e.target)
            }
            handleClickSnackBar(i.msg)
        })
    }


    return (
        <Box className={classes.box}>
            <Typography variant='h4'>Новая задача</Typography>
            <form onSubmit={submitForm} className={classes.formNewTask}>
                <div className={classes.formNewTask__item}>
                    <TextField name="title" label="Заголовок" sx={{width: '100%'}} size="small"/>
                </div>
                <div className={classes.formNewTask__item}>
                    <TextField name="text" multiline label="Описание задачи" sx={{width: '100%'}} size="small"/>
                </div>
                <div className={classes.formNewTask__item}>
                    <InputDatePicker
                        valueDate={valueDatePicker}
                        setDate={setDate}
                    />
                </div>
                <div className={classes.formNewTask__item}>
                    <InputSelect
                        handleChange={handleChangeSelect}
                        value={valueSelect}
                    />
                </div>
                <div className={classes.formNewTask__item}>
                    <UsersModal resetInput={trigerModal.triger}/>
                </div>
                <div className={classes.formNewTask__item}>
                    <Button type="submit" variant="contained" sx={{width: '100%'}}>Создать задачу</Button>
                </div>
                <Input type='hidden' name="status" value='to_implementation' sx={{opacity: 0}}/>
                <Input type='hidden' name="creator" value={user._id} sx={{opacity: 0}}/>
                <Input type='hidden' name="date_created" value={moment().format('YYYY-MM-DD')} sx={{opacity: 0}}/>
                <Input type='hidden' name="date_updated"  value={moment().format('YYYY-MM-DD')} sx={{opacity: 0}}/>
            </form>
            <Shackbar
                open={openSkackBar}
                handleClose={handleCloseSkackBar}
            />
        </Box>

    )
}

export default NewTask;