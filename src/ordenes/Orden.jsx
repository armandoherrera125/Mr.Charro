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
  //console.log(ordenes);
  const handlerDeleteOrder = async(index) => {
    //TODO Aqui va la logica para guardar las ordenes en la BD
    let nombreCliente = '';
    let descriptionOrder = '';
    let totalValue = 0;

    const orderWithoutFormat = ordenes.filter((values, idx)=>idx == index);
    const toFindSomeValues = orderWithoutFormat[0];
    totalValue = toFindSomeValues[toFindSomeValues.length-1];
    descriptionOrder = toFindSomeValues[toFindSomeValues.length-2];
    nombreCliente = toFindSomeValues[toFindSomeValues.length-3];
    let newOrder = [];
    const arrayDuringProcess = orderWithoutFormat.map((values, idx) =>{
      newOrder = values.slice(0,values.length-3);
    });
    //TODO Aqui va la logica de imprimir el ticket
    var data=document.getElementById('ordenFinal').innerHTML;

    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title style="text-align:center;align-content:center;">Ticket</title>');
    ventana.document.write('</head><body >');
    ventana.document.write('<div style="text-align: center;align-content: center;">');
    ventana.document.write('<h1>Mr.Charro</h1>');
    ventana.document.write('<img style="width: 155px;max-width: 155px;" src="././public/imagenmrcharro.jpeg" alt="Logotipo"/>'); 
    //ventana.document.write('<img style="width: 155px;max-width: 155px;" src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Logotipo"/>'); 
    ventana.document.write('<h1>Col.Paraiso calle principal pasaje numero 8:</h1>');
    ventana.document.write('<h1>Orden:</h1>');
    ventana.document.write(data);
    ventana.document.write(`<h1>Cliente: ${nombreCliente}</h1>`);
    ventana.document.write(`<h1>Descripcion: ${descriptionOrder}</h1>`);
    ventana.document.write(`<h1>Total: ${totalValue}</h1>`);
    ventana.document.write('<p style="text-align: center;align-content: center;">¡GRACIAS POR SU COMPRA!</p>');
    ventana.document.write('</div>');
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.onload = function() {
      ventana.print();
      ventana.close();
    };
    //TODO Ya se hace request a la BD en newOrder esta el value
    const creatingOrder = await fetch('https://backend-charro-production.up.railway.app/api/orders',{
      method: 'POST',
      body: JSON.stringify({
        description: newOrder
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    });
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
            console.log(ordenesList);
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
              <div id='ordenFinal'>
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
                </div>
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