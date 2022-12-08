// import React from 'react'

// export const Buscar = () => {

//   return (
//     <div>
//       Hola
//     </div>
//   )
// }
import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Box, Button, Paper } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export const Buscar = () => {
  const [desde, setDesde] = React.useState(dayjs('2014-08-18T21:11:54'));

  const [hasta, setHasta] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChangeDesde = (newValue) => {
    setDesde(newValue);
  };  
  const handleChangeHasta = (newValue) => {
    setHasta(newValue);
  };  

  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'center',
      gap: 10,
      margin: 15,
      textAlign: 'center',
      '& > :not(style)': {
        m: 1,
        width: 700,
        minHeight: 425,
      },
    }}>
      <Paper elevation={3} >
        <h1>Buscar por ordenes</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
          sx={{
          }}
            label="Desde"
            inputFormat="MM/DD/YYYY"
            value={desde}
            onChange={handleChangeDesde}
            renderInput={(params) => <TextField {...params}
              sx={{
                svg: { color: '#fff' },
                input: { color: '#fff' },
              }}
            />}
          />
                    <DesktopDatePicker
            label="Hasta"
            inputFormat="MM/DD/YYYY"
            value={hasta}
            onChange={handleChangeHasta}
            renderInput={(params) => <TextField {...params}
              sx={{
                svg: { color: '#fff' },
                input: { color: '#fff' },
              }}
            />}
          />
        </LocalizationProvider>
        <Button style={{backgroundColor: "#fff",marginTop:25}} variant="contained"><LibraryBooksIcon/>Buscar orden</Button>

      </Paper>
    </Box>
  );
}