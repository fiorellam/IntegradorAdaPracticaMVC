// Importamos net y readline para que el cliente pueda interactuar con el server
const net = require('net');
const readline = require('readline');
const { keyInYN } = require('readline-sync');

//conectamos con el host correspondiente
const HOST = 'localhost';
const PORT = 8080;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log('Connecting to server');
    promptUser();
});

//Muestra por pantalla las respuestas del server a las interacciones
client.on('data', (data) => {
    console.log('\nServer Answer: ', data.toString().trim());
    yesNoPromt();
});

//manejo de error en conexión
client.on('error', (err) => {
    console.error(`\n❌  Connection error, couldn't connect to server: ${err.message}`)
});

client.on('end', () => {
    console.log('\n⚠️  Disconnected from server');
    process.exit();
});

//función en caso de querer agregar un libro, solicita más información paso a paso.
function addBookPrompt(){
    rl.question("Please insert the book title: ", (bookTitle) => {
        
        rl.question("Please insert the author: ", (bookAuthor) => {
            const addBookInput = `ADD BOOK + ${bookTitle} + ${bookAuthor}` 
            client.write(addBookInput)
        });
    });
}

//Función para generar menú
function promptUser() {
    console.log("\n****************************");
    console.log("  ✅ AVAILABLE COMMANDS:");
    console.log("******************************");
    console.log("  ✍️  GET AUTHORS          → Get authors list");
    console.log("  ➕ ADD AUTHOR           → Add an author (name, nationality)");
    console.log("  ✔️SEARCH AUTHOR        → Search an author by (name author o nationality)");
    console.log("  ✍️  GET PUBLISHERS       → Get publishers list");
    console.log("  ➕ ADD PUBLISHER        → Add publisher (name)");
    console.log("  ✔️  SEARCH PUBLISHER     → Search a publisher by (name or location)");
    console.log("  ✍️  GET BOOKS            → Get books list");
    console.log("  ➕ ADD BOOK             → Add a book (title, author)");
    console.log("  ✔️  SEARCH BOOK BY TITLE → Search a book by title");
    console.log("  ✔️  SEARCH BOOK BY AUTHOR → Search book(s) by author");
    console.log("  ❌ EXIT to finish");
    console.log("*******************************");

    rl.question('Please insert a command: ', (input) => {
        input = input.toUpperCase().trim()

        if(input === 'ADD BOOK'){
            addBookPrompt()
        }else if(input === 'EXIT'){
            //Manejo de la desconexión segura del server
            console.log('Disconnecting...');
            client.end();
        }else{
            client.write(input)
        }
    });
};

//Permite volver a ejecutar comandos luego de que se resuelva el anterior
function yesNoPromt() {
    rl.question('Would you like to continue? (Y/N) ', (answer) => {
        if (answer.toUpperCase() === 'Y') {
            promptUser();
        } else {
            client.end();
        }
    });
}