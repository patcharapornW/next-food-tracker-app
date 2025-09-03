'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // นำเข้าไอคอนสำหรับปุ่มดูรหัสผ่าน

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // ล้างข้อความผิดพลาดเก่า
    setLoading(true);

    try {
      // **ส่วนนี้คือการจำลองการเรียก API จริง:**
      // ในแอปจริง คุณจะเปลี่ยนโค้ดส่วนนี้เป็นการเรียก API ไปยังเซิร์ฟเวอร์
      // เช่น:
      // const response = await fetch('/api/login', { ... });
      
      // **ตัวอย่างการล็อกอินแบบ Mock (จำลอง):**
      await new Promise(resolve => setTimeout(resolve, 1500)); // จำลองการหน่วงเวลาของเครือข่าย
      if (email === 'test@example.com' && password === 'password123') {
        localStorage.setItem('isLoggedIn', 'true'); // จำลองการบันทึกสถานะการล็อกอิน
        router.push('/dashboard'); // นำทางไปยัง Dashboard เมื่อล็อกอินสำเร็จ
      } else {
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }

    } catch (err: any) {
      setError(err.message); // แสดงข้อความผิดพลาดจากเซิร์ฟเวอร์
    } finally {
      setLoading(false); // หยุดสถานะการโหลด
    }
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
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-pink-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
