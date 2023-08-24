export default function logoutUser() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/users/log-out/`, {
    method: 'POST',
    credentials: 'include',
  });
}
