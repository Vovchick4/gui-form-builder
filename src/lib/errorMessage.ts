export default function displayErrorMessage(err: Error) {
    const e = err as Error
    if (e.message) {
        let errorMessage;
        try {
            const parsedError = JSON.parse(e.message);
            if (parsedError && parsedError.error && parsedError.error.data) {
                const dataErrors = parsedError.error.data;                
                errorMessage = Object.values(dataErrors)
                    .map((error: any) => error.message)
                    .join(', ');
                return errorMessage;
            }
        } catch (parseError) {
            console.error('Parsing error:', parseError);
        }
    }
    return "Provide err message@"  
}