'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// กำหนดประเภทข้อมูลสำหรับอาหาร
interface FoodItem {
  name: string;
  calories: number | '';
  description: string;
  imageFile: File | null;
  imagePreviewUrl: string | null;
}

export default function AddFoodPage() {
  const router = useRouter();
  const [foodData, setFoodData] = useState<FoodItem>({
    name: '',
    calories: '',
    description: '',
    imageFile: null,
    imagePreviewUrl: null,
  });

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFoodData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // จัดการการเลือกไฟล์รูปภาพ
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodData(prevData => ({
          ...prevData,
          imageFile: file,
          imagePreviewUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // จัดการการบันทึกข้อมูล
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodData.name || !foodData.calories || !foodData.description || !foodData.imageFile) {
      alert('กรุณากรอกข้อมูลและเลือกรูปภาพให้ครบถ้วน');
      return;
    }

    // ในส่วนนี้ คุณสามารถส่งข้อมูล foodData ไปยัง API เพื่อบันทึก
    console.log('บันทึกข้อมูลอาหาร:', foodData);
    alert('บันทึกข้อมูลอาหารเรียบร้อยแล้ว!');

    // หลังจากบันทึกเสร็จสิ้น นำทางกลับไปหน้า Dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          เพิ่มข้อมูลอาหารใหม่
        </h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          {/* ชื่ออาหาร */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
              ชื่ออาหาร
            </label>
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

          {/* แคลอรี่ */}
          <div>
            <label htmlFor="calories" className="block text-lg font-semibold text-gray-700 mb-2">
              แคลอรี่
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={foodData.calories}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
              รายละเอียด
            </label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* การเลือกรูปภาพ */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              รูปภาพ
            </label>
            <div className="flex flex-col items-start space-y-4">
              <label
                htmlFor="image-upload"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer"
              >
                เลือกรูปภาพ
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* แสดงรูปภาพตัวอย่าง (Image Preview) */}
              {foodData.imagePreviewUrl && (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={foodData.imagePreviewUrl}
                    alt="Image Preview"
                    width={200}
                    height={150}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
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