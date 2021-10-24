import React, {useCallback, useContext, useEffect, useState} from "react";
import {Box,  List, ListItem, Typography} from "@mui/material";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Task from "../components/task/task";
import TaskModal from "../components/taskModal/taskModal";

const ResposibleUser = () => {
    const {user} = useContext(AuthContext)
    const {request} = useHttp()
    const [tasks, setTasks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [taskId, setTaskId] = useState({})

    const modalOpen = (id) => {
        setShowModal(true)
        const task = tasks.find(t => t._id === id )
        setTaskId(task)
    };

    const modalClose = () => setShowModal(false);


    const getTasks = useCallback(async () => {
        const res = await request(
            'api/assigned-tasks',
            'POST',
            JSON.stringify({id: user._id})
        )
        setTasks(res)
    }, [user, request, showModal])

    const updateData = async (data) => {
        await request(
            'api/change-options',
            'PUT',
            JSON.stringify(data)
        )
        setShowModal(false)
    }


    useEffect(() => {
        getTasks()
    }, [getTasks])


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


    return(

         <Box sx={{width: '100%', overflow: 'auto'}}>
             <List>
                 {
                     !tasks.length ? <Typography sx={{marginLeft: '20px'}} variant='h3'>Пока что у вас нету задач</Typography> :
                         tasks.map(({_id, ...options}, i) => {
                             return (
                                 <ListItem key={_id}  onClick={() => modalOpen(_id)} >
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
                 updateData={updateData}
             />
         </Box>

    )
}

export default ResposibleUser;