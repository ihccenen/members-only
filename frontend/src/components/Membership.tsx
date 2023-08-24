import { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import updateUserMembership from '../lib/updateUserMembership';
import { Navigate } from 'react-router-dom';
import { UserContext } from './Router';

export default function Membership() {
  const { user, login } = useContext(UserContext);
  const [error, setError] = useState('');
  const password = useInput('');

  if (user?.membership === 'member') return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserMembership(password.value)
      .then(login)
      .catch((err) => setError(err.message));
  };

  return (
    <main className="main">
      {error && <h1>{error}</h1>}
      <form className="form login grid" onSubmit={handleSubmit}>
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
