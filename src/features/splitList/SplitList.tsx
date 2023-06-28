import React, { useState, useCallback } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectNormalText, selectSplitedText, split } from "./splitListSlice"
import DroppableTextArea from '../droppableTextArea/DroppabletextArea'
import CircularProgress from '@mui/material/CircularProgress'
import GeneGrid from "../geneGrid/GeneGrid"

function SplitButton() {
   const [isLoading, setLoading] = useState(false)
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();

   const handleClick = useCallback(() => {
      try {

         const trimmedPayload = textFromStore.trim().replace(/^[!"\s;:,.]+|[!"\s;:,.]+$/g, '').split(/[!"\s;:,.]+/);
         const namesGenArray = trimmedPayload.filter((e, i) => (trimmedPayload.indexOf(e) === i));
         dispatch(split(namesGenArray));
      } catch (error) {
         console.error(error);
         // Manejar el error de alguna manera (por ejemplo, establecer el estado de error y mostrarlo en el componente)
      }
   }, [textFromStore]);

   return (
      <Button variant="contained" color="primary" onClick={handleClick} disabled={isLoading}>Split!</Button>
   );
}

function SplitList() {

   const [error, setError] = useState("");
   const [isLoading, setLoading] = useState(false)
   const rowsFromStore = useAppSelector(selectSplitedText);

   return (
      <Box className="textFieldBox">
         <DroppableTextArea onError={setError} />
         {!!error && <Typography variant="caption">ERROR: {error}</Typography>}
         <SplitButton/>
         {!isLoading && <GeneGrid genes={rowsFromStore} />}
         {!!isLoading && <CircularProgress style = {{ margin: "20px auto" }} />}
      </Box>
   )
}

export default SplitList;