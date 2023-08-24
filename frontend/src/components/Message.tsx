import { useState } from 'react';
import deleteMessage from '../lib/deleteMessage';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface IMessage {
  user?: { firstName: string; lastName: string };

  title: string;
  message: string;
  createdAt: string;
  _id: string;
}

export default function Message({
  message: { user, title, message, createdAt, _id },
  isAdmin
}: {
  message: IMessage;
  isAdmin: boolean 
}) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    deleteMessage(_id)
      .then(() => navigate('/messages'))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="message-container flex">
      <div className="message grid">
        {user && (
          <div>
            User:
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        )}
        <div>
          Title: <p>{title}</p>
        </div>
        <div>
          Message: <p>{message}</p>
        </div>
        <p>{moment(createdAt).format('MMM Do YY')}</p>
      </div>
      {isAdmin && (
        <div>
          {error && <p>{error}</p>}
          <button className="delete-btn" type="button" onClick={handleClick}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
