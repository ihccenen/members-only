export default async function deleteMessage(messageId: string) {
  const msg = await fetch(
    `${import.meta.env.VITE_API_URL}/api/messages/${messageId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await msg.json();

  if (!msg.ok) throw new Error(result.message);

  return result;
}
