import { useEffect, useState } from "react"
import CellbaseClient from "../../clients/CellbaseClient";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectNormalText, split } from "../splitList/splitListSlice";

const instance = new CellbaseClient();

const ListInfiniteScroll = () => {
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [page, setPage] = useState(1)
   const textFromStore = useAppSelector(selectNormalText);
   const dispatch = useAppDispatch();

   
   useEffect(() => {
      fetchData();
   }, [])

   const fetchData = async () => {
      setIsLoading(true)
         try {
            const trimmedPayload = textFromStore.replace(/[" "!;:,.\s\t\n_]+$/, '');
            const duplicatedArray = trimmedPayload.split(/[" "!;:,.\s\t\n_]+/)
            const tempArray = duplicatedArray.filter((e, i) => (duplicatedArray.indexOf(e) === i));
            const geneIds: any = [];
            let index = 1

            for (const geneStr of tempArray) {
               const results = await instance.getGeneID(geneStr);
               geneIds.push({ id: index, code: geneStr, geneIds: results.length > 0 ? results[0] : "" });
               index++;
            }

            dispatch(split(geneIds))
            setIsLoading(false)

         } catch (error) {
            console.log(error)
            setIsLoading(false)

         }
   }

   const handleScroll = (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;

      if(scrollHeight - scrollTop === clientHeight && !isLoading) {
         setPage((prevPage) => prevPage +1)
      }
   }
}