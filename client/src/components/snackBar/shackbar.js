import {Snackbar} from '@mui/material'

const Shackbar = ({open, handleClose}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open.open}
            onClose={handleClose}
            message={open.msg}

        />
    )
}

export  default Shackbar;