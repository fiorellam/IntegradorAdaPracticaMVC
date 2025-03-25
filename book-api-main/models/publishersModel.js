// Importamos los módulos fs, path y uuid que vamos a proceder a utilizar
const fs = require('fs');
const path = require('path');
const { v4 : uuidv4 } = require('uuid');

// Definimos la ruta para buscar los datos de editoriales en el documento JSON
const publisherPath = path.join(__dirname, '../data/publishers.json');

// Se procede a generar la función que permita leer las editoriales en el documento anteriormente definido por ruta y proceder a convertirlos a data JavaScript mediante el método parse
// Se trabajó también con los errores en caso de que no se pueda leer la ruta definida 
const readPublishers = () => {
    try{
        if(!fs.existsSync(publisherPath)){
            throw new Error("⚠️  Publishers file doesn't exist");
        }
        const data = fs.readFileSync(publisherPath, 'utf-8')
        return JSON.parse(data)
    } catch(err){
        console.error("⚠️ Error reading publishers ", err.message)
        throw err;
    }
};

// Generamos la función que nos permita ir agregando editoriales, ingresando los valores  nombre y ubicación
// El id se generará por la utilización del método UUID
// Se tuvo en cuenta el manejo de errores para el caso que no se haya podido guardar la nueva editorial ingresada 
const addPublisher = ({publisherName, location}) => { 
    try{
        const publishers = readPublishers();
        const newPublisher = { id: uuidv4(), name: publisherName, location: location}; 
    
        publishers.push(newPublisher);
        fs.writeFileSync(publisherPath, JSON.stringify(publishers, null, 2))
        return newPublisher;
    }catch(err){
        console.error("⚠️ Error saving publisher", err.message);
        throw err; 
    }
}; 

// Procedemos a generar la función de búsqueda para encontrar editoriales utilizando los métodos de filter(), y toLowerCase()
// Se trabajó con el manejo de errores para el caso que no se encuentre la editorial ingresada en la búsqueda
const searchPublisher = (query) => {
    try{
        const publishers = readPublishers();
        const results = publishers.filter(publisher => 
            publisher.name.toLowerCase().includes(query.toLowerCase()) ||
            publisher.location.toLowerCase().includes(query.toLowerCase())
        )
        if(results.length === 0){
            throw new Error("❌ Publisher not found");
        }
        return results;
    }catch(err){
        console.error("⚠️ Error searching publisher", err.message);
        throw err;
    } 
};

// Exportamos los módulos de las funciones que acabamos de crear para que podamos reutilizarlas
module.exports = { readPublishers, addPublisher, searchPublisher }  