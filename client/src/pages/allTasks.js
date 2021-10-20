import {Box, Button, List, ListItem, Tooltip} from "@mui/material";
import Task from "../components/task/task";

const AllTasks = () => {

    const tasks = [
        {
            _id: 1,
            title : 'Создать 2 задачи',
            text : '',
            date_end : '2021-10-25',
            date_created : '2021-10-20',
            date_start : '',
            priority: 'Средний' ,
            status: 'Выполнена',
            creator: 'Алесандр Владимирович',
            responsible: 'Анатолий'
        },
        {
            _id: 2,
            title : 'Соеденить сервер с фронтом',
            text : '',
            date_end : '10/11/2021',
            date_created : '2021-10-20',
            date_start : '',
            priority: 'Важный' ,
            status: 'Отменена',
            creator: 'Алесандр Владимирович',
            responsible: 'Анатолий'
        },
        {
            _id: 3,
            title : 'Соеденить сервер с фронтом',
            text : '',
            date_end : '10/11/2021',
            date_created : '2021-10-20',
            date_start : '',
            priority: 'Важный' ,
            status: 'К выполнению',
            creator: 'Алесандр Владимирович',
            responsible: 'Анатолий'
        },{
            _id: 4,
            title : 'Соеденить сервер с фронтом',
            text : '',
            date_end : '10/11/2021',
            date_created : '2021-10-20',
            date_start : '',
            priority: 'Важный' ,
            status: 'Выполняется',
            creator: 'Алесандр Владимирович',
            responsible: 'Анатолий'
        },

    ]
    const classes = {}
    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto'}}>
                <Tooltip title="Все задачи">
                    <Button>Все</Button>
                </Tooltip>
                <Tooltip title="Задачи на сегодня">
                    <Button>Сегодня</Button>
                </Tooltip>
                <Tooltip title="Задачи на неделю">
                    <Button>На неделю</Button>
                </Tooltip>
                <Tooltip title="Задачи на  будущее">
                    <Button>На будущее</Button>
                </Tooltip>
               <List>
                   {
                       tasks.map(({_id, ...options}) => {

                           return (
                               <ListItem key={_id}>
                                   <Task options={options} />
                               </ListItem>
                           )
                       })
                   }
               </List>
            </Box>
        </>
    )
}

export default AllTasks;