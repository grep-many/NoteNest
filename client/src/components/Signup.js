import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import darkModeContext from '../context/darkMode/darkModeContext';
import alertContext from '../context/alert/alertContext';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import loadingProgressContext from '../context/loadingProgress/loadingProgressContext';


const Signup = () => {
    const { fetchNotes } = useContext(noteContext);
    const { isDarkMode } = useContext(darkModeContext);
    const { showAlert } = useContext(alertContext);
    const { setProgress } = useContext(loadingProgressContext);

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(25);

        const host = process.env.REACT_APP_HOST; // e.g., "http://localhost:5000"
        const url = `${host}/api/auth/createuser`;  // Correct URL for Signup endpoint

        if (credentials.password !== credentials.confirmPassword) {
            showAlert('Warning!', 'Password and Confirm Password are not same');
            return;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showAlert('Success', 'Signup Successful');
                Cookies.set('x-auth-token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });
                await fetchNotes()
                navigate('/you');
            } else {
                showAlert('Invalid Credentials', data.msg, true);
                if (data.errors && data.errors.length > 0) {
                    // Loop through the errors array and log each msg
                    data.errors.forEach((error) => {
                        showAlert('Error!', error.msg, true); // Logs the error message
                    });
                }
            }
        } catch (error) {
            showAlert('Error', 'Something went wrong', true);
        } finally {
            setProgress(100);
        }
    };

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    return (
        <div
            className={`container my-3 py-3 px-4 rounded border border-${isDarkMode ? 'white' : 'dark'}`}
            style={{ maxWidth: '30rem', maxHeight: '80vh' }}
        >
            <h2>Join NoteNest</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        {credentials.password.trim().length < 8 ? <p className="position-absolute top-100 mx-5 text-danger" style={{ fontSize: '10px' }}>Password should be atleast of 8 characters</p> : null}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`form-control ${isDarkMode ? 'bg-black text-light' : 'bg-light text-black border border-black'}`}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                        <p className="position-absolute top-100 mx-5 text-danger" style={{ fontSize: '10px' }}>{credentials.password !== credentials.confirmPassword ? 'Confirm Password should be same as Password' : (credentials.confirmPassword.trim().length < 8 ? 'Password should be atleast of 8 characters' : null)}</p>
                    </div>
                </div>

                <div className="mb-3 form-check">
                    <p className={`text-${isDarkMode ? 'white' : 'black'}`}>Already have an account? <Link to="/login">Log in</Link></p>
                </div>

                <button type="submit" className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
