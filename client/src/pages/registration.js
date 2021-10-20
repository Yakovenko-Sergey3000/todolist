import {Box, Button, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useSteled = makeStyles({
    loginForm: {
        marginTop: '10px',
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "400px",
        justifyContent: "space-around"
    },
})
const Registration = () => {
    const classes = useSteled()
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <Typography variant='h3'>Регистрация</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <form className={classes.loginForm} action="/" method="POST">
                    <TextField name="name" label="Имя" variant="standard"  />
                    <TextField name="surname" label="Фамилия" variant="standard"  />
                    <TextField name="patronymic" label="Отчество" variant="standard"  />
                    <TextField name="login" label="Логин" variant="standard"  />
                    <TextField name="pass"  type="password" label="Пароль" variant="standard"  />
                    <TextField name="passwordRepeat"  type="password" label="Пароль" variant="standard"  />
                    <Button variant="contained" type="submit" >Зарегестрироваться</Button>
                </form>
            </Box>
        </>
    )
}

export default Registration;