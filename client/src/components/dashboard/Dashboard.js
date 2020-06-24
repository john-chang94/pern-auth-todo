import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputTodo from './InputTodo';
import TodoList from './TodoList';

const Dashboard = ({ toggleAuth }) => {

    const [name, setName] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getTodos = async () => {
        try {
            let config = {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
            const res = await axios.get('http://localhost:5000/dashboard/', config)
            // Even if there are no records of todos, we used a LEFT JOIN in the route to grab info
            setName(res.data[0].user_name)
            setTodoList(res.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        toggleAuth(false);
        toast.success('Logged out successfully', { hideProgressBar: true })
    }

    useEffect(() => {
        getTodos()
        setTodosChange(false)
    }, [todosChange])

    return (
        <Fragment>
            <div className="d-flex mt-5 justify-content-around">
                <h1>{name}'s Todo List</h1>
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
            <InputTodo setTodosChange={setTodosChange} />
            <TodoList todoList={todoList} setTodosChange={setTodosChange} />
        </Fragment>
    );
}

export default Dashboard;