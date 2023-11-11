export const createForm = async (url: string, { arg }: any) => {
   try {
       const response = await fetch(url, { method: "POST", body: JSON.stringify(arg) });
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Unknown error');
       }
       
       return response.json();
   } catch (error) {
       throw new Error((error as Error).message || 'Network error');
   }
};

export const updateForm = async (url: string, { arg }: any) => {
   try {
       const response = await fetch(url, { method: "PUT", body: JSON.stringify(arg) });
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Unknown error');
       }
       
       return response.json();
   } catch (error) {
       throw new Error((error as Error).message || 'Network error');
   }
};