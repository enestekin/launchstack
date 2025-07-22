'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { forgotPassword } from '@/actions/auth';

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await forgotPassword(formData);

    if (response.status === 'success') {
      alert('Password reset link sent to your email.');
    } else {
      setError(response.error || 'An error occurred during password reset.');
    }

    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <Button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Reset Password
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ForgotPassword;
