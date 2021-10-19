import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'


const Login = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h2'>Login</Typography>
            </Box>
            <form action="/" method="POST">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField name="login" label="Логин" variant="standard" />
                    <TextField name="pass" label="Пароль" variant="standard" />
                    <Button variant="contained" type="submit">Войти</Button>
                </Box>
            </form>
        </>
    )
}

export default Login;