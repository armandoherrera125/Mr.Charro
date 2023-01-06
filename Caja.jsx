
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addProduct } from './src/slices/dispatcherRequest';

export const Caja = ()=> {
  //const dispatch = useDispatch();

  const [inputTask, setinputTask] = useState({
    caja: "0",
});
const {caja} = inputTask;
    const handleInputChange = ({ target }) => {
      setinputTask({
          ...inputTask,
          [target.name]: target.value
      });
  }
    const formAction = async (e) => {
      //e.preventDefault();
      const creatingCaja = await fetch('https://backend-charro-production.up.railway.app/api/box',{
        method: 'POST',
        body: JSON.stringify({
            caja
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
      });
      setinputTask({
        caja: "",
    });
      //dispatch(addProduct());
      setOpen(false);
      Swal.fire(
        'Buen trabajo.!',
        'Caja creada.!',
        'success'
      )
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

     const handleClose = () => {
      setOpen(false);
     };
  return (
    <div>
      <Tooltip title="Agregar Caja">
  <IconButton onClick={handleClickOpen}>
    Caja<AddIcon />
  </IconButton>
</Tooltip>
      {/* <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        Agregar
      </Button> */}
      <form onSubmit={formAction} method="POST">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          {`Agregando la caja del dia ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`}
        </DialogTitle>
        <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            align: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 350,
                minHeight: 70,
            },


    }}>

        <TextField name='caja' type="number" value={caja} onChange={handleInputChange} id="outlined-basic" label="Caja" variant="outlined" />

        </Box>

        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>Cancelar</Button>
          <Button disabled={!caja} type="submit" variant='outlined' autoFocus onClick={formAction}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      </form>
      </div>

  );
}
