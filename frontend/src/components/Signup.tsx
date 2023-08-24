import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import createUser from '../lib/createUser';
import { UserContext } from './Router';

export default function Signup() {
  const { login } = useContext(UserContext);
  const [error, setError] = useState('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const isAdmin = useInput('No');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.value === confirmPassword.value) {
      createUser(
        firstName.value,
        lastName.value,
        email.value,
        password.value,
        isAdmin.value
      )
        .then((user) => {
          login(user);
          navigate(-1);
        })
        .catch((err) => setError(err.message));

      return;
    }

    setError("Passwords don't match");
  };

  return (
    <main className="main">
      {error && <h1>{error}</h1>}
      <form className="form signup grid" onSubmit={handleSubmit}>
        <label className="label flex" htmlFor="first-name">
          First Name:
          <input
            className="input"
            type="text"
            id="first-name"
            name="first-name"
            required
            value={firstName.value}
            onChange={firstName.handleChange}
          />
        </label>
        <label className="label flex" htmlFor="last-name">
          Last Name:
          <input
            className="input"
            type="text"
            id="last-name"
            name="last-name"
            required
            value={lastName.value}
            onChange={lastName.handleChange}
          />
        </label>
        <label className="label flex" htmlFor="email">
          Email:
          <input
            className="input"
            type="email"
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
        <fieldset>
          <legend>Admin:</legend>
          <label htmlFor="isAdmin">
            <input
              type="radio"
              name="isAdmin"
              id="isAdmin"
              value="Yes"
              onChange={isAdmin.handleChange}
              checked={isAdmin.value === 'Yes'}
            />
            Yes
          </label>
          <label htmlFor="notAdmin">
            <input
              type="radio"
              name="notAdmin"
              id="notAdmin"
              value="No"
              onChange={isAdmin.handleChange}
              checked={isAdmin.value === 'No'}
            />
            No
          </label>
        </fieldset>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
