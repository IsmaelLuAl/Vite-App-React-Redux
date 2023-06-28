import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CellbaseClient from '../../clients/CellbaseClient';
import CircularProgress from '@mui/material/CircularProgress';
interface GeneRowProps {
   gene: string;
}

function GeneRow({gene}: GeneRowProps) {
   const [geneId, setGeneId] = useState("");
   const [loading, setLoading] = useState(true);
   const rowClassName = geneId === "404" ? "error-row" : "";
   
   useEffect(() => {
      const instance = new CellbaseClient();
      const abortController = new AbortController();      
      (async function() {
         setLoading(true);
         if(gene === "") {
            setGeneId("404")
         } else {
            const results = await instance.getGeneID(gene, abortController.signal);
            setGeneId(results.join(","));
         }
         setLoading(false);
      })();
      return () => { abortController.abort(); };
   }, [gene, setGeneId, setLoading]);
   
   return (
      <TableRow className={rowClassName}>
         <TableCell>{gene}</TableCell>
         <TableCell>{ !!loading ? <CircularProgress /> : <Typography>{geneId}</Typography>}</TableCell>
         <TableCell></TableCell>
      </TableRow>
   );
}

interface GGProps {
   genes: string[];
}

function GeneGrid({ genes }: GGProps) {
   return (
      <Table>
         <TableHead>
            <TableRow>
               <TableCell>Code</TableCell>
               <TableCell>ID</TableCell>
               <TableCell>Status</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {
               genes.map(gene => (<GeneRow key={gene} gene={gene} />))
            }
         </TableBody>
      </Table>
   );
}

export default GeneGrid