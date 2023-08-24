import { useState } from 'react';
import useInput from '../hooks/useInput';
import createMessage from '../lib/createMessage';
import { useNavigate } from 'react-router-dom';

export default function CreateMessage() {
  const title = useInput('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMessage(title.value, message)
      .then(() => navigate('/'))
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      {error && <h2>{error}</h2>}
      <form className="form grid" onSubmit={handleSubmit}>
        <label className="label flex" htmlFor="title">
          Title:
          <input
            className="input"
            type="text"
            name="title"
            id="title"
            value={title.value}
            onChange={title.handleChange}
          />
        </label>
        <label className="label flex" htmlFor="message">
          Message:
          <textarea
            className="input"
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
          ></textarea>
        </label>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
