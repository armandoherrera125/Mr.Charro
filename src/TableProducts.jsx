import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
import { Badge, Button, ButtonGroup, IconButton, Stack, TablePagination, TextField, Typography } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { OrderDetail } from './OrderDetail';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { Counter } from './counter/Counter';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import { addOrder } from './slices/ordenesactivas';
import { Search } from '@mui/icons-material';
export const TableProducts = () => {
    const requestAgain = useSelector((state) => state.requestAgain);
    const [nameAndDescription, setinputnameAndDescription] = useState({
        clientName: "",
        description: ""
    });
    const { clientName, description } = nameAndDescription;
    const handleInputChangeND = ({ target }) => {
        //console.log(target.value);
        setinputnameAndDescription({
            ...nameAndDescription,
            [target.name]: target.value
        });
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [valores, setvalores] = useState();
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const getProducts = async () => {
            
            //const productos = await fetch('http://localhost:8000/api/products');
            const productos = await fetch('https://backend-charro-production.up.railway.app/api/products');
            const listOfProducts = await productos.json();
            //console.log(listOfProducts);
            setOrden(listOfProducts);
            //setvalores(listOfProducts);
        };
        getProducts();

    }, [counter, requestAgain])
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
        dispatch(addOrder([...orderFilter, clientName, description, total]));
        setCounter(counter + 1);
        var data=document.getElementById('comanda').innerHTML;

        var ventana = window.open('', 'PRINT', 'height=400,width=600');
        ventana.document.write('<html><head><title style="text-align:center;align-content:center;">Comanda</title>');
        ventana.document.write('</head><body >');
        ventana.document.write('<div style="text-align: center;align-content: center;">');
        ventana.document.write('<img style="width: 0px;max-width: 0px;" src="/imagenmrcharro.jpeg" alt="Logotipo"/>'); 
        ventana.document.write('<h3>Comanda</h3>');

        //ventana.document.write('<img style="width: 155px;max-width: 155px;" src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Logotipo"/>'); 
        ventana.document.write('<h3>Orden:</h3>');
        //Cantidad: {values.quantity} || Producto: {values.name} = Precio: {values.price * values.quantity}$
            console.log(orderFilter);    
        orderFilter.map((values) => {
                return (
                    <div key={values.id}>
                        {
                            ventana.document.write(`</h1>Cantidad: ${values.quantity} Producto: ${values.name}</h1><hr />`)
                            
                        }
                        <Divider />
                    </div>
                )
            })




        //ventana.document.write(data);
        ventana.document.write(`<h3>Cliente: ${clientName}</h1>`);
        ventana.document.write(`<h3>Descripcion: ${description}</h1>`);
        ventana.document.write('</div>');
        ventana.document.write('</body></html>');
        ventana.document.close();
        ventana.focus();
        ventana.onload = function() {
          ventana.print();
          ventana.close();
        };
        Swal.fire(
            'Buen trabajo!',
            'Agregaste una nueva orden la comanda se imprimira!',
            'success'
        )
        setinputnameAndDescription({
            clientName: "",
            description: ""
        })
        return true;
    };
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
                width: 600,
                minHeight: 425,
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
                            {orden.
                                slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                .map((row) => (
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
                <TablePagination
                    rowsPerPageOptions={[4, 8, 12, 16, 20, 24, 28]}
                    component="div"
                    count={orden.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={"Productos por pagina"}
                />
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
                        <div id='comanda'>
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
                        </div>
                        <TextField sx={{ marginRight: 2, marginTop: 5 }} name='clientName' type="text" value={clientName} onChange={handleInputChangeND} id="outlined-basic" label="Cliente" variant="outlined" />

                        <TextField sx={{ marginLeft: 2, marginTop: 5 }} name='description' type="text" value={description} onChange={handleInputChangeND} id="outlined-basic" label="Descripcion" variant="outlined" />
                        
                        <h1>Total: $ {total}</h1>
                        <Button disabled={!clientName || !description} onClick={handlerOrden} style={{ marginTop: 10 }} variant="contained"><AddShoppingCartIcon />Agregar Orden</Button>
                    </Paper>

                }

            </Box>
            
        </Box>
    )
}
