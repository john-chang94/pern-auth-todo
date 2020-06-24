import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ toggleAuth }) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const res = await axios.post('/auth/login', body)

            if (res) {
                localStorage.setItem('token', res.data.token);
                toggleAuth(true);
                toast.success('Login success!')
            }

        } catch (err) {
            console.log(err.response.data);
            toast.error(err.response.data);
        }
    }

    const { email, password } = inputs;

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => handleChange(e)} className="form-control my-3" />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => handleChange(e)} className="form-control my-3" />
                <button className="btn btn-success btn-block">Login</button>
            </form>
            <Link to='/register'>Register</Link>
        </Fragment>
    );
}

export default Login;