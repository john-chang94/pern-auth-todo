import React, { Fragment, useState } from 'react'
import axios from 'axios';

const InputTodo = ({ setTodosChange }) => {
    const [description, setDescription] = useState('')
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description }
            let config = {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
            await axios.post('http://localhost:5000/dashboard/todos', body, config)
            // Trigger the state change to update
            setTodosChange(true);
            setDescription('');
        } catch (err) {
            console.error(err.response.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input type="text" placeholder="Add todo" className="form-control" value={description}
                    onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;