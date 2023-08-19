import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import createUser from '../lib/createUser';
import { UserContext } from './Router';

export default function Signup() {
  const { login } = useContext(UserContext);
  const [error, setError] = useState('');
  const username = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.value === confirmPassword.value) {
      createUser(username.value, password.value)
        .then((user) => {
          login(user);
          navigate('/');
        })
        .catch((err) => setError(err.message));

      return;
    }

    setError("Passwords don't match");
  };

  return (
    <main className='signup'>
      {error && <h1>{error}</h1>}
      <form className="form grid" onSubmit={handleSubmit}>
        <label className="label flex" htmlFor="username">
          Username:
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            required
            value={username.value}
            onChange={username.handleChange}
          />
        </label>
        <label className="label flex" htmlFor="password">
          Password:
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            required
            value={password.value}
            onChange={password.handleChange}
          />
        </label>
        <label className="label flex" htmlFor="confirmPassword">
          Confirm Password:
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword.value}
            onChange={confirmPassword.handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
