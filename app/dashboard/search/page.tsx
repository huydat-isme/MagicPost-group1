"use client"

import React, { useState, useEffect } from "react";
import Header_dasboard from "../header_dashboard";
import Footer_dashboard from "../footer_dashboard";

export default function SearchPackage() {
  
  const [showOrderTable, setShowOrderTable] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [gatheringPointSearchQuery, setGatheringPointSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [gatheringPoints, setGatheringPoints] = useState([]);

  const handleOrderSearchButtonClick = () => {
    const searchValue = orderSearchQuery.trim();

    if (searchValue) {
      // Xử lý API order
      fetch(`http://localhost:3000/api/order/${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success' && data.data && data.data.order) {
            setFilteredOrders([data.data.order]);
          } else {
            console.error('Không tìm thấy đơn hàng với mã đã nhập.');
            setFilteredOrders([]);
          }
        })
        .catch(error => console.error('Error fetching order data:', error));
    } else {
      console.error('Giá trị tìm kiếm không hợp lệ. Hãy nhập một giá trị hợp lệ.');
      setFilteredOrders([]);
    }
  };

  const handleGatheringPointSearchButtonClick = () => {
    const searchValue = gatheringPointSearchQuery.trim();

    if (searchValue) {
      // Xử lý API gathering point
      fetch(`http://localhost:3000/api/gatheringpoint/${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(gatheringData => {
          if (gatheringData.status === 'success' && gatheringData.data && gatheringData.data.gatheringPoints) {
            setGatheringPoints(gatheringData.data.gatheringPoints);
          } else {
            console.error('Không tìm thấy điểm gom hàng với mã đã nhập.');
            setGatheringPoints([]);
          }
        })
        .catch(error => console.error('Error fetching gathering point data:', error));
    } else {
      console.error('Giá trị tìm kiếm không hợp lệ. Hãy nhập một giá trị hợp lệ.');
      setGatheringPoints([]);
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
          <h1 className="font-bold text-2xl text-gray-700">Tra cứu </h1>
          <div className="flex  flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <button
                  onClick={handleOrderSearchButtonClick}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <input
            value={orderSearchQuery}
            onChange={(e) => setOrderSearchQuery(e.target.value)}
            className="text-gray-700 pr-2 w-48 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6 mr-2"
            type="text"
            id="searchOrder"
            placeholder="Nhập mã đơn hàng"
          />
          <button
                  onClick={handleGatheringPointSearchButtonClick}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <input
            value={gatheringPointSearchQuery}
            onChange={(e) => setGatheringPointSearchQuery(e.target.value)}
            className="text-gray-700 pr-2 w-48 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6 mr-2"
            type="text"
            id="searchGatheringPoint"
            placeholder="Nhập mã điểm gom hàng"
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
                      Tên gói hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Người gửi
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Người nhận
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Giá trị đơn hàng
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
          <td className="px-6 py-4">{order.details[0].package_name}</td>
          <td className="px-6 py-4">{order.sender_name}</td>
          <td className="px-6 py-4">{order.receiver_name}</td>
          <td className="px-6 py-4">{order.details[0].price}</td>
          <td className="px-6 py-4">{order.status}</td>
          {/* ... (other columns) */}
        </tr>
      ))}
    </tbody>
      </table>
        )}
        {gatheringPoints.length > 0 &&  (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Mã điểm gom hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Tên điểm gom hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Tên người gom hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Mã đơn hàng có tại điểm
                  </th>
              </tr>
          </thead>
          <tbody>
      {gatheringPoints.map((gatheringPoint) => (
        <tr key={gatheringPoint.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          {/* Example columns, adjust as needed */}
          <td className="px-6 py-4">{gatheringPoint.id}</td>
          <td className="px-6 py-4">{gatheringPoint.gathering_location.city}</td>
          <td className="px-6 py-4">{gatheringPoint.gathering_user.username}</td>
          <td className="px-6 py-4">{gatheringPoint.gathering_order.code}</td>
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