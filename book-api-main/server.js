const net = require('net');
const readline = require('readline')
const {authorsController} = require('./controllers/authorsController');
const {booksController} = require('./controllers/booksController');
const {publishersController} = require('./controllers/publishersController')

const PORT = 8080;
const server = net.createServer((socket) => {
    console.log('✅ Client connected');

    let response = ""; 

    socket.on('data', (data) => {

        const message = data.toString().trim();
        //command y args se utiliza para poder separar la acción que quiere realizar el cliente y los argumentos que envía como parámetro
        const [command, ...args] = message.split(' ');
        
        switch (command) {
            //Se manejan todos los comandos GET que enviará el cliente, se utiliza el controlador y la función específica para cada comando
            //Una vez obtenida la respuesta, se le envía al cliente
            case 'GET':
                if (args[0] === 'AUTHORS') {
                    const authors = JSON.parse(authorsController.getAuthors());
                    socket.write(`Authors: ${JSON.stringify(authors, null, 2)}`);
                } 
                else if (args[0] === 'PUBLISHERS') {
                    const publishers = JSON.parse(publishersController.getPublishers());
                    socket.write(`Publishers: ${JSON.stringify(publishers, null, 2)}\n`);
                } else if (args[0] === 'BOOKS') {
                    const book = JSON.parse(booksController.getBooks());
                    socket.write(`Libros: ${JSON.stringify(book, null ,2)}\n`);
                } else {
                    socket.write('Command not recognized\n');
                }
                break;
            //Se manejan todos los comandos ADD que enviará el cliente, se utiliza el controlador y la función específica para cada comando
            //Se utiliza slice y join para poder obtener fragmentos específicos que introduce el cliente
            //Se valida en caso de que no se tengan los parámetros necesarios por ejemplo se revisa que se tenga el nombre, nacionalidad, ubicacion completos
            //Una vez obtenida la respuesta, se le envía al cliente
            case 'ADD':
                if (args[0] === 'AUTHOR') {
                    const origin = args.slice(args.length - 1).join(' ');
                    const name = args.slice(1, args.length - 1).join(' ');
                    if (!name || !origin) {
                        socket.write('Error: Name and nationality cannot be empty.\n');
                        return;
                    }
                    const newAuthor = authorsController.addAuthor({name: name, nationality: origin});
                    socket.write(`Added Author: ${newAuthor}`);
                } else if (args[0] === 'PUBLISHER') {
                    const name = args.slice(1, args.length -1).join(' ');
                    const located = args.slice(args.length - 1).join(' ');
                    if (!name || !located) {
                        socket.write('Error: Publisher and location cannot be empty.\n');
                        return;
                    }
                    const newPublisher = publishersController.addPublisher({publisherName: name, location: located});
                    socket.write(`Publisher added: ${newPublisher}`); 
                } else if (args[0] === 'BOOK') {
                    const parts = message.split('+').map(p => p.trim());
                    const title = parts[1];
                    const author = parts[2];
                    const publisher = parts[3];

                    if (!title || !author || !publisher) {
                        socket.write('Error: Title, author, and publisher are required.\n');
                        return;
                    }

                    const newBook = booksController.addBook({
                        newTitle: title,
                        authorId: author,
                        publisherId: publisher
                    });
                    socket.write(`Book added: ${newBook}`);
                }else {
                    socket.write('Command not recognized\n');
                }
            break;

            case 'SEARCH': 
                if(args[0] === 'BOOK'){
                    if(args[2] === 'TITLE'){
                        const titleBook = args.slice(3, data.length -1).join(' ');
                        response = booksController.searchBookByTitle(titleBook);
                        socket.write(`Book found: ${response}`)
                    }else if(args[2] === 'AUTHOR'){
                            const author = args.slice(3).join(' ');
                            response = booksController.searchBooksByAuthor(author);
                            socket.write(`Book(s) found: ${response}`)
                    } 
                }
                if(args[0] === 'AUTHOR'){
                    const nameOrNationality = args.slice(1, data.length -1).join(' ');
                    response = authorsController.searchAuthor(nameOrNationality);
                    socket.write(`Author found: ${response}`)
                }
                if(args[0] === 'PUBLISHER'){
                    const nameOrLocation = args.slice(1, data.length -1).join(' ');
                    response = publishersController.searchPublisher(nameOrLocation);
                    socket.write(`Publisher found: ${response}`)
                }
            break;
            //Es el comando para salir del uso de la api
            case 'EXIT':
                command.toUpperCase();
                socket.write('Connection finished!');
                socket.end();
            break;

            default:
                socket.write('Command not recognized!\n');
                break;
        }
    });

    socket.on('error', (err) => {
        console.error(`⚠️ Client connection error ${err.message}`);
    })

    socket.on('end', () => {
        console.log('⚠️  Client is disconnected')
    })

    socket.on('close', () => {
        console.log('❌ Client connection is closed');
    });
});

server.listen(PORT, () => {
    console.log(`🔊 TCP Server is listening on PORT ${PORT}`);
}); 
