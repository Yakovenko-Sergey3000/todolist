import {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Box, List, ListItem,  ListItemText, Typography} from "@mui/material";




const styleItem = {
    background: 'rgb(255,255,255)',
    transition: 'background .1s linear',
    '&:hover': {
        cursor: 'pointer',
        background: 'rgba(206,206,206,0.84)'
    }
}
const AppointUser = () => {
    const {request} = useHttp()
    const [users, setUsers] = useState([])
    const [triger, setTriger] = useState({triger: false})
    const getUsers = useCallback(async () => {
        const res = await request('api/all-users')
        setUsers(res)
    }, [request])


    useEffect(() => {
       getUsers()
    }, [getUsers,request, triger.triger])

    const translatePosition = {
        user: 'Пользователь',
        admin: 'Администратор'
    }

    const appointAdmin = async (id, info) => {

        const isAdmin = window.confirm(`Вы хотите назначить ${info} администратором?`)
         if(isAdmin) {
             await request(
                 'api/appoint-admin',
                 'PUT',
                 JSON.stringify({id})
             )
             setTriger({...triger, triger: !triger.triger})
         } else  {
             return
         }

    }

    return (
        <Box>
            <List>
                {
                    users.map(user => {
                        return (
                            <ListItem key={user._id} sx={styleItem} onClick={() => appointAdmin(user._id, `${user.name} ${user.surname}`)} >

                                <ListItemText
                                    primary={`${user.name} ${user.surname}`}
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                            Права доспупа:
                                            </Typography>
                                            {' ' + translatePosition[user.position]}
                                        </>
                                    }
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default AppointUser;