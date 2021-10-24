import {Box, Button, List, ListItem, Tooltip, Typography} from "@mui/material";
import Task from "../components/task/task";
import TaskModal from "../components/taskModal/taskModal";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import React from "react";
import moment from "moment";
import 'moment/locale/ru'
moment.locale('ru')

const AllTasks = () => {
    const [showModal, setShowModal] = useState(false)

    const modalClose = () => setShowModal(false);
    const {user} = useContext(AuthContext)
    const {request} = useHttp()
    const [tasks, setTasks] = useState([])
    const [sortTasksOnDays, setSortTasksOnDays] = useState([])
    const [taskId, setTaskId] = useState({})
    const modalOpen = (id) => {
        setShowModal(true)
       const task = tasks.find(t => t._id === id )
        setTaskId(task)
    };


    const transletePriority = {
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий'
    }

    const traslateStatus= {
        to_implementation: 'К выполнению',
        performed: 'Выполняется',
        done: 'Выполнена',
        cancel: 'Отменена'
    }



    const getUserTasks = useCallback(async () => {
        const res = await request(
            'api/user-tasks',
            'POST',
            JSON.stringify({id: user._id})
        )
        setTasks(res)
        setSortTasksOnDays(res)

    }, [request, user])

    const sortTasks = (value, operator) => {
        const now = moment()
        const monday = now.clone().weekday(0)
        const sunday = now.clone().weekday(6)
        let newArrTasks = []

         switch (value) {
             case  'all' :
                 newArrTasks = tasks.filter(t => t)
                 break;
             case 'today' :
                 newArrTasks = tasks.filter(t =>  moment(t.date_end).date() === now.date() )
                 break;
             case 'week' :
                 newArrTasks = tasks.filter(t => moment(t.date_end) >= monday && moment(t.date_end) <= sunday)
                 break;
             case 'more-week' :
                 newArrTasks = tasks.filter(t => moment(t.date_end) > sunday)
                 break;
             default :
         }

        setSortTasksOnDays(newArrTasks)
    }

    const updateData = async (data) => {
       await request(
            'api/change-options',
            'PUT',
            JSON.stringify(data)
        )
        setShowModal(false)
    }


    useEffect(() => {
        getUserTasks()
    }, [getUserTasks, showModal])


    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto'}}>
                <Tooltip title="Все задачи">
                    <Button onClick={() => sortTasks('all')}>Все</Button>
                </Tooltip>
                <Tooltip title="Задачи на сегодня">
                    <Button onClick={() => sortTasks('today')}>Сегодня</Button>
                </Tooltip>
                <Tooltip title="Задачи на неделю">
                    <Button onClick={() => sortTasks('week')}>На неделю</Button>
                </Tooltip>
                <Tooltip title="Задачи на  будущее">
                    <Button onClick={() => sortTasks('more-week')}>На будущее</Button>
                </Tooltip>
               <List>
                   {
                      !sortTasksOnDays.length ? <Typography sx={{marginLeft: '20px'}} variant='h3'>Пока что у вас нету задач</Typography> :
                          sortTasksOnDays.map(({_id, ...options}, i) => {
                              return (
                                  <ListItem key={_id} onClick={() => modalOpen(_id)}>
                                      <Task
                                          options={options}
                                          transletePriority={transletePriority}
                                          traslateStatus={traslateStatus}
                                      />
                                  </ListItem>
                              )
                          })
                   }
               </List>
                <TaskModal
                    user={user}
                    open={showModal}
                    handleClose={modalClose}
                    task={taskId}
                    transletePriority={transletePriority}
                    traslateStatus={traslateStatus}
                    updateData={updateData}
                />
            </Box>
        </>
    )
}

export default React.memo(AllTasks);