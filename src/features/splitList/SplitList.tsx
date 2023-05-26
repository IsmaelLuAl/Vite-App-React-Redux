import { Box, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSplitedText, split } from "./splitListSlice";

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'split', headerName: 'Split', width: 130 },
   {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
         `${params.row.id || ''} ${params.row.split || ''}`,
   },
];

const rows = [
   { id: 1, split: 'Snow' },
   { id: 2, split: 'Lannister' },
   { id: 3, split: 'Lannister' },
   { id: 4, split: 'Stark' },
   { id: 5, split: 'Targaryen' },
   { id: 6, split: 'Melisandre' },
   { id: 7, split: 'Clifford' },
];

export function SplitList() {

   const textFromStore = useAppSelector(selectSplitedText)
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
            onChange = {(e) => dispatch(split(e.target.value))}
         />
         <DataGrid
            rows={rows}
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