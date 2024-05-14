/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function ErrorBoundary({ fallback: Fallback, children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      setError(error);
    };
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return typeof Fallback === "function" ? (
      <Fallback error={error} />
    ) : (
      Fallback || null
    );
  }

  return <>{children}</>;
}

export function ErrorBoundaryError({ error }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}
