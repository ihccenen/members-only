export default async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const user = await fetch('http://localhost:5000/api/users/', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await user.json();

  if (!user.ok) throw new Error(result.message);

  return result;
}
