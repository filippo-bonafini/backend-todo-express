const express = require("express");
const router = express.Router();
const Task = require('../models/task');

// ---------------------------------
// ---ELENCO DEGLI END POINT---
// ---------------------------------

// Restituisce tutte le tasks con solo alcuni dati
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({}, 'id text data');
        res.json({ data: tasks });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero delle tasks' });
    }
});

// Restituisce tutte le task da completare 
router.get('/incomplete', async (req, res) => {
    try {
        const incompleteTasks = await Task.find({ 'data.complete': false });
        res.status(200).json({ data: incompleteTasks });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero delle tasks incomplete' });
    }
});

// Restituisce tutte le task completate
router.get('/complete', async (req, res) => {
    try {
        const completeTasks = await Task.find({ 'data.complete': true });
        res.status(200).json({ data: completeTasks });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero delle tasks complete' });
    }
});

// Restituisce 1 task in base all'id 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ id });
        if (task) {
            res.status(200).json({ data: task });
        } else {
            res.status(404).json({ error: 'Task non trovata' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero della task' });
    }
});

// Aggiungere una task 
router.post('/add', async (req, res) => {
    const taskData = req.body;
    try {
        const task = new Task(taskData);
        await task.save();
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Errore nell\'aggiunta della task' });
    }
});

// Modificare una task 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTaskData = req.body;
    try {
        const updatedTask = await Task.findOneAndUpdate({ id }, updatedTaskData, { new: true });
        if (updatedTask) {
            res.status(200).json({ success: true, data: updatedTask });
        } else {
            res.status(404).json({ error: 'Task non trovata' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento della task' });
    }
});

// Eliminare una task 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.deleteOne({ id });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'eliminazione della task' });
    }
});

// ---------------------------------

module.exports = router;
