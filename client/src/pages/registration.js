import {Box, Button, Link, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useState} from "react";
import {useHttp} from "../hooks/http.hook";

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
    const {request, loading} = useHttp()
    const classes = useSteled()
    const [form, setForm] = useState({
        name: '',
        surname: '',
        patronymic: '',
        login: '',
        pass: '',
        passworReapeat: ''
    })
    const [nameError, setNameError] = useState({
        error: false,
        msg: ''
    })
    const [surnameError, setSurnameError] = useState({
        error: false,
        msg: ''
    })
    const [loginError, setLoginError] = useState({
        error: false,
        msg: ''
    })
    const [passError, setPassError] = useState({
        error: false,
        msg: ''
    })
    const [repeatError, setRepeatError] = useState({
        error: false,
        msg: ''
    })

    const changeHendler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registrrationHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/registration', 'POST', JSON.stringify({...form}))
            console.log(data)
            data.forEach(d => {
                switch (d.param) {
                    case 'name' :
                        setNameError({...nameError, error: true, msg: d.msg})
                        break;
                    case 'surname' :
                        setSurnameError({...surnameError, error: true, msg: d.msg})
                        break;
                    case 'login' :
                        setLoginError({...loginError, error: true, msg: d.msg})
                        break;
                    case 'pass' :
                        setPassError({...passError, error: true, msg: d.msg})
                        break;
                    case 'passwordRepeat' :
                        setRepeatError({...repeatError, error: true, msg: d.msg})
                        break;
                    case (true) :
                        setNameError({...nameError, error: false,  msg: ''})
                        setSurnameError({...surnameError, error: false,  msg: ''})
                        setLoginError({...loginError, error: false,  msg: ''})
                        setPassError({...passError, error: false,  msg: ''})
                        setRepeatError({...repeatError, error: false,  msg: ''})
                        break;
                    default :
                }
            })

        } catch (e) {}


    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <Typography variant='h3'>Регистрация</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <form className={classes.loginForm} onSubmit={registrrationHandler}>
                    <TextField
                        name="name"
                        label="Имя"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                        error={nameError.error}
                        helperText={nameError.msg}
                    />
                    <TextField
                        name="surname"
                        label="Фамилия"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                        error={surnameError.error}
                        helperText={surnameError.msg}
                    />
                    <TextField
                        name="patronymic"
                        label="Отчество"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                    />
                    <TextField
                        name="login"
                        label="Логин"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                        error={loginError.error}
                        helperText={loginError.msg}
                    />
                    <TextField
                        name="pass"
                        type="password"
                        label="Пароль"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                        error={passError.error}
                        helperText={passError.msg}
                    />
                    <TextField
                        name="passwordRepeat"
                        type="password"
                        label="Повторите пароль"
                        variant="standard"
                        onChange={(e) => changeHendler(e)}
                        error={repeatError.error}
                        helperText={repeatError.msg}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                             Зарегестрироваться
                    </Button>
                    <Link href="/login">Войти</Link>
                </form>
            </Box>
        </>
    )
}

export default Registration;