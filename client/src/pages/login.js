import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'

import  {makeStyles} from "@mui/styles";

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

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h3'>Войти</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent:"center"}}>
                <form className={classes.loginForm} action="/" method="POST">
                        <TextField name="login" label="Логин" variant="standard"  />
                        <TextField name="pass"  type="password" label="Пароль" variant="standard"  />
                        <Button variant="contained" type="submit" >Войти</Button>
                </form>
            </Box>
        </>
    )
}

export default Login;