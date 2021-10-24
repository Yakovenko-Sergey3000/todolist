import {
    Box,
    Typography,
    TextField,
    Button, Link
} from '@mui/material'

import  {makeStyles} from "@mui/styles";
import {useHttp} from "../hooks/http.hook";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

const useStyled = makeStyles({
    loginForm: {
        marginTop: '10px',
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "200px",
        justifyContent: "space-around"
    },


})
const Login = () => {
    const classes = useStyled();
    const [form, setForm] = useState({
        login: '',
        pass: ''
    })

    const [statusLogin, setStatusLogin] = useState({
        error: false,
        msg: ''
    })
    const [statusPass, setStatusPass] = useState({
        error: false,
        msg: ''
    })


    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)

    const changeHadler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const loginHandler =  async (e) => {
        e.preventDefault()
        try {
            const data = await request('/login', 'POST', JSON.stringify({...form}) )

           data.forEach(d => {
               switch (d.param) {
                   case 'login' :
                       setStatusLogin({...statusLogin, error: true, msg: d.msg} )
                       break;
                   case 'pass': {
                       setStatusPass({...statusLogin, error: true, msg: d.msg} )
                       break;
                   }
                   case (true) :
                       setStatusPass({...statusLogin, error: false, msg: ''} )
                       setStatusLogin({...statusLogin, error: false, msg: ''} )
                       auth.login(d.idSess, d.user[0])
                       break;
                   default :

               }
           })

        } catch (e) {}
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Войти</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <form className={classes.loginForm}  onSubmit={loginHandler}>
                        <TextField error={statusLogin.error} helperText={statusLogin.msg} name="login" label="Логин" variant="standard" onChange={(e) => changeHadler(e)} />
                        <TextField error={statusPass.error} helperText={statusPass.msg} name="pass"  type="password" label="Пароль" variant="standard" onChange={(e) => changeHadler(e)} />
                        <Button variant="contained" type="submit"  disabled={loading}>Войти</Button>
                        <Link href='/registration'>Зарегестрироваться</Link>
                </form>
            </Box>
        </>
    )
}

export default Login;