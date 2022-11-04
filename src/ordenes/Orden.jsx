import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Divider } from '@mui/material';
import { deleteOrder } from '../slices/ordenesactivas';
import { Vuelto } from './Vuelto';
import Swal from 'sweetalert2';

export const Orden = () => {
  const dispatch = useDispatch();
  const ordenes = useSelector((state) => state.ordenes  );
  const handlerDeleteOrder = (index) => {
    dispatch(deleteOrder(index));
    Swal.fire(
      'Buen trabajo!',
      'Imprimiendo ticket! Orden eliminada!',
      'success'
    )
  };
  return (
    <>
      <h1> Ordenes Activas</h1>

      <div>
        {
          ordenes?.map((ordenesList, index) => {
            let valorInicial = ordenes[index];
            let valorTotal = valorInicial[valorInicial.length - 1];
            let clientName = valorInicial[valorInicial.length - 3];
            let desc = valorInicial[valorInicial.length - 2];
            return (
              <Box
              key={index}
              sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  align: 'center',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                      m: 1,
                      width: 500,
                      minHeight: 500,
                  },
              }}
          >
            <Paper elevation={3}>
                {
                  ordenesList.filter((values, idx) => idx < ordenesList.length - 3).map((values, index) => {
                    return (
                      <div key={index}>
                      <h1 >{values.quantity} orden de {values.name} Precio: {values.price * values.quantity}$</h1>
                      <Divider />
                  </div>
                    )
                  })

                }
                <h1>Cliente: {clientName}</h1>
                <h1>Descripcion: {desc}</h1>
                 <h1>Total: ${valorTotal}</h1>
                 <Vuelto total={valorTotal}/>
                  <Button onClick={()=>handlerDeleteOrder(index)} style={{ backgroundColor: "#fff"}} variant="contained"><PrintIcon />Imprimir Ticket</Button>

                </Paper>
              </Box>


            )
          })
        }

      </div>
    </>
  )
}