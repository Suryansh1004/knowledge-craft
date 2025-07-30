"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        404
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        Go back home
      </Link>
    </div>
  );
}
