'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for user login, e.g., API call
    console.log('Logging in with:', { email, password });

    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>Login - Food Tracker</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-pink-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}