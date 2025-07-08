// backend/routes/tasks.ts
import express from 'express';
import Task from '../models/Task';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title, start } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = new Task({ 
      title: title.trim(), 
      start: start ? new Date(start) : null 
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, start, completed } = req.body;
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (start !== undefined) updateData.start = start ? new Date(start) : null;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Bulk update tasks (for reordering)
router.patch('/bulk-update', async (req, res) => {
  try {
    const { tasks } = req.body;
    
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: 'Tasks must be an array' });
    }

    const bulkOps = tasks.map((task, index) => ({
      updateOne: {
        filter: { _id: task._id },
        update: { $set: { order: index } }
      }
    }));

    await Task.bulkWrite(bulkOps);
    res.json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    console.error('Error bulk updating tasks:', error);
    res.status(500).json({ error: 'Failed to reorder tasks' });
  }
});

export default router;