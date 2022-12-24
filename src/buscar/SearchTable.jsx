import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;





export const SearchTable = ({ listOfOrdersByDay,desde,hasta }) => {
    //console.log(listOfOrdersByDay);
    
    let finalArray = [];
    const filteringOrders = listOfOrdersByDay.map( (valores)=> {
        valores.map((orders)=> finalArray.push(orders));
    });
    console.log(finalArray);

    const totalSum = () => {
        let sumaTotal = 0;
            finalArray.map( ({quantity,price})=> {
            sumaTotal = sumaTotal + (quantity*price);
            console.log(sumaTotal);
        })
        return sumaTotal;
    }
    const finalValue = totalSum();
    console.log(finalValue);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            {`Detalles de ordenes entre ${desde} hasta ${hasta}`}
                        </TableCell>
                        <TableCell align="right">Precio</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Descripcion</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Unidad</TableCell>
                        <TableCell align="right">Suma</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
          {finalArray.map((row,idx) => (
            <TableRow key={idx}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price} $</TableCell>
            <TableCell align="right">{ccyFormat(row.price*row.quantity)} $</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{finalValue} $</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IVA</TableCell>
            <TableCell align="right">0 %</TableCell>
            <TableCell align="right">0 $</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{finalValue} $</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}