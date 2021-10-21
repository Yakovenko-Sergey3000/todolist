import {Avatar, Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyled = makeStyles({
    task: {
        width: '100%',
        border: '1px solid #dbdbdb',
        borderRadius: '7px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        transition: 'box-shadow .1s linear',
        '&:hover': {
            boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, .3) inset',
            cursor: 'pointer'
        },

    },


    task__block: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeft: '1px solid #9999',
        flex: "0 0 100px",
        padding: '5px',

        '&:first-child': {
            border: 'none',
            justifyContent: 'flex-start',
            flex: '1 0 auto'
        },
    },

})



const Task = ({options}) => {
    const classes = useStyled()
    const {title, status,responsible, date_end,priority} = options;
    let bgColor = 'rgba(168,168,168,0.68)'
     switch (status) {
         case 'Выполнена' :
                bgColor = 'rgba(62,191,91,0.66)'
                break;
         case 'Отменена' :
                bgColor = 'rgba(220,97,97,0.66)'

        }
    return (
        <Box className={classes.task} sx={{backgroundColor: bgColor}} >
                <Box className={classes.task__block}>
                    <Typography>{title}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{priority}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{date_end}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{responsible}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{status}</Typography>
                </Box>
        </Box>
    )
}

export default Task