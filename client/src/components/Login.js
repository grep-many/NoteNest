import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router'
import darkModeContext from '../context/darkMode/darkModeContext';
import alertContext from '../context/alert/alertContext';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { fetchNotes } = useContext(noteContext)
    const { isDarkMode } = useContext(darkModeContext);
    const { showAlert } = useContext(alertContext);

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const host = process.env.REACT_APP_HOST; // e.g., "http://localhost:5000"
        const url = `${host}/api/auth/login`;  // Correct URL

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                showAlert('Success', data.msg);
                Cookies.set('x-auth-token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });
                await fetchNotes();
                navigate('/you');
            } else {
                showAlert('Invalid Credentials', data.msg, true);

                if (data.errors && data.errors.length > 0) {
                    // Loop through the errors array and log each msg
                    data.errors.forEach((error) => {
                        showAlert('Error!', error.msg, true); // Logs the error message (e.g., "Invalid email format")
                    });
                }
            }
        }
        catch (error) {
            showAlert('Error', 'Something went wrong', true);
        }
    };

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    return (
        <div
            className={`container my-3 py-3 px-4 rounded border border-${isDarkMode ? 'white' : 'dark'}`}
            style={{ maxWidth: '30rem', maxHeight: '80vh' }}
        >
            <h2>Welcome Back!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                        id="exampleInputEmail1"
                        name='email'
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                    />
                    <div id="emailHelp" className={`form-text ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                            id="exampleInputPassword1"
                            name='password'
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        {credentials.password.trim().length < 8 ? <p className="position-absolute top-100 mx-5 text-danger" style={{ fontSize: '10px' }}>Password should be atleast of 8 characters</p> : null}
                    </div>
                </div>

                <div className="mb-3 form-check">
                    <p className={`text-${isDarkMode?'white':'black'}`}>Create an Account <Link to="/signup">Sign Up</Link></p>
                </div>

                <button type="submit" className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
