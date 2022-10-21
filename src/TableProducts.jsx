import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { OrderDetail } from './OrderDetail';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { Counter } from './counter/Counter';
import { useDispatch } from 'react-redux';
import { addOrder } from './slices/ordenesactivas';
export const TableProducts = () => {
    const dispatch = useDispatch();
    const [listOfOrders, setlistOfOrders] = useState([]);
    const navigate = useNavigate();
    function createData(
        id,
        name,
        descripcion,
        time,
        price,
        quantity
    ) {
        return {
            id,
            name,
            descripcion,
            time,
            price,
            quantity,
        };
    }

    const rows = [
        createData('id_tacos', 'Tacos', 'Ricos tacos mexicanos', '6.0 min', 3.50, 0),
        createData('id_tortas', 'Tortas', 'Ricos tortas de carne', '10.0 min', 4.25, 0),
        createData('id_nachos', 'Nachos', 'Ricos nachos con queso', '5.0 min', 3.25, 0),
        createData('id_carne', 'Carne Asada', 'Deliciosa carne asada blandita', '15.0 min', 5.25, 0),
    ];
    const [orden, setOrden] = useState(rows);
    const incrementingProduct = (id) => {
        orden.forEach((values) => {
            if (id == values.id) {
                values.quantity = values.quantity + 1;
                const name = values.name;
                // console.log(values.quantity);
                // console.log(name);

                setOrden([...orden]);
            }
        });
    };
    const decrementingProduct = (id) => {
        orden.forEach((values) => {
            if (id == values.id) {
                values.quantity = values.quantity - 1;
                const name = values.name;
                // console.log(values.quantity);
                // console.log(name);

                setOrden([...orden]);
            }
        });
    };
    const orderFilter = orden.filter( (values)=> values.quantity > 0);
    const handlerOrden = () => {
        dispatch(addOrder(...orderFilter));
        //  setlistOfOrders([...orderFilter]);
          setOrden(rows);
        //  navigate('/ordenes',{
        //     state: {
        //         listOfOrders
        //     }
        //   })
     };
     console.log(listOfOrders);
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ Width: 100, align: 'center' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <QrCodeScannerIcon /> ID (Producto) </TableCell>
                            <TableCell> <FastfoodIcon /> Nombre (Producto) </TableCell>
                            <TableCell align="right"> <DescriptionIcon /> Descripcion</TableCell>
                            <TableCell align="right"> <AccessTimeFilledIcon /> Tiempo de preparacion</TableCell>
                            <TableCell align="right"> <PaidIcon /> Precio ($)</TableCell>
                            <TableCell align="right"><AddShoppingCartIcon/> Cantidad a ordenar</TableCell>
                            <TableCell align="right"><AddCircleIcon />Agregar Producto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orden.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="right">{row.descripcion}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.price} $</TableCell>
                                <TableCell align="right">{row.quantity} </TableCell>
                                <TableCell align="right"> <ButtonGroup>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => decrementingProduct(row.id)}
                                        disabled={row.quantity === 0}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() => incrementingProduct(row.id)}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                        width: 700,
                        height: 350 ,
                    },
                }}
            >
                {
                    orden.some((values) => values.quantity > 0) &&
                    // <OrderDetail orden={orden}/>
                    <Paper elevation={3} >
                    <h1>Orden:</h1>
                    {
                        orderFilter.map( (values) => {
                            return <h1 key={values.id}>Producto: {values.name} || Cantidad: {values.quantity} = Precio: {values.price*values.quantity}$</h1>
                        } )
                    }
                          <Button onClick={handlerOrden} style={{backgroundColor: "#fff"}} variant="contained"><AddShoppingCartIcon/>Agregar Orden</Button>
                    </Paper>

                }

            </Box>
        </>
    )
}
