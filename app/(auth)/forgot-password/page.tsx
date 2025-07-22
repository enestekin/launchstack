import Link from 'next/link';
import ForgotPassword from '@/components/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <ForgotPassword />
        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
