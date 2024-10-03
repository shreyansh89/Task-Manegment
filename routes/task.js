const express = require('express');
const Task = require('../models/task');
const Category = require('../models/category');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create', protect, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

router.get('/view', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;



// ex
router.post('/tasks', protect, async (req, res) => {
    try {
      const { title, description, completed, categoryId } = req.body;
  
      const user = req.user;
  
      if (user.role.name === 'User') {
        const taskCount = await Task.countDocuments({ user: user._id });
  
        if (taskCount >= MAX_TASKS_LIMIT) {
          return res.status(403).json({
            message: `Task limit exceeded. Regular users can only create up to ${MAX_TASKS_LIMIT} tasks.`,
          });
        }
      }
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
  
      const task = new Task({
        title,
        description,
        completed,
        user: user._id,  
        category: category._id
      });
  
      await task.save();
      res.status(201).json(task);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;