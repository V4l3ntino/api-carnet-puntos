export const newMessage = (value:string, status) => {
    const message: messageResponse = {
        msg: value,
        status: status
    }
    return message
}