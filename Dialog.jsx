
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

export const AlertDialog = ()=> {
  const dispatch = useDispatch();

  const [inputTask, setinputTask] = useState({
    nombre: "",
    precio: 0
});
const {nombre, precio} = inputTask;
    const handleInputChange = ({ target }) => {
      setinputTask({
          ...inputTask,
          [target.name]: target.value
      });
  }
    const formAction = async (e) => {
      //e.preventDefault();
      const creatingProduct = await fetch('https://backend-charro-production.up.railway.app/api/products',{
        method: 'POST',
        body: JSON.stringify({
          name: nombre,
          price: precio 
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
      });
      setinputTask({
        nombre: "",
        precio: 0
    });
      dispatch(addProduct());
      setOpen(false);
      Swal.fire(
        'Buen trabajo!',
        'Producto creado. Agregado a la lista!',
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
      <Tooltip title="Agregar Producto">
  <IconButton onClick={handleClickOpen}>
    Agregar<AddIcon />
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
          {"Agregando un nuevo producto"}
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
                width: 200,
                minHeight: 70,
            },


    }}>

        <TextField name='nombre' value={nombre} onChange={handleInputChange} id="outlined-basic" label="Nombre" variant="outlined" />
        <TextField name='precio' type="number" value={precio} onChange={handleInputChange} id="outlined-basic" label="Precio" variant="outlined" />

        </Box>

        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleClose}>Cancelar</Button>
          <Button disabled={!nombre || !precio} type="submit" variant='outlined' autoFocus onClick={formAction}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      </form>
      </div>

  );
}
