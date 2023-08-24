export default async function getAllMessages() {
  const allMessages = await fetch(
    `${import.meta.env.VITE_API_URL}/api/messages/`,
    {
      credentials: 'include',
    }
  );

  if (!allMessages.ok) throw new Error('Failed to get messages');

  return allMessages.json().then((res) => res.allMessages);
}
