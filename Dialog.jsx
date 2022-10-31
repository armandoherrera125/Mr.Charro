
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

export const AlertDialog = ()=> {
  const [inputTask, setinputTask] = useState({
    nombre: "",
    precio: 0
});
const {nombre, precio} = inputTask;
    const handleInputChange = ({ target }) => {
      console.log(target.value);
      setinputTask({
          ...inputTask,
          [target.name]: target.value
      });
  }
    const formAction = (e) => {
      e.preventDefault();
      console.log(nombre,precio);
      setinputTask({
        nombre: "",
        precio: 0
    });
      setOpen(false);
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
      <form onSubmit={formAction}>
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
          <Button  type='submit' variant='outlined' onClick={formAction} autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      </form>
      </div>

  );
}
