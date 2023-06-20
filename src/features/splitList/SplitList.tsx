import React, {useState, useCallback, useEffect} from 'react';
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectNormalText, selectSplitedText, split, writeText } from "./splitListSlice";
import DroppableTextArea from '../droppableTextArea/DroppabletextArea';
import CellbaseClient from '../../clients/CellbaseClient';

function SplitButton() {
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();
   
   const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         (async () => {
            const  trimmedPayload = textFromStore.replace(/[" "!;:,.\s\t\n_]+$/, '');
            const  duplicatedArray = trimmedPayload.split(/[" "!;:,.\s\t\n_]+/)
            const tempArray = duplicatedArray.filter((e, i) => (duplicatedArray.indexOf(e) === i));
            const geneIds: any = [];
            for (const geneStr of tempArray) {
               const results = await instance.getGeneID(geneStr);
               geneIds.push({ code: geneStr, geneIds: 0 < results.length ? results[0] : "" });               
            }
            dispatch(split(geneIds));
         })();      
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

const instance = new CellbaseClient();


function SplitList() {

   const [error, setError] = useState("");
   const rowsFromStore = useAppSelector(selectSplitedText);
   const [data, setData] = useState([]);

   useEffect(() => {
      // instance.getGeneID("");
   }, []);

   const callAPI = () => {


      const jsonData = instance.getGeneID("BRCA2")
   }

   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError}/>         
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton/>
         <Button variant="contained" color="primary" onClick={callAPI}>API</Button>
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