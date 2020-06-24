import React, { Fragment, useState, useEffect } from 'react'
import EditTodo from './EditTodo';
import axios from 'axios';

const TodoList = ({ todoList, setTodosChange }) => {

    const deleteTodo = async (id) => {
        try {
            let config = {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
            await axios.delete(`http://localhost:5000/dashboard/todos/${id}`, config)
            setTodosChange(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            {/* Not sure why this is here, tut didn't specify */}
            {''}
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Because the initial state is an empty array and there is always returned data even with no todos,
                        // first check if there are any objects then check if there are any todos
                        todoList.length !== 0 && todoList[0].todo_id !==  null &&
                        todoList.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} setTodosChange={setTodosChange} /></td>
                                <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
}

export default TodoList;