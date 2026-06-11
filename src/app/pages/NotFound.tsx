import React from "react";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card-surface p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-[var(--brand-dark)] dark:text-white">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page not found</h2>
        <p className="text-[var(--brand-grey-dark)] mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary w-full">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
