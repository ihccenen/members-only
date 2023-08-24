export default async function updateUserMembership(password: string) {
  console.log(password);
  const update = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify({ password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await update.json();

  if (!update) throw new Error(result.message);

  return result;
}
