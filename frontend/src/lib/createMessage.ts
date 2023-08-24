export default async function createMessage(title: string, message: string) {
  const msg = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ title, message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await msg.json();

  if (!msg.ok) throw new Error(result.message);

  return result;
}
