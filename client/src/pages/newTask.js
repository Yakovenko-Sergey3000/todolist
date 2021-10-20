import {Box, Input, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStaled = makeStyles({
    formNewTask : {
        display: 'flex',
        flexDirection: 'column'
    }
})
const NewTask = () => {
    const classes = useStaled();
    return (
        <Box >
            <form action="/" method="POST" className={classes.formNewTask}>
                <TextField placeholder="Заголовок" label="title"/>
                <TextField placeholder="Описание задачи" multiline  variant="standard"/>

                <TextField type="date" label="date"/>

            </form>
        </Box>
    )
}

export default NewTask;