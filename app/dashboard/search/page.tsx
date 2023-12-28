"use client"

import React, { useState, useEffect } from "react";
import Header_dasboard from "../header_dashboard";
import Footer_dashboard from "../footer_dashboard";

export default function SearchPackage() {
  
  const [showOrderTable, setShowOrderTable] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('/api/order/getall')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Data:', data);
        // Assuming data is structured as { "status": "success", "data": { "orders": [...] } }
        setOrderData(data.data.orders);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once on mount
  // Click event handler for the search button
  const handleSearchButtonClick = () => {
  // Perform search logic here
  const searchValue = parseInt(searchQuery, 10);

  if (!isNaN(searchValue)) {
    // If searchQuery is a valid integer, filter orders
    const filteredOrders = orderData.filter(order => order.order_id === searchValue);

    // Set filtered orders to be displayed
    setFilteredOrders(filteredOrders);
  } else {
    // Handle the case where searchQuery is not a valid integer (optional)
    console.error('Invalid search value. Please enter a valid integer.');
    // Optionally, you can clear the filtered orders here:
    setFilteredOrders([]);
  }
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-gray-700 pr-2 w-96 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
            type="text"
            id="search"
            placeholder="Nhập mã đơn hàng"
          />
          
              </div>
            </div>
            {filteredOrders.length > 0 &&  (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Mã đơn hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Người gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Người nhận
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Trạng thái đơn hàng
                  </th>
              </tr>
          </thead>
          <tbody>
      {filteredOrders.map((order) => (
        <tr key={order.order_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          {/* Example columns, adjust as needed */}
          <td className="px-6 py-4">{order.order_id}</td>
          <td className="px-6 py-4">{order.sender_name}</td>
          <td className="px-6 py-4">{order.receiver_name}</td>
          <td className="px-6 py-4">{order.status}</td>
          {/* ... (other columns) */}
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
