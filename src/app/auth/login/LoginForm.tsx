'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { Underdog } from 'next/font/google';

interface LoginFormProps {
  csrfToken: string | undefined;
}

const LoginForm: React.FC<LoginFormProps> = ({ csrfToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    setError('');
    e.preventDefault();
    try {
      const response = await signIn('credentials', {
        redirect: false, // Disable automatic redirection
        email,
        password,
        csrfToken,
      });
      
      if (response?.error) {
        setError("Invalid credentials!");
      } else {
        const session = await getSession();
        if (session?.user?.id) {
          window.location.href = `/${session.user.id}/dashboard`;
        } else {
          throw new Error("User ID not found in session");
        }
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An unexpected error occurred');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="w-full p-20 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login to Your Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none font-bold rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none font-bold rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="text-gray-300 text-sm">{error}</div>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In
            </button>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="text-sm">
              <Link href="/auth/register" className="font-medium text-red-500 hover:text-red-700">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
            {/* <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-red-500 hover:text-red-700">
                Forgot your password?
              </Link>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
