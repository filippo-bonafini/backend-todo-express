

// ---INIZIALIZZIAMO EXPRESS--- 
const express = require('express')
const app = express()

const cors = require('cors'); // Importa il middleware CORS

// ---IMPORTIAMO I DATI (DAL FILE PERSONE)--- 
const { tasks } = require('./tasks')

// ---DICIAMO DI USARE UN MIDDLEWARE CORS--- 
app.use(cors());

// ---DICIAMO DI USARE UN MIDDLEWARE DI EXPRESS PER LEGGERE I JSON--- 
app.use(express.json())



// ---------------------------------
// ---ELENCO DEI NOSTRI END POINT---
// ---------------------------------

// restituisce tutte le persone con solo alcuni dati
app.get('/api/tasks', (req, res) => {
    const nuovePersone = tasks.map((task) => {
        const { id, text } = task
        return { id, text }
    })
    const responseData = { data: nuovePersone }
    res.json(responseData)
})

// restituisce 1 task in base all'id 
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find(
        (task) => task.id === id
    )
    res.status(200).json({ data: task })
})

// aggiungere una task 
app.post('/api/tasks', (req, res) => {
    const task = req.body
    tasks.push(task)
    res.status(200).json({ success: true, data: tasks })
})

// modificare una task 
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    const taskToUpdate = tasks.find(task => task.id === id);
    taskToUpdate.text = updatedTask.text;
    res.status(200).json({ success: true, updatedTask });
});


// eliminare una persone 
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    res.status(200).json({ success: true, data: tasks });
});

// ---------------------------------


// ---METTIAMO EXPRESS IN ASCOLTO SULLA PORTA 3000--- 
app.listen(3000)