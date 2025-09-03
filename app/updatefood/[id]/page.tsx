'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

// กำหนดประเภทข้อมูลสำหรับอาหาร
interface FoodItem {
  id: string;
  name: string;
  image: string;
  date: string;
  mealType: string;
}

// ข้อมูลอาหารจำลอง (Mock Data)
const MOCK_FOOD_DATA: FoodItem[] = [
  { id: '1', name: 'สลัดผักอกไก่', image: '/mock-food1.jpg', date: '2025-09-01', mealType: 'มื้อกลางวัน' },
  { id: '2', name: 'ข้าวผัดกุ้ง', image: '/mock-food2.jpg', date: '2025-09-01', mealType: 'มื้อเย็น' },
  { id: '3', name: 'แซนวิชแฮมชีส', image: '/mock-food3.jpg', date: '2025-09-02', mealType: 'มื้อเช้า' },
  // ... เพิ่มข้อมูลอื่นๆ ตามต้องการ
];

export default function EditFoodPage() {
  const router = useRouter();
  const params = useParams();
  const foodId = params.id as string;

  const [foodData, setFoodData] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    // จำลองการดึงข้อมูลอาหารจาก API
    const fetchFoodData = () => {
      const item = MOCK_FOOD_DATA.find(food => food.id === foodId);
      if (item) {
        setFoodData(item);
        setImagePreviewUrl(item.image);
      } else {
        // หากไม่พบข้อมูล ให้กลับไปหน้า dashboard
        alert('ไม่พบข้อมูลอาหารที่ต้องการแก้ไข');
        router.push('/dashboard');
      }
      setLoading(false);
    };

    fetchFoodData();
  }, [foodId, router]);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFoodData(prevData => prevData ? { ...prevData, [name]: value } : null);
  };

  // จัดการการเลือกไฟล์รูปภาพ
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // จัดการการบันทึกข้อมูล
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodData) return;

    // จำลองการส่งข้อมูลไปอัปเดตที่เซิร์ฟเวอร์
    console.log('อัปเดตข้อมูลอาหาร:', foodData);
    if (imageFile) {
      console.log('ไฟล์รูปภาพใหม่:', imageFile);
    }
    
    alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
        <p className="text-white text-2xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!foodData) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          แก้ไขข้อมูลอาหาร
        </h2>
        

        <form onSubmit={handleSave} className="space-y-6">
          {/* ชื่ออาหาร */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">ชื่ออาหาร</label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* มื้ออาหาร */}
          <div>
            <label htmlFor="mealType" className="block text-lg font-semibold text-gray-700 mb-2">มื้ออาหาร</label>
            <select
              id="mealType"
              name="mealType"
              value={foodData.mealType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              <option value="มื้อเช้า">มื้อเช้า</option>
              <option value="มื้อกลางวัน">มื้อกลางวัน</option>
              <option value="มื้อเย็น">มื้อเย็น</option>
            </select>
          </div>

          {/* วันที่ */}
          <div>
            <label htmlFor="date" className="block text-lg font-semibold text-gray-700 mb-2">วันที่</label>
            <input
              type="date"
              id="date"
              name="date"
              value={foodData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* การเลือกรูปภาพ */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">รูปภาพ</label>
            <div className="flex flex-col items-start space-y-4">
              <label
                htmlFor="image-upload"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer"
              >
                เลือกรูปภาพใหม่
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              
              {/* แสดงรูปภาพตัวอย่าง (Image Preview) */}
              {imagePreviewUrl && (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={imagePreviewUrl}
                    alt="Image Preview"
                    width={200}
                    height={150}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ปุ่มสำหรับดำเนินการ */}
          <div className="pt-4 flex justify-center space-x-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              ย้อนกลับ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}