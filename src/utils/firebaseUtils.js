export function convertToArray(objects) {
    return Object.keys(objects).map(key => {
        return {
            key,
            ...objects[key]
        }
    })
}