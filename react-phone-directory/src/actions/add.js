export const addContact = () => {
    return {
        type: 'addContact',
    }
}

export const updaten = (name, value) => ({
    type: 'updaten',
    name, value
})
