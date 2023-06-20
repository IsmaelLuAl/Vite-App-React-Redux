import { json } from "react-router-dom";


class CellbaseClient{
   private static readonly API_URL = "http://cellbase.clinbioinfosspa.es/cellbase-4.6.3/webservices/rest/v4";

   public readonly getGeneID = async (geneStr: string) : Promise<string[]>  => {
      // process parameters and setup call      
      const request = `${CellbaseClient.API_URL}/hsapiens/feature/gene/search?assembly=grch37&limit=-1&skip=-1&skipCount=false&count=false&Output%20format=json&name=${encodeURI(geneStr)}`
      
      try {
         const response = await fetch(request);
         if (!!response.ok) {
            const jsonData = await response.json();
            const responseLength = jsonData.response.length
            if (responseLength === 1) {            
               const genID = jsonData.response[0].result[0].id
               console.log(genID);
               return [genID];
            } else {
               //Return all the IDs for the genes INCOMPLETE
               const geneIds = jsonData.response[0].result.map((r: any) => r.id);
               return geneIds;
            }
         } else {
            throw new Error("loquesea");         
            // ...
         }         
      } catch (error) {
         // return Promise.reject(err)
         console.log("ERROR");
         throw new Error("loquesea");         
      }
   };
};

export default CellbaseClient;