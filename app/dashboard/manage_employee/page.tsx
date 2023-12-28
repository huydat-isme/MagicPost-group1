// newpage.js
"use client";
import Link from 'next/link';
import React, { useEffect, useState }from 'react';
import Header_dasboard from '../header_dashboard';
import Modal from 'react-modal';

const manage = () => {
  fetch('/api/user/getall')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  const [data, setData] = useState([
    { id: 1, name: 'Nguyen Van A', email: 'a@example.com', phone: '123456789', workplace: 'Company A', role: 'Giám đốc' },
    { id: 2, name: 'Tran Thi B', email: 'b@example.com', phone: '987654321', workplace: 'Company B', role: 'Nhân viên' },
    // Thêm các bản ghi khác nếu cần
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [addnew, setAddnew] = useState(false);

  const handleEdit = (id: number) => {
    const editedItem = data.find(item => item.id === id);
    setEditedData(editedItem);
    setModalIsOpen(true);
    setEditingMode(true);
  };

  const handleUpdate1 = () => {
    // Cập nhật dữ liệu trong data
    const updatedData = data.map(item =>
      item.id === editedData.id ? editedData : item
    );
    setData(updatedData);
    setModalIsOpen(false);
    setEditingMode(false);
  };

  const handleDelete = (id: number | React.SetStateAction<null>) => {
    setDeleteId(id);
    setModalIsOpen(true);
    setEditingMode(false);
  };

  const confirmDelete = () => {
    // Xóa dữ liệu trong data
    const updatedData = data.filter(item => item.id !== deleteId);
    setData(updatedData);
    setModalIsOpen(false);
  }; 

  const handleAddNew = () => {
    // Tạo một bản ghi mới (để demo, sử dụng id tăng tự động)
    const newRecord = {
      id: data.length + 1,
      name: '',
      email: '',
      phone: '',
      workplace: '',
      role: 'Giám đốc',
    };

    // Mở modal với bản ghi mới
    setAddnew(true);
    setEditedData(newRecord);
    setModalIsOpen(true);
    setEditingMode(true);
  };

  

  const handleSaveNew = () => {
    // Thêm bản ghi mới vào data
    setData([...data, editedData]);
    setModalIsOpen(false);
    setEditingMode(false);
  };

  const handleUpdate = () =>{
    if(addnew) {
      handleSaveNew();
    }
    else{
      handleUpdate1();
    }
  }

  return (
    
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Header_dasboard />
      


        
      <div className="flex flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
      <div className="container mx-auto p-4">
        <div className='flex items-center justify-between p-8'>
          
            <input type="text" placeholder="Search" className="w-1/2 px-4 py-2 border border-gray-300 rounded" />
        
          <button
            onClick={handleAddNew}
            className="btn ml-4 px-6 py-2 bg-blue-500 text-white rounded"
          >
          Add new
          </button>
          

        </div>
        <h1 className='font-extrabold text-center text-4xl m-5 p-5'>Employee</h1>
        <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Workplace</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">{item.phone}</td>
              <td className="py-2 px-4 border-b">{item.workplace}</td>
              <td className="py-2 px-4 border-b">{item.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-200 btn btn-xs"
                  onClick={() => handleEdit(item.id)}
                >
                  Change
                </button>
                <button
                  className="bg-red-200 btn btn-xs"
                  onClick={() => handleDelete(item.id)}
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
            <h1 className="text-4xl font-extrabold dark:text-white text-center">Information</h1>
        <div>
        <label className="label">
        <h2>Name:</h2>
        </label>
        <input
          className="input input-bordered w-full"
          type="text"
          value={editedData.name}
          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
        />
        
        </div>
        <div>
        <label className="label">
        <h2>Email:</h2>
        </label>
        <input
          className="input input-bordered w-full"
          type="text"
          value={editedData.email}
          onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
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
          onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
        />
        
        </div>
        <div>
        <label className="label">
        <h2>Workplace:</h2>
        </label>
        <input
          className="input input-bordered w-full "
          type="text"
          value={editedData.workplace}
          onChange={(e) => setEditedData({ ...editedData, workplace: e.target.value })}
        />
        
        </div>
        <div>
        <label className="label">Chức Vụ:</label>
            <select
              value={editedData.role}
              onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
              className="input input-bordered w-full"
            >
              <option value="Giám đốc">Giám đốc</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Trưởng phòng">Trưởng phòng</option>
            </select>
        
        </div>
        
      <div className="modal-action">
      <form method="dialog">
        
        <button className="btn" onClick={handleUpdate}>OK</button>
        <button className="btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </form>
      </div>
      </>
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-4 text-center">Xác Nhận Xóa</h2>
          <br />
          <p className="mb-4">Bạn có chắc muốn xóa nội dung này không?</p>
          <br />
          <button
            onClick={confirmDelete}
            className="btn bg-red-500 text-white rounded">
            OK
          </button>
          <button className="btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </>
      )}
      
        
      </Modal>
    </div>
    </div>
       
    </div>
  );
};

export default manage;





