"use client";
import { useState } from 'react';
import Link from 'next/link';

const newtab = () => {
    const [userRole, setUserRole] = useState('');
const [username, setUsername] = useState(''); // Thêm state cho username
const [password, setPassword] = useState(''); // Thêm state cho password

const handleLogin = async () => {
  try {
    // Thực hiện yêu cầu POST tới API
    const response = await fetch('api/user/checkuser', {
      method: 'POST', // Sử dụng phương thức POST
      headers: {
        'Content-Type': 'application/json', // Thiết lập kiểu dữ liệu gửi đi
      },
      // Đặt username và password trong body và chuyển đổi thành JSON
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Kiểm tra xem yêu cầu thành công hay không
    if (response.ok) {
      const data = await response.json()
      // Lưu trữ userRole vào localStorage
      localStorage.setItem('role', data.data.user.role);

      // Cập nhật state userRole
      setUserRole(data.role);
    } else {
      console.error('Error checking user:', response.statusText);
    }
  } catch (error) {
    console.error('Error checking user:', error);
  }
};

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Magic Post</h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
              onChange={(e) => setUsername(e.target.value)} // Lưu giá trị email từ input
            />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              onChange={(e) => setPassword(e.target.value)} // Lưu giá trị password từ input
            />
                    </div>
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <Link href='./dashboard'><button className="btn btn-block" onClick={handleLogin}>Login</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default newtab;
