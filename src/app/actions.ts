export const getForms = async (uri: string) => {
    return (await ((await fetch(uri)).json())).data
}