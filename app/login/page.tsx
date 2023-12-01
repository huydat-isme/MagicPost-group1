// newpage.js
"use client";
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';


const newtab = () => {
    const [val, setval]=useState("");
    const handleRadioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setval(event.target.value);
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
                    <input type="password" placeholder="Enter Password"
                        className="w-full input input-bordered" />
                </div>
                <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">President</span> 
                            <input type="radio" name="radio-10" className="radio" value="President" onChange={handleRadioChange} checked={val === 'President'} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Manager</span> 
                            <input type="radio" name="radio-10" className="radio" value="Manager" onChange={handleRadioChange} checked={val === 'Manager'} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Employee</span> 
                            <input type="radio" name="radio-10" className="radio" value="Employee" onChange={handleRadioChange} checked={val === 'Employee'} />
                        </label>
                    </div>
                </div>
                <div>
                    
                    <Link href={'./role/' + val}><button className="btn btn-block">Login</button></Link>
                </div>
                
            </form>
        </div>
    </div>
  );
};

export default newtab;
