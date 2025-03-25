// Importamos el módelo de editoriales que se generó en publishersModel y responseView
const publisherModel = require('../models/publishersModel');
const responseView = require('../views/responseFormatter');

// En este archivo hacemos uso de las funciones creadas en el modelo y mostramos la información que fue procesada
// Finalmente se manejan los errores en cada una de las funciones para obtener, buscar y agregar
const publishersController = {
    getPublishers: () => {
        try{
            const publishers = publisherModel.readPublishers();
            return responseView.responseFormatter(publishers);
        } catch(err){
            return responseView.formatError("⚠️  Error retrieving publishers", err.message);
        }
    },
    
    addPublisher: (newPublisher) => {
        try{
            publisherModel.addPublisher(newPublisher);
            return responseView.responseFormatter(newPublisher);
        }catch(err){
            return responseView.formatError("⚠️  Error adding publisher", err.message);
        }
    },

    searchPublisher: (query) => {
        try{
            const results = publisherModel.searchPublisher(query);
            return responseView.responseFormatter(results);
        } catch(err){
            return responseView.formatError("⚠️  Search failed", err.message);
        }
    }
};

// Se procede a exportar el módulo generado para poder reutilizarlo
module.exports = { publishersController }; 