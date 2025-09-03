'use client';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for form submission
    console.log('Form submitted');
  };

  return (
    <>
      <Head>
        <title>Register - Food Tracker</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ชื่อ-สกุล
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                เลือกเพศ
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">เลือกเพศ...</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปโปรไฟล์
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" // ซ่อน input file เดิม
              />
             <div className="flex flex-col items-center">
                {profileImage && (
                <div className="mb-4 w-32 h-32 rounded-full overflow-hidden border-2 border-pink-400">
                <Image
                src={profileImage}
                alt="Profile Preview"
                width={128}
                height={128}
                objectFit="cover"
            />
            </div>
            )}
            {/* ปรับปรุง class ของ label นี้ */}
            <label
            htmlFor="profileImage"
            className="w-full text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300 shadow-md"
            >
            อัพโหลดรูปภาพ
            </label>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              ลงทะเบียน
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-pink-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}