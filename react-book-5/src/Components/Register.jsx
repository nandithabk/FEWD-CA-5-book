import React, { useState } from 'react';
import './Register.css';

const Register = ({ onSuccessfulRegistration }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(true);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]{3,30}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return passwordRegex.test(password);
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateName(user.name);
    const isEmailValid = validateEmail(user.email);
    const isPasswordValid = validatePassword(user.password);
    const doPasswordsMatch = user.password === user.repeatPassword;

    if (isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {
      setValid(true);
      setSubmitted(true);
      console.log('User Data:', user);

      onSuccessfulRegistration();
    } else {
      setValid(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        {submitted && !validateName(user.name) && <span>Name should be 3 to 30 characters</span>}

        <label>
          Email:
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        {submitted && (!user.email || !validateEmail(user.email)) && <span>Enter a valid email address</span>}

        <label>
          Password:
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        {submitted && !validatePassword(user.password) && <span>Password should be at least 10 characters with one special character</span>}

        <label>
          Repeat Password:
          <input
            type="password"
            value={user.repeatPassword}
            onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
          />
        </label>
        {submitted && user.password !== user.repeatPassword && <span>Passwords do not match</span>}

        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;