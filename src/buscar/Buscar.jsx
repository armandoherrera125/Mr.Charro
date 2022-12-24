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
import { Box, Button, LinearProgress, Paper } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { SearchTable } from './SearchTable';
import CircularProgress from '@mui/material/CircularProgress';



export const Buscar = () => {
  const [desde, setDesde] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const [hasta, setHasta] = React.useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [isLoading, setLoading] = React.useState(false);

  const [listOfOrdersByDay, setlistOfOrdersByDay] = useState([]);
  const handleChangeDesde = (newValue) => {
    setDesde(dayjs(newValue).format('YYYY-MM-DD'));
  };
  const handleChangeHasta = (newValue) => {
    setHasta(dayjs(newValue).format('YYYY-MM-DD'));
  };
  const handlerSearchOrders = async () => {
    setLoading(true);
    const searchingOrders = await fetch(`https://backend-charro-production.up.railway.app/api/orders?startDate=${desde}&endDate=${hasta}`);
    const ordersFound = await searchingOrders.json();
    setlistOfOrdersByDay(ordersFound);
    setLoading(false);
  };
  let props = {
    listOfOrdersByDay,
    desde,
    hasta
  };
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'center',
        textAlign: 'center',
        '& > :not(style)': {
          m: 1,
          width: 700,
          minHeight: 200,
        },
      }}>
        <Paper elevation={3} >
          <h2>Buscar por ordenes:</h2>
          <h2>Mes / Dia / Año</h2>
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
          <Button disabled={isLoading} onClick={handlerSearchOrders} style={{ backgroundColor: "#fff", marginTop: 25 }} variant="contained"><LibraryBooksIcon />Buscar orden</Button>
          
          {/* onClick={handlerSearchOrders} */}
          {/* {listOfOrdersByDay.length>0 ? 
          <div>
            {
              listOfOrdersByDay.map( values => <h1 key={values.id}>{values.description}</h1>)
            }
          </div>
          
        : '' } */}
        </Paper>
      </Box>

        {
          isLoading ?     <Box sx={{ width: '100%' }}>
           <h2> Cargando...</h2>
          <LinearProgress color='primary'/>
        </Box>
          : 
      listOfOrdersByDay.length > 0 ?
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            align: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              maxWidth: 900,
              maxHeight: 100,
            },
          }}
        >
          <Paper elevation={3}>
            <SearchTable {...props} />
          </Paper>
        </Box>
        : 
          <h2>No hay ordenes en la fecha introducida</h2>
        }
    </>
  );
}