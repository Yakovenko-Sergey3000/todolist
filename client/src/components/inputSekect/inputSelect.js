import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({  itemСanсel }) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: '100%'}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Приоритет задачи</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Приоритет задачи"
                    onChange={handleChange}
                    name="priority"
                >
                    <MenuItem value="high">Высоки</MenuItem>
                    <MenuItem value="Medium">Средний</MenuItem>
                    <MenuItem value="Low">Низкий</MenuItem>
                    {  itemСanсel ?  <MenuItem value="cancel">Отменить</MenuItem> : null}
                </Select>
            </FormControl>
        </Box>
    );
}
