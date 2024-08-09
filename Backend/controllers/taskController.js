const User = require('../models/user');

// Fetch all tasks for the authenticated user for a specific day
exports.getTasks = async (req, res) => {
  const { day } = req.params;
  try {
    // Validate the day parameter
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }

    // Fetch user from the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch tasks for the given day
    const tasks = user[day.toLowerCase()] || [];
    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found for this day' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new task to a specific day
exports.addTask = async (req, res) => {
  const { day } = req.params;
  const { title } = req.body;
  try {
    // Validate the day parameter
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }

    // Fetch user from the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and add the new task
    const newTask = { title, done: false };
    user[day.toLowerCase()].push(newTask);
    await user.save();
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a task from a specific day
exports.deleteTask = async (req, res) => {
  const { day, taskId } = req.params;
  try {
    // Validate the day parameter
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }

    // Fetch user from the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the task with the given ID
    user[day.toLowerCase()] = user[day.toLowerCase()].filter(task => task._id.toString() !== taskId);
    await user.save();
    
    res.status(200).json({ message: 'Task deleted successfully', tasks: user[day.toLowerCase()] });
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark a task as done for a specific day
exports.markTaskDone = async (req, res) => {
  const { day, taskId } = req.params;
  try {
    // Validate the day parameter
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }

    // Fetch user from the database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task to update
    const task = user[day.toLowerCase()].find(task => task._id.toString() === taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Mark the task as done
    task.done = true;
    await user.save();

    res.status(200).json({ message: 'Task marked as done successfully', task });
  } catch (error) {
    console.error('Error marking task as done:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
