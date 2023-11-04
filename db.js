const mongoose = require("mongoose");
const uri = "mongodb+srv://filippo-bonafini:3WPTPjvcLbu9Rl27@db-todo-app.af4hfle.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connessione al database riuscita');
    } catch (error) {
        console.error(error); // Stampa l'errore nella console
    }
}

connect();
