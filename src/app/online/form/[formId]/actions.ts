export const getFormById = async (formId: string) => {
    return (await (await fetch(`/api/form/${formId}`)).json()).data
}