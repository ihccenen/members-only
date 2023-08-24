export default async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isAdmin: string
) {
  const user = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      isAdmin: isAdmin === 'Yes',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await user.json();

  if (!user.ok) throw new Error(result.message);

  return result;
}
