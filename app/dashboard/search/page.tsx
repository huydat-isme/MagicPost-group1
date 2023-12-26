"use client"
import React, { useState } from "react";
import Header_dasboard from "../header_dashboard";
import Footer_dashboard from "../footer_dashboard";
export default function SearchPackage() {
  const [showOrderTable, setShowOrderTable] = useState(false);

  // Dummy data for the order table (replace it with your actual data)
  const orderData = [
    {
      id: 1,
      code: "123",
      sender: "Sender 1",
      receiver: "Receiver 1",
      status: "Pending",
    },
    {
      id: 2,
      code: "456",
      sender: "Sender 2",
      receiver: "Receiver 2",
      status: "Delivered",
    },
    // Add more data as needed
  ];

  // Click event handler for the search button
  const handleSearchButtonClick = () => {
    // Perform your search logic here
    // For now, let's just toggle the visibility of the order table
    setShowOrderTable(!showOrderTable);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Header_dasboard />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <header className="header bg-white shadow py-4 px-4">
          <div className="header-content flex items-center flex-row">
            <div className="flex ml-auto">
              <a href="" className="flex flex-row items-center">
                <img
                  src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
                  alt=""
                  className="h-10 w-10 bg-gray-200 border rounded-full"
                />
                <span className="flex flex-col ml-2">
                  <span className="truncate w-20 font-semibold tracking-wide leading-none">
                    User Name
                  </span>
                  <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                    Manager
                  </span>
                </span>
              </a>
            </div>
          </div>
        </header>
        <div className="main-content flex flex-col flex-grow p-4">
          <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
          <div className="flex  flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <button
                  onClick={handleSearchButtonClick}
                  className="grid  place-items-center h-full w-12 text-gray-300 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <input
                  className=" text-gray-700 pr-2 w-96 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                  type="text"
                  id="search"
                  placeholder="Tra cứu đơn hàng"
                />
              </div>
            </div>
            {showOrderTable && (
          <table className="mt-4 border-collapse w-full">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Trạng thái đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.id}>
                  <td>{order.code}</td>
                  <td>{order.sender}</td>
                  <td>{order.receiver}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
          </div>
         
        </div>
        <Footer_dashboard />
      </main>
    </div>
  );
}
