import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ru from 'date-fns/locale/ru'



export default function InputDatePicker({valueDate, setDate, formaDate = {inputFormat: 'pg', masks: 'pg'}, disablet = false }) {


    const format = {
        pg: 'yyyy-MM-dd',
        ru: 'dd.MM.yyyy'
    }

    const masks = {
        pg: '____-__-__',
        ru: '__.__.____'
    }



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru} >
            <DatePicker
                label="Дата когда нужно закочить"
                value={valueDate}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} name="date_end"  sx={{width: '100%'}} size="small" />}
                minDate={new Date()}
                mask={masks[formaDate.masks]}
                 inputFormat={format[formaDate.inputFormat]}
                disabled={disablet}

            />
        </LocalizationProvider>
    );
}
