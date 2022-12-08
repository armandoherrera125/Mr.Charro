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
import { Scrollbars } from 'react-custom-scrollbars';


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
      <h2> Ordenes Activas</h2>
      
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
                      maxWidth: 400,
                      maxHeight: 400,
                  },
              }}
          >
            <Scrollbars autoHide style={{ width: 400, height: 400 }}>
            <Paper elevation={3}>
                {
                  ordenesList.filter((values, idx) => idx < ordenesList.length - 3).map((values, index) => {
                    return (
                      <div key={index}>
                      <h2 >{values.quantity} orden de {values.name} Precio: {values.price * values.quantity}$</h2>
                      <Divider />
                  </div>
                    )
                  })

                }
                <h2>Cliente: {clientName}</h2>
                <h2>Descripcion: {desc}</h2>
                 <h2>Total: ${valorTotal}</h2>
                 <Vuelto total={valorTotal}/>
                  <Button onClick={()=>handlerDeleteOrder(index)} style={{ backgroundColor: "#fff"}} variant="contained"><PrintIcon />Imprimir Ticket</Button>

                </Paper>
                </Scrollbars>
              </Box> 
            )
          })
        }

      </div>
    </>
  )
}