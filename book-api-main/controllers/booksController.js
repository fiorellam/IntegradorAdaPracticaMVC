// Importamos el módelo de libros que se generó en bookModel y responseView
const bookModel = require('../models/booksModel');
const responseView = require('../views/responseFormatter');

// En este archivo hacemos uso de las funciones creadas en el modelo y mostramos la información que fue procesada
// Finalmente se manejan los errores en cada una de las funciones para obtener, buscar y agregar
const booksController = {
    getBooks: () => {
        try{
            const books = bookModel.readBooks();
            return responseView.responseFormatter(books)
        } catch(err){
            return responseView.formatError("⚠️  Error retrieving books", err.message);
        }
    },

    addBook: (newBook) => {
        try{
            bookModel.addBook(newBook)
            return responseView.responseFormatter(newBook)
        } catch (err) {
            return responseView.formatError("⚠️  Error adding book", err.message);
        }
    },

    searchBookByTitle: (data)=>{
        try{
            const result = bookModel.searchBookByTitle(data);
            if(!result){
                return responseView.formatError("⚠️  No book was found with that title");
            }
            return responseView.responseFormatter(result);
        } catch(err){
            return responseView.formatError("⚠️  Error finding that book", err.message);
        }
    },

    searchBooksByAuthor: (data)=>{
        try{
            const result = bookModel.searchBooksByAuthor(data);
            if(!result){
                return responseView.formatError("⚠️  No book was found for that author");
            }
            return responseView.responseFormatter(result);
        } catch(err){
            return responseView.formatError("⚠️  Error finding a book with that author", err.message);
        }
    }
}

// Se procede a exportar el módulo generado para poder reutilizarlo
module.exports = { booksController }; 