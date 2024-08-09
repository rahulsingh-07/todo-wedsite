const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth-middleware');

// Fetch all tasks for the authenticated user
router.get('/:day', authMiddleware, taskController.getTasks);

// Add a new task to a specific day
router.post('/:day', authMiddleware, taskController.addTask);

router.patch('/:day/:taskId',authMiddleware,taskController.markTaskDone)

// Delete a task from a specific day
router.delete('/:day/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
