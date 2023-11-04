// ---INIZIALIZZIAMO EXPRESS--- 
const express = require('express')
const app = express()

// ---IMPORTO IL MIDDLEWARE CORS--- 
const cors = require('cors');

// IMPORT IL ROUTER DELLE API TASK 
const tasksRouter = require('./routes/tasks')

// CONNETTIAMOCI AL DB 
require('./db')




// ---DICIAMO DI USARE UN MIDDLEWARE CORS--- 
app.use(cors());

// ---DICIAMO DI USARE UN MIDDLEWARE DI EXPRESS PER LEGGERE I JSON--- 
app.use(express.json())

// ENDPOINT ------------------
app.use('/api/tasks', tasksRouter)
// ---------------------------



// ---METTIAMO EXPRESS IN ASCOLTO SULLA PORTA 3000--- 
app.listen(3000)