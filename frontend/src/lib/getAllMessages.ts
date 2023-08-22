export default async function getAllMessages() {
  const allMessages = await fetch('http://localhost:5000/api/messages/', {
    credentials: 'include',
  });

  if (!allMessages.ok) throw new Error('Failed to get messages');

  return allMessages.json().then((res) => res.allMessages);
}
