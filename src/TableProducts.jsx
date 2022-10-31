import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import TableRow from '@mui/material/TableRow';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge, Button, ButtonGroup, IconButton, Stack, Typography } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { OrderDetail } from './OrderDetail';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { Counter } from './counter/Counter';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';

import { addOrder } from './slices/ordenesactivas';
import { Search } from '@mui/icons-material';
export const TableProducts = () => {





    const [valores, setvalores] = useState();
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const getProducts = async () => {
            const productos = await fetch('https://backend-charro-production.up.railway.app/api/products');
            const listOfProducts = await productos.json();
            //console.log(listOfProducts);
            setOrden(listOfProducts);
            //setvalores(listOfProducts);
        };
        getProducts();

    }, [counter])
    //console.log(valores);


    const dispatch = useDispatch();
    const [listOfOrders, setlistOfOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    function createData(
        id,
        name,
        price,
        quantity
    ) {
        return {
            id,
            name,
            price,
            quantity,
        };
    }

    const rows = [
        createData('id_tacos', 'Tacos', 3.50, 0),
        createData('id_tortas', 'Tortas', 4.25, 0),
        createData('id_nachos', 'Nachos', 3.25, 0),
        createData('id_carne', 'Carne Asada', 5.25, 0),
    ];




    const [orden, setOrden] = useState([]);
    //console.log(orden);
    const incrementingProduct = (id) => {
        //console.log(id);
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
    const orderFilter = orden.filter((values) => values.quantity > 0);
    const handlerOrden = () => {
        dispatch(addOrder([...orderFilter, total]));
        setCounter(counter + 1);
        // orden.forEach( (values)=> {
        //     if (values.quantity !==0) {
        //         values.quantity = 0;
        //         setOrden([...orden]);
        //     }
        // })
        // console.log(orden);
        //console.log(...orderFilter);
        //  setlistOfOrders([...orderFilter]);
        //setOrden(rows);

          navigate('/ordenes')
    };
    //console.log(orderFilter);
    useEffect(() => {
        let totalHere = 0;
        orden.forEach((values) => {
            totalHere = totalHere + values.quantity * values.price;
            setTotal(totalHere);
        });
    }, [orden])
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
    //   const [searched, setSearched] = useState("");
  
    //   const requestSearch = (searchedVal) => {
    //     const filteredRows = orden.filter((row) => {
    //       return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    //     });
    //     setOrden(filteredRows);
    //   };
    //   const handlerChange = (e) => {
    //     setSearched(e.target.value);
    //     const filteredRows = orden.filter((row) => {
    //         return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    //       });
    //       setOrden(filteredRows);
    //   };
    
    //   const cancelSearch = () => {
    //     setSearched("");
    //     requestSearch(searched);
    //   };
    //   console.log(searched);
    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'flex-start',
            justifyContent: 'left',
            textAlign: 'center',
            align: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 700,
                minHeight: 400,
            },
        }}>
            <Paper>
            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
            <TableContainer component={Paper}>
                <Table sx={{ Width: 100, align: 'center' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <QrCodeScannerIcon /> ID (Producto) </TableCell>
                            <TableCell> <FastfoodIcon /> Nombre (Producto) </TableCell>
                            <TableCell align="right"> <PaidIcon /> Precio ($)</TableCell>
                            <TableCell align="right"><AddShoppingCartIcon /> Cantidad a ordenar</TableCell>
                            <TableCell align="right"><AddCircleIcon />Agregar Producto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orden.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
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
            </Paper>
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
                        width: 800,
                        minHeight: 400,
                    },
                }}
            >
                {
                    orden.some((values) => values.quantity > 0) &&
                    // <OrderDetail orden={orden}/>
                    <Paper elevation={3} >
                        <h1>Orden:</h1>
                        {/* <Typography sx={{
                            display: 'inline-block',
                            marginTop: 2
                        }} variant="h3" gutterBottom>
                            Orden:
                        </Typography>
                        <Typography sx={{
                            display: 'inline-block',
                            marginLeft: 50
                        }} variant="h3" gutterBottom>
                            Total:
                        </Typography> */}
                        <Divider />
                        {
                            orderFilter.map((values) => {
                                return (
                                    <div key={values.id}>
                                        <h1 >Cantidad: {values.quantity} || Producto: {values.name} = Precio: {values.price * values.quantity}$</h1>
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                        <h1>Total: $ {total}</h1>
                        <Button onClick={handlerOrden} style={{ backgroundColor: "#fff", marginTop: 10 }} variant="contained"><AddShoppingCartIcon />Agregar Orden</Button>
                    </Paper>

                }

            </Box>
        </Box>
    )
}
