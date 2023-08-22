import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <main>
      <h1>{ error.message }</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </main>
  );
}
