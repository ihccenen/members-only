import { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import loginUser from '../lib/loginUser';
import { UserContext } from './Router';

export default function Login() {
  const { login } = useContext(UserContext);
  const [error, setError] = useState('');
  const username = useInput('');
  const password = useInput('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(username.value, password.value)
      .then((user) => {
        login(user);
        navigate('/');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
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
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
