import { Box, Button, Paper } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "./slices/ordenesactivas";


export const OrderDetail = ({orden = []}) => {
    let orderFilter = orden.filter( (values)=> values.quantity > 0);
    const [ordenActiva, setordenActiva] = useState();
    const dispatch = useDispatch();
    const handlerOrden = () => {
      dispatch(addOrder(...orderFilter));
      // setordenActiva(...orderFilter);
      // orden = [];
      // orderFilter = [];
      // console.log(orden);
      // console.log(orderFilter);
    };
    console.log(ordenActiva);
  return (

      <Paper elevation={3} >
        <h1>Orden:</h1>
        {
            orderFilter.map( (values) => {
                return <h1 key={values.id}>Producto: {values.name} || Cantidad: {values.quantity} = Precio: {values.price*values.quantity}$</h1>
            } )
        }
              <Button onClick={handlerOrden} style={{backgroundColor: "#fff"}} variant="contained"><AddShoppingCartIcon/>Agregar Orden</Button>

        </Paper>
  )
}
