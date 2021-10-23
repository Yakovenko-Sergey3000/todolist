import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ru from 'date-fns/locale/ru'



export default function InputDatePicker({valueDate}) {
    const [value, setValue] = React.useState(null );



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru} >
            <DatePicker
                label="Дата когда нужно закочить"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} name="date_end"  sx={{width: '100%'}} size="small" />}
                minDate={new Date()}
                mask='____-__-__'
               inputFormat='yyyy-MM-dd'

            />
        </LocalizationProvider>
    );
}
