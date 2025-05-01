import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    // HTTP error from loader or action
    title = `${error.status} - ${error.statusText}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-2">{title}</h1>
      <p className="text-gray-700 mb-4">{message}</p>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default ErrorElement;
