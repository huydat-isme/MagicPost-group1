// newpage.js
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header_dasboard from "../header_dashboard";
import Modal from "react-modal";

const manage = () => {

  const [dataArray, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [addnew, setAddnew] = useState(false);

  const handleEdit = (id: number) => {
    const editedItem = dataArray.find((user) => user.id === id);
    setEditedData(editedItem);
    console.log(editedData);
    setModalIsOpen(true);
    setEditingMode(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setModalIsOpen(true);
    setEditingMode(false);
  };



  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/deleteuser?id=${deleteId}`, {
        method: "DELETE",
      });


      if (response.ok) {
        const response = await fetch("http://localhost:3000/api/user/getall");
        const apiData = await response.json();
        const data = Object.values(apiData);
        setData(apiData.data.users);
        setModalIsOpen(false);
        setEditingMode(false);
      } else {
        console.error("Lỗi khi cập nhật dữ liệu:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/getall");
        const apiData = await response.json();
        setData(apiData.data.users); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const positionMappings = {
    1: 'Giám đốc',
    2: 'Nhân viên',
    3: 'Trưởng phòng',
  };

  const handleUpdateApi = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${editedData.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData), // Chuyển đổi đối tượng editedData thành chuỗi JSON để gửi đi
      });

      console.log(editedData)
      if (response.ok) {
        const response = await fetch("http://localhost:3000/api/user/getall");
        const apiData = await response.json();

        setData(apiData.data.users);
        setModalIsOpen(false);
        setEditingMode(false);
      } else {
        console.error("Lỗi khi cập nhật dữ liệu:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleAddNew = () => {
    console.log(dataArray);
    // Tạo một bản ghi mới (để demo, sử dụng id tăng tự động)
    const newRecord = {
      id: dataArray.length + 1,
      username: "",
      phone: "",
      role: 1,
      password: ""
    };

    // Mở modal với bản ghi mới
    setAddnew(true);
    setEditedData(newRecord);
    setModalIsOpen(true);
    setEditingMode(true);
  };


  const handleSaveNew = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData), // Chuyển đổi đối tượng editedData thành chuỗi JSON để gửi đi
      });

      console.log(editedData)
      if (response.ok) {
        // Nếu thành công, cập nhật dữ liệu trong state và đóng modal
        const response = await fetch("http://localhost:3000/api/user/getall");
        const apiData = await response.json();

        setData(apiData.data.users);
        setModalIsOpen(false);
        setEditingMode(false);
      } else {
        console.error("Lỗi khi cập nhật dữ liệu:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };



  const handleUpdate = () => {
    if (addnew) {
      handleSaveNew();
    } else {
      handleUpdateApi();
    }
  };


  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Header_dasboard />




      <div className="flex flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between p-8">
            <input
              type="text"
              placeholder="Search"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded"
            />

            <button
              onClick={handleAddNew}
              className="btn ml-4 px-6 py-2 bg-blue-500 text-white rounded"
            >
              Add new
            </button>
          </div>
          <h1 className="font-extrabold text-center text-4xl m-5 p-5">
            Employee
          </h1>
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {

                dataArray.map((user) => (

                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.id}</td>
                    <td className="py-2 px-4 border-b">{user.username}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">{positionMappings[user.role]}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-blue-200 btn btn-xs"
                        onClick={() => handleEdit(user.id)}
                      >
                        Change
                      </button>
                      <button
                        className="bg-red-200 btn btn-xs"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                ))}
            </tbody>
          </table>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Edit Modal"
            className="relative flex flex-col justify-center h-4/5 bg-gray-100 p-6 w-1/3 my-14 mx-auto"
          >
            {editingMode ? (
              <>
                <h1 className="text-4xl font-extrabold dark:text-white text-center">
                  Information
                </h1>
                <div>
                  <label className="label">
                    <h2>Name:</h2>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    value={editedData.username}
                    onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}

                  />
                </div>

                <div>
                  <label className="label">
                    <h2>Phone:</h2>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    value={editedData.phone}
                    onChange={(e) =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label">
                    <h2>Password:</h2>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    value={editedData.password}
                    onChange={(e) =>
                      setEditedData({ ...editedData, password: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label">Role:</label>
                  <select
                    value={editedData.role}
                    onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                    className="input input-bordered w-full"
                  >
                    <option value="1">Giám đốc</option>
                    <option value="2">Nhân viên</option>
                    <option value="3">Trưởng phòng</option>
                  </select>

                </div>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn" onClick={handleUpdate}>
                      OK
                    </button>
                    <button
                      className="btn"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4 text-center">
                  Xác Nhận Xóa
                </h2>
                <br />
                <p className="mb-4">Bạn có chắc muốn xóa nội dung này không?</p>
                <br />
                <button
                  onClick={confirmDelete}
                  className="btn bg-red-500 text-white rounded"
                >
                  OK
                </button>
                <button className="btn" onClick={() => setModalIsOpen(false)}>
                  Cancel
                </button>
              </>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default manage;
