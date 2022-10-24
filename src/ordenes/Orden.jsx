import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Divider } from '@mui/material';

export const Orden = () => {
  const ordenes = useSelector((state) => state.ordenes.value);
  return (
    <>
      <h1> Ordenes Activas</h1>
      <div>
        {
          ordenes.map((ordenesList, index) => {
            let valorInicial = ordenes[index];
            let valorTotal = valorInicial[valorInicial.length - 1];
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
                  ordenesList.filter((values, idx) => idx < ordenesList.length - 1).map((values, index) => {
                    return (
                      <div key={index}>
                      <h1 >{values.quantity} orden de {values.name} Precio: {values.price * values.quantity}$</h1>
                      <Divider />
                  </div>
                    )
                  })

                }
                 <h1>Total: ${valorTotal}</h1> 
                  <Button style={{ backgroundColor: "#fff"}} variant="contained"><PrintIcon />Imprimir Ticket</Button>

                </Paper>
              </Box>


            )
          })
        }

      </div>
    </>
  )
}
