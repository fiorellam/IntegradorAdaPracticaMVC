// Importamos el módelo de autor que se generó en authorModel y responseView
const authorModel = require('../models/authorsModel');
const responseView = require('../views/responseFormatter');

// En este archivo hacemos uso de las funciones creadas en el modelo y mostramos la información que fue procesada
// Finalmente se manejan los errores en cada una de las funciones para obtener, buscar y agregar
const authorsController = {
    getAuthors: () => {
        try{
            const authors = authorModel.readAuthors();
            return responseView.responseFormatter(authors);
        } catch(err){
            return responseView.formatError("⚠️  Error retrieving authors", err.message);
        }
    },
    
    addAuthor: (newAuthor) => {
        try{
            authorModel.addAuthor(newAuthor);
            return responseView.responseFormatter(newAuthor);
        } catch(err){
            return responseView.formatError("⚠️  Error adding author", err.message);
        }
    },

    searchAuthor: (query) => {
        try{
            const results = authorModel.searchAuthor(query);
            return responseView.responseFormatter(results);
        } catch(err){
            return responseView.formatError("⚠️  Search failed", err.message);
        }
    }
};

// Se procede a exportar el módulo generado para poder reutilizarlo 
module.exports = { authorsController };