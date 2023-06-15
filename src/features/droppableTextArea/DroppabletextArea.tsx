import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectNormalText, writeText } from "../splitList/splitListSlice";
import { TextField } from "@mui/material";

function DroppableTextArea({ onError }: { onError: (msg: string) => void }) {
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(writeText(e.target.value));
   }, [dispatch]);

   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
   }, []);

   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      const MAX_SIZE = 1 << 20;
      const fileCount = (e.dataTransfer.files || []).length;

      e.stopPropagation();
      e.preventDefault();

      if (0 === fileCount) {
         onError("Please select a File")
      } else if (1 === fileCount) {
         const file = e.dataTransfer.files[0];
         if (MAX_SIZE < file.size) {
            onError("Cannot handle too big files");
         } else {
            const reader = new FileReader()
            reader.onloadend = () => {
               dispatch(writeText(reader.result as string))
            }
            reader.onerror = () => {
               onError("Cannot read file");
            }
            reader.readAsText(file);
         }
      } else {
         onError("Cannot handle multiple files. Please, drop files one by one");
      }
   }, [dispatch, onError]);

   return (
      <TextField
         label='Text non splitted'
         multiline
         fullWidth
         rows={10}
         margin="normal"
         value={textFromStore}
         onChange={handleChange}
         onDragOver={handleDragOver}
         onDrop={handleDrop}
      />
   );
}

export default DroppableTextArea