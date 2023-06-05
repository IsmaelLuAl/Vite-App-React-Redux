import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectNormalText, selectSplitedText, split, writeText } from "./splitListSlice";

//Importante el campo "field" tiene que tener el mismo nombre que el elemento del array y sino no podrá mostrar el contenido
const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'code', headerName: 'Code', width: 130 },
   {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
         `${params.row.id || ''} - ${params.row.code || ''}`,
   },
];

const rows = [
   { id: 1, code: 'Snow' },
   { id: 2, code: 'Lannister' },
   { id: 3, code: 'Lannister' },
   { id: 4, code: 'Stark' },
   { id: 5, code: 'Targaryen' },
   { id: 6, code: 'Melisandre' },
   { id: 7, code: 'Clifford' },
]

export function SplitList() {

   const textFromStore = useAppSelector(selectNormalText)
   const rowsFromStore = useAppSelector(selectSplitedText)
   const dispatch = useAppDispatch()

   return (
      <Box className="textFieldBox">
         <span>{textFromStore}</span>
         <TextField
            id='multiline-input-text'
            label='Text non splitted'
            multiline
            fullWidth
            rows={10}
            margin="normal"
            value={textFromStore}
            onChange = {(e) => dispatch(writeText(e.target.value))}
         />
         <Button onClick={() => dispatch(split(textFromStore))}>SPLIT</Button>
         <DataGrid
            rows={rowsFromStore}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
               },
            }}
            pageSizeOptions={[20, 50]}
            checkboxSelection
            // // El atributo sx sirve para poder sobreescribir el css de la libreria
            // sx={{
            // }}
         />
      </Box>
   ) 
}