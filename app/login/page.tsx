"use client";
import { useState } from 'react';
import Link from 'next/link';

const newtab = () => {
    const [userRole, setUserRole] = useState('');

    const handleLogin = async () => {
        try {
            // Make a request to check the user
            const response = await fetch('api/user/checkuser');
            const data = await response.json();

            // Save the user role to localStorage
            localStorage.setItem('userRole', data.role);

            // Update the userRole state
            setUserRole(data.role);
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
                        <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered" />
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
