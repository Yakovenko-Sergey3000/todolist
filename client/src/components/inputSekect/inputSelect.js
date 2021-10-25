import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({  isAdmin , type = 'priority', disabled ,handleChange, value }) {
    const menuItemPriority = () => {
        let i = 0;
        const itemsPriority = [
            <MenuItem value="high">Высокий</MenuItem>,
            <MenuItem value="medium">Средний</MenuItem>,
            <MenuItem value="low">Низкий</MenuItem>,
        ]

            return (
                itemsPriority.map(item => {
                    return {...item, key: i++ }
                })
            )
        }





    const menuItemStatus = () => {

        let i = 0;
        const itemsStatus = [
            <MenuItem value="to_implementation">К выполнению</MenuItem>,
            <MenuItem value="performed">Выполняется</MenuItem>,
            <MenuItem value="done">Выполнено</MenuItem>,
        ]

        if (isAdmin) itemsStatus.push( <MenuItem value="cancel">Отменить</MenuItem> )

        return (
            itemsStatus.map(item => {
                return {...item, key: i++}
            })
        )
    }

    return (
        <Box sx={{ minWidth: '100%'}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">{type === 'status' ? 'Статус' : 'Приоритет задачи'}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={type === 'status' ? 'Статус' : 'Приоритет задачи'}
                    onChange={handleChange}
                    name={type}
                    disabled={disabled}
                >

                    {
                        type === 'status' ?
                            menuItemStatus() : menuItemPriority()
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
