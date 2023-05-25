// import { Box, TextField } from "@mui/material";
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { useRef } from "react";

// const columns: GridColDef[] = [
//    { field: 'id', headerName: 'ID', width: 70 },
//    { field: 'split', headerName: 'Split', width: 130 },
//    {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params: GridValueGetterParams) =>
//          `${params.row.id || ''} ${params.row.split || ''}`,
//    },
// ];

// const rows = [
//    { id: 1, split: 'Snow' },
//    { id: 2, split: 'Lannister' },
//    { id: 3, split: 'Lannister' },
//    { id: 4, split: 'Stark' },
//    { id: 5, split: 'Targaryen' },
//    { id: 6, split: 'Melisandre' },
//    { id: 7, split: 'Clifford' },
// ];

// const refInputSplit = useRef();


// export function SplitList() {

//    const reading = (element) => {
//       refInputSplit.current.innerHTML = element.target.value;
//    }

//    return (
//       <Box className="textFieldBox">
//          <TextField
//             id='multiline-input-text'
//             label='Text non splitted'
//             multiline
//             fullWidth
//             rows={4}
//             margin="normal"
//             defaultValue='Introduce aquí el texto'
//             ref={refInputSplit}
//             onChange={reading}
//          />
//          <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//                pagination: {
//                   paginationModel: { page: 0, pageSize: 20 },
//                },
//             }}
//             pageSizeOptions={[20, 50]}
//             checkboxSelection
//             // // El atributo sx sirve para poder sobreescribir el css de la libreria
//             // sx={{
//             // }}
//          />
//       </Box>
//    ) 
// }


import React, { useRef, Component } from 'react'
import SendIcon from '@mui/icons-material'
import { TextField, Button } from '@mui/material'

export function SplitList() {
   const valueRef = useRef('') //creating a refernce for TextField Component

   const sendValue = () => {
      return console.log(valueRef.current.value) //on clicking button accesing current value of TextField and outputing it to console 
   }

   return (
      <form noValidate autoComplete='off'>
      <div>
         <TextField
            id='outlined-textarea'
            label='Content'
            placeholder='Write your thoughts'
            multiline
            variant='outlined'
            rows={20}
            inputRef={valueRef}   //connecting inputRef property of TextField to the valueRef
         />
         <Button
            variant="contained"
            color='primary'
            size='small'
            endIcon={<SendIcon/>}
            onClick={sendValue}
         >
         Send
         </Button>
      </div>
      </form>
   )
}