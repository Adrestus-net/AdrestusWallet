const apiRequest = async (url = '',type, data,authToken="", response=null,errMsg = null) => {
    try {
        const postOptions = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                //'Access-Control-Allow-Credentials': 'true',
                //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                //'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, postOptions);
        return response
    } catch (err) {
        errMsg = err.message;
        return errMsg;
    }
}

export default apiRequest;