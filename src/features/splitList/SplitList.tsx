import React, { useState, useCallback, useEffect, useRef } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectNormalText, selectSplitedText, split } from "./splitListSlice"
import DroppableTextArea from '../droppableTextArea/DroppabletextArea'
import CellbaseClient from '../../clients/CellbaseClient'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'
import GeneGrid from "../geneGrid/GeneGrid"

function SplitButton() {
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

   const [genes, setGenes] = useState([] as string[]);
   useEffect(() => {
      const names = rowsFromStore.map((x: any) => (x["code"] || "") as string);
      setGenes(names);
   }, [rowsFromStore, setGenes]);


   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError} />
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton/>
         {!isLoading && <GeneGrid genes={genes} />}
         {!!isLoading && <CircularProgress style = {{ margin: "20px auto" }} />}
      </Box>
   )
}

export default SplitList;