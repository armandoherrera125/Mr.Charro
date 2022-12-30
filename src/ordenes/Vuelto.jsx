import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export const Vuelto = ({total}) => {
    const [cancelaInput, setCancelaCon] = useState({
        cancelaCon:0
    });
    //const [vuelto, setVuelto] = useState(0);
    const {cancelaCon} = cancelaInput;
        const handleInputChange = ({ target }) => {
          console.log(target.value);
          setCancelaCon({
              ...cancelaInput,
              [target.name]: target.value
          });
          
      }
      let vuelto = cancelaCon - total;

  return (
    <Box sx={{}}>
                <TextField name='cancelaCon' type="number" value={cancelaCon} onChange={handleInputChange} id="outlined-basic" label="Cancela con" variant="outlined" />
                <h1>Vuelto:${
                        
                         vuelto < 0 ? 0 : vuelto.toFixed(2)
                         
                    
                    }</h1>

    </Box>
  )
}