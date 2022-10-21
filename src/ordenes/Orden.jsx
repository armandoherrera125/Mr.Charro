import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Orden = () => {
  const ordenes = useSelector((state) => state.ordenes.value)
  console.log(ordenes);
  return (
    <>
    <h1> Ordenes Activas.</h1>
    <div>
      {
        ordenes.map( (values)=> {
         return  <h1>
           Nombre: {values.name} - Precio: {values.price} - Cantidad: {values.quantity}
          </h1>
        })
      }
    </div>
    </>
  )
}
