class CellbaseClient{
   private static readonly API_URL = "http://cellbase.clinbioinfosspa.es/cellbase-4.6.3/webservices/rest/v4";

   public readonly getGeneID = async (geneStr: string, signal: AbortSignal) : Promise<string[]>  => {
      // process parameters and setup call      
      const request = `${CellbaseClient.API_URL}/hsapiens/feature/gene/search?assembly=grch37&limit=-1&skip=-1&skipCount=false&count=false&Output%20format=json&name=${encodeURIComponent(geneStr)}`
      try {
         const response = await fetch(request, { signal });

         if (!!response.ok) {
            const geneData = await response.json();
            const responseLength = geneData.response[0].result.length

            if (responseLength === 1) {            
               const geneID = geneData.response[0].result[0].id
               return [geneID];
            } else if (responseLength === 0){
               //////////////////////////////////TEMPORAL////////////////////////////////////////
               const number = 404
               const geneID = number.toString()
               // throw new Error('No se encontraron resultados para el gen especificado');
               return [geneID]
            } else {
               const geneIds = geneData.response[0].result.map((r: any) => r.id);
               return geneIds;
            }
         } else {
            throw new Error(`HTTP request error: ${response.status} - ${response.statusText}`);    
         }         
      } catch (error) {
         console.log(error);
         return Promise.reject(error)
         
      }
   };
};

export default CellbaseClient;