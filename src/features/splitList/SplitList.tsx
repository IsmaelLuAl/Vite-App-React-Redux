import React, { useState, useCallback, useEffect, useRef } from "react"
import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectNormalText, selectSplitedText, split } from "./splitListSlice"
import DroppableTextArea from '../droppableTextArea/DroppabletextArea'
import CellbaseClient from '../../clients/CellbaseClient'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'

function SplitButton( { onChange }: { onChange: (active: boolean) => void }) {
   const [isLoading, setLoading] = useState(false)
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();
   const controllerRef = useRef<AbortController | null>(null);

   const handleClick = useCallback(async () => {
      try {
         setLoading(true)
         onChange(isLoading)
         if (controllerRef.current) {
            controllerRef.current.abort();
         }

         const instance = new CellbaseClient();
         const trimmedPayload = textFromStore.replace(/[" "!;:,.\s\t\n_]+$/, '').split(/[" "!;:,.\s\t\n_]+/)
         const tempArray = trimmedPayload.filter((e, i) => (trimmedPayload.indexOf(e) === i));
         const geneIds: any = [];
         const abortController = new AbortController();
         controllerRef.current = abortController;

         await Promise.all(tempArray.map(async (geneStr, index) => {
            const { signal } = abortController
            const results = await instance.getGeneID(geneStr, signal);
            geneIds.push({ 
               id: index + 1, 
               code: geneStr, 
               geneIds: results.length > 0 ? results[0] : "", 
               status: results[0] === "404" ? false : true
            });
         }));

         dispatch(split(geneIds));

      } catch (error) {
         console.error("Error en la solicitud fetch:", error);
         // Manejar el error de alguna manera (por ejemplo, establecer el estado de error y mostrarlo en el componente)
      } finally {
         setLoading(false)
         onChange(isLoading)
      }
   }, [dispatch, textFromStore]);

   return (
      <Button variant="contained" color="primary" onClick={handleClick} disabled={isLoading}>Split!</Button>

   );
}

function SplitList() {

   const [error, setError] = useState("");
   const [ isLoading, setLoading] = useState(false)
   const rowsFromStore = useAppSelector(selectSplitedText);
   const controllerRef = useRef<AbortController | null>(null);
   const columns: GridColDef[] = [
      { field: 'code', headerName: 'Code', width: 150 },
      { field: 'geneIds', headerName: "Gene ID's", width: 200 },
      {
         field: 'status',
         headerName: 'Status',
         width: 100,
         renderCell: (params) => {
            const status = params.value;
            return (
               <Box display="flex" alignItems="center">
                  {status ? <DoneIcon style = {{color: "#008744"}} /> : <CloseIcon style={{ color: "#d62d20"}}/>}
               </Box>
            )
         }
      }
   ]

   const handleChildLoadingChange = (newState: boolean) => {
      setLoading(newState);
   };

   useEffect(() => {
      return () => {
         if(controllerRef.current) {
            controllerRef.current.abort()
         }
      }
   }, [])

   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError} />
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton onChange = {handleChildLoadingChange}/>
         {isLoading ? (
            <CircularProgress style = {{ margin: "20px auto" }} />
         ) : (
            <DataGrid
            rows={rowsFromStore}
            columns={columns}
            // getRowClassName={getRowClassName}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
               },
            }}
            pageSizeOptions={[20, 50]}
            checkboxSelection
         />
         )}
      </Box>
   )
}

export default SplitList;