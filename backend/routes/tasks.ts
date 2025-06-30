import express from 'express';
import Task from '../models/Task';

const router = express.Router();

// Get all tasks
router.get('/', async (_, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create new task
router.post('/', async (req, res) => {
  const { title, start } = req.body;
  const newTask = new Task({ title, start });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put('/:id', async (req, res) => {
  const { title, start } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, start },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

export default router;
