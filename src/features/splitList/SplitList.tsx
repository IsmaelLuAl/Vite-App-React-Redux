import React, {useState, useCallback} from 'react';
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getGeneID, selectNormalText, selectSplitedText, split, writeText } from "./splitListSlice";
import DroppableTextArea from '../droppableTextArea/DroppabletextArea';

function SplitButton() {
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();
   
   const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      dispatch(split(textFromStore));
   }, [dispatch, textFromStore]);

   return (
      <Button variant="contained" color="primary" onClick={handleClick}>Split!</Button>
   );
}

//Importante el campo "field" tiene que tener el mismo nombre que el elemento del array o sino no podrá mostrar el contenido
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
      `${params.row.id !== null && params.row.id !== undefined ? params.row.id : ''} - ${params.row.code || ''}`,
   },
]

function SplitList() {

   const [error, setError] = useState("");
   const rowsFromStore = useAppSelector(selectSplitedText);

   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError}/>         
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton/>
         {/* <Button onClick={() => getGeneID}>Petición Fetch</Button> */}
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
         />
      </Box>
   ) 
}

export default SplitList;