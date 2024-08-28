import  express from 'express';
const router = express.Router();
import  connection from './db.js';

// Get all tasks
router.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Get a single task
router.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('SELECT * FROM tasks WHERE id = ?', [taskId], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(results[0]);
    }
  });
});

// Create a task
router.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  connection.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (error, results) => {
    if (error) throw error;
    res.sendStatus(201);
  });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  connection.query(
    'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed, taskId],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(200);
    }
  );
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (error, results) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

// module.exports = router;
export default router;
