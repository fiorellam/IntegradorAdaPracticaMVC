// Importamos los módulos fs, path y uuid que vamos a proceder a utilizar. Como así también las funciones generadas en authorsModel.js
const fs = require('fs');
const path = require('path');
const {readAuthors, addAuthor} = require('./authorsModel');
const { v4 : uuidv4 } = require('uuid');
const { readPublishers } = require('./publishersModel');
const { log } = require('console');

// Definimos la ruta para buscar los datos de libros en el documento JSON
const booksPath = path.join(__dirname, '../data/books.json');

// Se procede a generar la función que permita leer los libros en el documento anteriormente definido por ruta y proceder a convertirlos a data JavaScript mediante el método parse
// Se trabajó también con los errores en caso de que no se pueda leer la ruta definida 
const readBooks = () => {
    try{
        if(!fs.existsSync(booksPath)){
            throw new Error("⚠️  Books file doesn't exist");
        }
        const data = fs.readFileSync(booksPath, 'utf-8')
        return JSON.parse(data)
    } catch(err) {
        console.error("⚠️  Error reading books", err.message);
        throw err;
    }
};

// Generamos la función que nos permita ir agregando libros, ingresando los valores título y autor
// El id se generará por la utilización del método UUID. Se asignará como valor del autor el UUID correspondiente al autor ingresado. De no existir, se previene la posibilidad de ingresar al nuevo autor
// Se tuvo en cuenta el manejo de errores para el caso que no se haya podido guardar el nuevo libro ingresado  
const addBook = ({newTitle, authorId, publisherId}) => {
    try {
        const books = readBooks(); 
        const authors = readAuthors();
        const publishers = readPublishers();
    
        const author = authors.find(author =>
            author.id === authorId);
        
        if(!author){
            throw new Error("⚠️  Author profile doesn't exist. Register a new author before adding a new book");
        }
        const publisher = publishers.find(publisher =>
            publisher.id === publisherId);
        
        if(!publisher){
            throw new Error("⚠️  Publisher profile doesn't exist. Register a new publisher before adding a new book");
        }
        const newBook = { id: uuidv4(), title: newTitle, author: author.id, publisher: publisher.id};
        books.push(newBook);
        fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
        return newBook
    } catch (err) {
        console.error("⚠️  Error saving book:", err.message);
        throw err; 
    }
}; 

// Procedemos a generar la función de búsqueda para encontrar libros utilizando los métodos de filter(), y toLowerCase()
// que nos permiten hacer la búsqueda por título
// Se trabajó con el manejo de errores para el caso que no se encuentre el libro ingresado en la búsqueda
const searchBookByTitle = (query) =>{
    try{
        const books = readBooks(); 
        const results = books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
        ); 

        if(results.length === 0){
            throw new Error('⚠️  Book not found');
        }
        return results;
    } catch(err){
        console.error("⚠️  Error searching that book:", err.message);
        throw err;
    }
}

// Procedemos a generar la función de búsqueda para encontrar libros por autor utilizando los métodos filter(), find(), y toLowerCase()
// Se trabajó con el manejo de errores para el caso que no se encuentre el autor ingresado en la búsqueda y también prevenimos la creación de objetos vacíos
const searchBooksByAuthor = (query) =>{
    try{
        const books = readBooks();
        const authors = readAuthors();
        const requestedAuthor = authors.find(author =>
            author.name.toLowerCase().includes(query.toLowerCase())
        );
        const result = books.filter(book => 
            book.author === requestedAuthor.id
        );
        if (!requestedAuthor) {
            throw new Error("⚠️  No author found with that name.");
        }
        return result
    }
    catch(err){
        console.error("⚠️  Error searching that author:", err.message);
        throw err;
    }
}

// Exportamos los módulos de las funciones que acabamos de crear para que podamos reutilizarlas 
module.exports = {readBooks, addBook, searchBookByTitle, searchBooksByAuthor}