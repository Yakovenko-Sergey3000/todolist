import {Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import moment from "moment";

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



const Task = ({options,transletePriority, traslateStatus}) => {
    const classes = useStyled()


    const {title, status, date_end,priority, responsibleSurname} = options;

    let bgColor = 'rgba(168,168,168,0.68)'
    if(moment(date_end).date() < moment().date()) bgColor = 'rgba(220,97,97,0.66)'
     switch (status) {
         case 'done' :
             bgColor = 'rgba(62,191,91,0.66)'
             break;
         case 'cancel' :
             bgColor = 'rgba(220,97,97,0.66)'
             break;
         default :
     }

    return (
        <Box className={classes.task} sx={{backgroundColor: bgColor}} >
                <Box className={classes.task__block}>
                    <Typography>{title}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{transletePriority[priority]}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{moment(date_end).format('DD MMMM')}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{responsibleSurname}</Typography>
                </Box>
                <Box className={classes.task__block}>
                    <Typography sx={{fontSize: "13px"}}>{traslateStatus[status]}</Typography>
                </Box>
        </Box>
    )
}

export default Task