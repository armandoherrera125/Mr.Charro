import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Divider, TextField } from '@mui/material';
import { deleteOrder } from '../slices/ordenesactivas';
import { Vuelto } from './Vuelto';

export const Orden = () => {
  const dispatch = useDispatch();
  const ordenes = useSelector((state) => state.ordenes  );
  const handlerDeleteOrder = (index) => {
    dispatch(deleteOrder(index));
  };
  const [cancelaInput, setCancelaCon] = useState({
    cancelaCon:0
});
//const [vuelto, setVuelto] = useState(0);
const {cancelaCon} = cancelaInput;
    const handleInputChange = ({ target }) => {
      //console.log(target.value);
      setCancelaCon({
          ...cancelaInput,
          [target.name]: target.value
      });
  }
  //let valorTotal;
  //
  let vuelto = 0;
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
            let vuelto = cancelaCon - valorTotal;
            vuelto = vuelto.toFixed(2);
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
                 {/* <Vuelto total={valorTotal}/> */}
                 <Box sx={{}}>
                <TextField name='cancelaCon' type="number" value={cancelaCon} onChange={handleInputChange} id="outlined-basic" label="Cancela con" variant="outlined" />
                <h1>Vuelto:${
                  
                         vuelto < 0 ? 0 : vuelto
                         
                    
                    }</h1>

    </Box>
                  <Button disabled={ cancelaCon<valorTotal } onClick={()=>handlerDeleteOrder(index)} variant="contained"><PrintIcon />Imprimir Ticket</Button>

                </Paper>
              </Box>


            )
          })
        }

      </div>
    </>
  )
}
