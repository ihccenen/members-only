export default async function loginUser(username: string, password: string) {
  const user = await fetch('http://localhost:5000/api/users/log-in/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!user.ok) throw new Error('Wrong username or password');

  return user.json();
}
