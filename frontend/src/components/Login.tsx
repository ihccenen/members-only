import { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import { Navigate } from 'react-router-dom';
import loginUser from '../lib/loginUser';
import { UserContext } from './Router';

export default function Login() {
  const { user, login } = useContext(UserContext);
  const [error, setError] = useState('');
  const email = useInput('');
  const password = useInput('');

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(email.value, password.value)
      .then(login)
      .catch((err) => setError(err.message));
  };

  return (
    <main className="main">
      {error && <h1>{error}</h1>}
      <form className="form login grid" onSubmit={handleSubmit}>
        <label className="label flex" htmlFor="email">
          Email:
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            required
            value={email.value}
            onChange={email.handleChange}
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
    </main>
  );
}
