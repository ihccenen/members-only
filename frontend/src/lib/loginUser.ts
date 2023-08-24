export default async function loginUser(email: string, password: string) {
  const user = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/log-in/`,
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!user.ok) throw new Error('Wrong email or password');

  return user.json();
}
