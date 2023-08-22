export default function logoutUser() {
  return fetch('http://localhost:5000/api/users/log-out/', {
    method: 'POST',
    credentials: 'include',
  });
}
