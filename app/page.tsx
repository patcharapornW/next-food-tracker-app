// pages/index.js หรือ app/page.tsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import foodtracker from './images/foodtracker.jpg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Tracker</title>
        <meta name="description" content="Track your meal with Food Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Welcome to Food Tracker
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Tracker your meal ! !
        </p>

        {/* เพิ่ม 'group' class ที่ div นี้ */}
        <div className="relative w-full max-w-sm h-64 mb-10 group">
          <Image
            src={foodtracker}
            alt="Food Tracker"
            // layout="fill" และ objectFit="contain" ไม่จำเป็นใน Next.js 13+
            // และถูกแทนที่ด้วย fill prop และ style attribute
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg shadow-xl transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        <div className="flex space-x-4">
          <Link href="/register" className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
            Register
          </Link>
          <Link href="/login" className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 ease-in-out">
            Login
          </Link>
        </div>
      </main>
    </>
  );
}