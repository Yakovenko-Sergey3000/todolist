import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


export default function MenuBar() {
    const auth = useContext(AuthContext)
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo-list
                    </Typography>
                    <Button
                        onClick={() => auth.logout()}
                        color="inherit"
                    >Выйти
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
