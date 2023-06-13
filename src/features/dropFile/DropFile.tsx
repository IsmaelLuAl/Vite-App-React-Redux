import { useState, useRef } from "react"
import { useAppDispatch } from "../../app/hooks"
import { writeText } from "../splitList/splitListSlice"

export function DropFile() {

   const [dragActive, setDragActive] = useState(false)
   const inputRef: any = useRef(null);
   
   const dispatch = useAppDispatch()

   const handleDrag = function(e:any) {
      e.preventDefault()
      e.stopPropagation()

      if(["dragenter", "dragover"].includes(e.type)) {
         setDragActive(true)
      } else if (e.type === "dragleave") {
         setDragActive(false)
      }
   }

   const handleDrop = function(e:any) {
      // "preventDefault" evita que el fichero se abra/ejecute
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      
      const archivo = e.dataTransfer.files[0]
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
         const reader = new FileReader()

         reader.readAsText(archivo)

         reader.onload = () => {
            dispatch(writeText(reader.result))
         }

         reader.onerror = () => {
            console.log("Error al cargar el archivo");
         }
         
         // const texto = lector.readAsText(e.dataTransfer.files[0])
         
         //Trabajamos con el fichero
         // handleFiles(e.dataTransfer.files)
      }
   }

   const handleChange = function(e:any) {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
         // Tiene que selecionarse almenos un archivo
         // handleFiles(e.target.files)
      }
   }

   const onButtonClick = () => {
      inputRef.current.click()
   }

   return (
      <>
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={false} accept="file/txt" onChange={handleChange}/>
         <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
            <div>
               <p>Drag and drop your file here or</p>
               <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
            </div> 
         </label>
         { dragActive && <div id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop} /> }
      </form>
      </>
   )
}

export default DropFile