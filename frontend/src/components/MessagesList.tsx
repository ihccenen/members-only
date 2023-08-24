import { useContext } from 'react';
import getAllMessages from '../lib/getAllMessages';
import Message from './Message';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from './Router';
import CreateMessage from './CreateMessage';

interface IMessage {
  user?: { firstName: string; lastName: string; _id: string };
  title: string;
  message: string;
  createdAt: string;
  _id: string;
}

export default function MessagesList() {
  const allMessages = useLoaderData() as IMessage[];
  const { user } = useContext(UserContext);

  return (
    <main className='main'>
      <div className='messages-list grid'>
        {allMessages.length < 1 ? (
          <h2>No messages</h2>
        ) : (
          <>
            <h2>Messages:</h2>
            {allMessages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </>
        )}
      </div>
      <div>{user && <CreateMessage />}</div>
    </main>
  );
}

export async function loader() {
  return getAllMessages();
}
