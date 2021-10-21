import {Box, Button, Input, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import InputDatePicker from "../components/inputDatePicker/inputDatePicker";
import InputSelect from "../components/inputSekect/inputSelect";
import UsersModal from "../components/usersModal/usersModal";

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
    return (
        <Box className={classes.box}>
            <Typography variant='h4'>Новая задача</Typography>
            <form action="/" method="GET" className={classes.formNewTask}>
                <div className={classes.formNewTask__item}>
                    <TextField name="name" label="Заголовок" sx={{width: '100%'}} size="small"/>
                </div>
                <div className={classes.formNewTask__item}>
                    <TextField name="text" multiline label="Описание задачи" sx={{width: '100%'}} size="small"/>
                </div>
                <div className={classes.formNewTask__item}>
                    <InputDatePicker/>
                </div>
                <div className={classes.formNewTask__item}>
                    <InputSelect/>
                </div>
                <div className={classes.formNewTask__item}>
                    <UsersModal/>
                </div>
                <div className={classes.formNewTask__item}>
                    <Button type="submit" variant="contained" sx={{width: '100%'}}>Создать задачу</Button>
                </div>
                <Input type='hidden' name="_id" sx={{opacity: 0}}/>
                <Input type='hidden' name="creator" sx={{opacity: 0}}/>
                <Input type='hidden' name="date_creator" sx={{opacity: 0}}/>
                <Input type='hidden' name="date_reset" sx={{opacity: 0}}/>
            </form>
        </Box>
    )
}

export default NewTask;