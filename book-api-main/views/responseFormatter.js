
// Se crea una función para poder darle una respuesta al cliente y otra para poder manejar la vista de los errores 
// que se puedan producir en la api

const responseFormatter = (data) =>{
    if(!data){
        return JSON.stringify({error: "⚠️ Information not found"})
    } return JSON.stringify(data, null, 2)
};

const formatError = (message, errorInfo) => {
    return JSON.stringify({
        message,
        errorInfo
    }, null, 2);
};

// Se exportan las funciones generadas para poder reutilizarlas 
module.exports = { responseFormatter, formatError };