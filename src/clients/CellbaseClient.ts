class CellbaseClient{
   private static readonly API_URL = "http://cellbase.clinbioinfosspa.es/cellbase-4.6.3/webservices/rest/v4";

   public readonly getGeneID = async (geneStr: string) : Promise<string[]>  => {
      // process parameters and setup call      
      const request = `${CellbaseClient.API_URL}/hsapiens/feature/gene/search?assembly=grch37&limit=-1&skip=-1&skipCount=false&count=false&Output%20format=json&name=${encodeURIComponent(geneStr)}`
      try {
         const response = await fetch(request);

         if (!!response.ok) {
            const geneData = await response.json();
            const responseLength = geneData.response.result.length

            if (responseLength === 1) {            
               const geneID = geneData.response[0].result[0].id
               console.log(geneID);
               return [geneID];
            } else {
               //Return all the IDs for the genes INCOMPLETE
               const geneIds = geneData.response[0].result.map((r: any) => r.id);
               return geneIds;
            }
         } else {
            throw new Error("Error en la solicitud HTTP");         
            // ...
         }         
      } catch (error) {
         // return Promise.reject(err)
         console.log("Error: ", error);
         // throw error;
      }
   };
};

export default CellbaseClient;