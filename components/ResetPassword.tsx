'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { resetPassword } from '@/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await resetPassword(
      formData,
      searchParams.get('code') as string
    );

    if (response.status === 'success') {
      alert(
        'Password reset successful. You can now log in with your new password.'
      );
      router.push('/');
    } else {
      setError(response.error || 'An error occurred during password reset.');
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium ">New Password</label>
          <input
            type="password"
            placeholder="Password"
            id="Password"
            name="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <Button>{loading ? 'Please wait' : 'Reset Password'}</Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
