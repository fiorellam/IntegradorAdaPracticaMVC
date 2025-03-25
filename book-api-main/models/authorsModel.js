// Importamos los módulos fs, path y uuid que vamos a proceder a utilizar 
const fs = require('fs'); 
const path = require('path');
const { v4 : uuidv4 } = require('uuid');

// Definimos la ruta para buscar los datos de autores en el documento JSON
const authorsPath = path.join(__dirname, '../data/authors.json'); 

// Se procede a generar la función que permita leer los autores en el documento anteriormente definido por ruta y proceder a convertirlos a data JavaScript mediante el método parse
// Se trabajó también con los errores en caso de que no pueda leer la ruta definida 
const readAuthors = () => { 
    try{
        if(!fs.existsSync(authorsPath)){
            throw new Error("⚠️ Authors file doesn't exist");
        }
        const data = fs.readFileSync(authorsPath, 'utf-8')
        return JSON.parse(data)
    }catch(err) {
        console.error("⚠️ Error reading authors", err.message);
        throw err;
    }
};

// Generamos la función que nos permita ir agregando autores, ingresando los valores nombre y nacionalidad. El id se generará por la utilización del método UUID
// Se tuvo en cuenta el manejo de errores para el caso que no se haya podido guardar el nuevo autor ingresado 
const addAuthor = (authorObject) => { 
    try{
        const authors = readAuthors();
        const newAuthor = { id: uuidv4(), name: authorObject.name, nationality: authorObject.nationality };
        authors.push(newAuthor);
        
        fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2))
        return newAuthor;
    } catch(err) {
        console.error("⚠️ Error saving author", err.message);
        throw err; 
    }
    
};

// Procedemos a generar la función de búsqueda para encontrar autores utilizando los métodos de filter(), y toLowerCase()
// que nos permiten hacer la búsqueda tanto por nombre como por nacionalidad 
// Se trabajó con el manejo de errores para el caso que no se encuentre el autor ingresado en la búsqueda
const searchAuthor = (query) => {
    try{
        const authors = readAuthors();
        const results = authors.filter(author => 
            author.name.toLowerCase().includes(query.toLowerCase()) || 
            author.nationality.toLowerCase().includes(query.toLowerCase())
        );
        if(results.length === 0){
            throw new Error("❌ Author not found"); 
            //Detiene la ejecución normal de la función
            //Salta inmediatamente al bloque catch(err), donde el error será capturado
        }
        return results;
    } catch(err){
        console.error("⚠️ Error searching author", err.message);
        throw err; //Esto hace que se lance el error al controlador y que el controlador lo maneje
        // Vuelve a lanzar el mismo error que capturó en el catch
        // Esto permite que otro nivel superior en la aplicación (como el controlador o el servidor TCP) lo maneje en lugar de simplemente imprimirlo en la consola
    }
}


// Exportamos los módulos de las funciones que acabamos de crear para que podamos reutilizarlas 
module.exports = {readAuthors, addAuthor, searchAuthor}