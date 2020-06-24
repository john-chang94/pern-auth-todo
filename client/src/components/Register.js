import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ toggleAuth }) => {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = inputs;

    // COMPARE to nn-hooks, we use {} instead of [] inside setInput because of how state is set up
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const res = await axios.post('http://localhost:5000/auth/register', body)

            if (res) {
                localStorage.setItem('token', res.data.token);
                toggleAuth(true)
                toast.success('Registered successfully!')
            }
            
        } catch (err) {
            console.error(err.response.data);
            toast.error(err.response.data);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => handleChange(e)} className="form-control my-3" />
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => handleChange(e)} className="form-control my-3" />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => handleChange(e)} className="form-control my-3" />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to='/login'>Login</Link>
        </Fragment>
    );
}

export default Register;