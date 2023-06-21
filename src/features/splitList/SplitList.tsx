import React, { useState, useCallback } from "react"
import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectNormalText, selectSplitedText, split } from "./splitListSlice"
import DroppableTextArea from '../droppableTextArea/DroppabletextArea'
import CellbaseClient from '../../clients/CellbaseClient'

//Importante el campo "field" tiene que tener el mismo nombre que el elemento del array o sino no podrá mostrar el contenido
const columns: GridColDef[] = [
   { field: 'code', headerName: 'Code', width: 70 },
   { field: 'geneIds', headerName: "Gene ID's", width: 200 },
]
const instance = new CellbaseClient();

function SplitButton() {
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();

   const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      (async () => {
         const trimmedPayload = textFromStore.replace(/[" "!;:,.\s\t\n_]+$/, '');
         const duplicatedArray = trimmedPayload.split(/[" "!;:,.\s\t\n_]+/)
         const tempArray = duplicatedArray.filter((e, i) => (duplicatedArray.indexOf(e) === i));
         const geneIds: any = [];
         let index = 1
         for (const geneStr of tempArray) {
            debugger
            //////////////////////////////////////////////////////////////////////////////
            // Revisar porque falla aquí la petición
            //////////////////////////////////////////////////////////////////////////////
            const results = await instance.getGeneID(geneStr);
            geneIds.push({ id: index, code: geneStr, geneIds: results.length > 0 ? results[0] : "" });
            index++;
         }
         dispatch(split(geneIds));
      })();
   }, [dispatch, textFromStore]);

   return (
      <Button variant="contained" color="primary" onClick={handleClick}>Split!</Button>
   );
}

function SplitList() {

   const [error, setError] = useState("");
   const rowsFromStore = useAppSelector(selectSplitedText);

   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError} />
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton />
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