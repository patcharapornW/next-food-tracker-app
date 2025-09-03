'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// กำหนดประเภทข้อมูลสำหรับผู้ใช้งาน
interface UserProfile {
  name: string;
  email: string;
  profileImage: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfile>({
    name: '',
    email: '',
    profileImage: null,
  });
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // จำลองการดึงข้อมูลโปรไฟล์ผู้ใช้งานปัจจุบัน
    // ในแอปพลิเคชันจริง คุณจะเรียก API เพื่อดึงข้อมูลของผู้ใช้ที่ล็อกอินอยู่
    const fetchUserProfile = () => {
      setTimeout(() => {
        const mockUserProfile: UserProfile = {
          name: 'สมชาย ใจดี',
          email: 'somchai.j@example.com',
          profileImage: '/mock-profile.jpg', // URL รูปโปรไฟล์ปัจจุบัน
        };
        setProfileData(mockUserProfile);
        setImagePreviewUrl(mockUserProfile.profileImage);
        setLoading(false);
      }, 500); // จำลองการโหลดข้อมูล 0.5 วินาที
    };
    fetchUserProfile();
  }, []);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
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
    if (!profileData.name || !profileData.email) {
      alert('กรุณากรอกชื่อและอีเมล');
      return;
    }

    // จำลองการส่งข้อมูลไปอัปเดตที่เซิร์ฟเวอร์
    console.log('อัปเดตข้อมูลโปรไฟล์:', profileData);
    console.log('รหัสผ่านใหม่:', password);
    if (imageFile) {
      console.log('ไฟล์รูปโปรไฟล์ใหม่:', imageFile);
    }

    alert('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!');
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
        <p className="text-white text-2xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
      <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          แก้ไขข้อมูลโปรไฟล์
        </h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          {/* รูปโปรไฟล์ */}
          <div className="flex flex-col items-center space-y-4">
            {imagePreviewUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                <Image
                  src={imagePreviewUrl}
                  alt="Profile Preview"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <label
              htmlFor="image-upload"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer text-sm"
            >
              เลือกรูปโปรไฟล์ใหม่
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          

          {/* ชื่อผู้ใช้งาน */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* อีเมล */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
          </div>

          {/* รหัสผ่าน */}
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">
              รหัสผ่าน (กรอกเมื่อต้องการเปลี่ยน)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 transition-colors"
            />
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