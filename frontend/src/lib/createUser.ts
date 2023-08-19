export default async function createUser(username: string, password: string) {
  const user = await fetch('http://localhost:5000/api/users/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await user.json();

  if (!user.ok) throw new Error(result.message);

  return result;
}
