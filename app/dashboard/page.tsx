'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Mock data type for food entries
type FoodEntry = {
  id: number;
  date: string;
  image: string;
  name: string;
  mealType: string;
};

// Mock data
const MOCK_FOOD_DATA: FoodEntry[] = [
  { id: 1, date: '2025-09-01', image: '/mock-food1.jpg', name: 'สลัดผักอกไก่', mealType: 'มื้อกลางวัน' },
  { id: 2, date: '2025-09-01', image: '/mock-food2.jpg', name: 'ข้าวผัดกุ้ง', mealType: 'มื้อเย็น' },
  { id: 3, date: '2025-09-02', image: '/mock-food3.jpg', name: 'แซนวิชแฮมชีส', mealType: 'มื้อเช้า' },
  { id: 4, date: '2025-09-02', image: '/mock-food4.jpg', name: 'แกงเขียวหวานไก่', mealType: 'มื้อกลางวัน' },
  { id: 5, date: '2025-09-03', image: '/mock-food5.jpg', name: 'สเต็กปลาแซลมอน', mealType: 'มื้อเย็น' },
  { id: 6, date: '2025-09-03', image: '/mock-food6.jpg', name: 'ไข่เจียวหมูสับ', mealType: 'มื้อเช้า' },
  { id: 7, date: '2025-09-04', image: '/mock-food7.jpg', name: 'ต้มยำกุ้ง', mealType: 'มื้อกลางวัน' },
  { id: 8, date: '2025-09-04', image: '/mock-food8.jpg', name: 'พิซซ่าหน้าซีฟู้ด', mealType: 'มื้อเย็น' },
  { id: 9, date: '2025-09-05', image: '/mock-food9.jpg', name: 'ข้าวต้มกุ้ง', mealType: 'มื้อเช้า' },
  { id: 10, date: '2025-09-05', image: '/mock-food10.jpg', name: 'ผัดไทยกุ้งสด', mealType: 'มื้อกลางวัน' },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered data based on search term
  const filteredData = MOCK_FOOD_DATA.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
  };

  const handleEdit = (id: number) => {
    console.log('Edit food entry with ID:', id);
    // You can implement navigation to an edit page here
  };

  const handleDelete = (id: number) => {
    console.log('Delete food entry with ID:', id);
    // Implement delete logic, e.g., show a confirmation modal
  };

  return (
    <>
      <Head>
        <title>Dashboard - Food Tracker</title>
      </Head>

      <main className="min-h-screen p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
        <div className="container mx-auto bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
            Dashboard
          </h1>

          {/* Search bar and Add Food button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="ค้นหาชื่ออาหาร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
                >
                  ค้นหา
                </button>
              </form>
            </div>
            <Link href="/addfood" className="w-full sm:w-auto text-center bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300">
              + Add Food
            </Link>
          </div>

          {/* Food Entries Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    รูปภาพ
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ชื่ออาหาร
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    มื้ออาหาร
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((entry) => (
                    <tr key={entry.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Image
                          src={entry.image}
                          alt={entry.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-800">{entry.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{entry.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{entry.mealType}</td>
                      <td className="py-4 px-6 space-x-2">
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-600 transition-colors duration-200"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 transition-colors duration-200"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      ไม่พบข้อมูลอาหารที่ต้องการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ย้อนกลับ
            </button>
            <span className="text-sm font-semibold text-gray-700">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </main>
    </>
  );
}