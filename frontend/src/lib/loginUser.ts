export default async function loginUser(email: string, password: string) {
  const user = await fetch('http://localhost:5000/api/users/log-in/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!user.ok) throw new Error('Wrong email or password');

  return user.json();
}
