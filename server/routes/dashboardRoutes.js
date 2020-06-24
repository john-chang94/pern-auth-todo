const router = require('express').Router();
const pool = require('../db');
const authorizeToken = require('../middleware/authorizeToken');

router.get('/', authorizeToken, async (req, res) => {
    try {
        const user = await pool.query(
            'SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1',
            [req.id]
        )

        res.json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
})

router.post('/todos', authorizeToken, async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            // description is the column name to insert data
            // ($1) is a var and [description] is the second arg to define what var is
            // RETURNING * to return the submitted data, still adds to db
            `INSERT INTO todos (user_id, description) VALUES ($1, $2)
            RETURNING *`,
            [req.id, description]
        )
        // return .rows[0] to return just the submitted data
        // otherwise there will be a lot of returned data
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

router.put('/todos/:id', authorizeToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            // REMINDER!!! // you can have as many vars using $1, $2, etc as shown below
            // as long as you include what they represent in the second arg in an array
            // $3 so the user can only edit their todo and not anyone else's
            'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
            [description, id, req.id]
        )

        if (updateTodo.rows.length === 0) {
            return res.json('This todo is not yours')
        }
        res.json('Todo has been updated')
    } catch (err) {
        console.error(err.message);
    }
})

router.delete('/todos/:id', authorizeToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
            [id, req.id]
        )

        if (deleteTodo.rows.length === 0) {
            return res.json('This todo is not yours')
        }
        res.json('Todo deleted')
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;