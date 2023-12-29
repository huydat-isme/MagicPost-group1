'use client'
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";
interface PackageItem {
    name: string;
    quantity: string;
    mass: string;
    value: string;
  }

export default function DeliveryPackageForm() {
  
  //  Api về các tỉnh thành
  const host = 'https://provinces.open-api.vn/api/';
  const [senderCities, setSenderCities] = useState([]);
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderWards, setSenderWards] = useState([]);
  const [receiverCities, setReceiverCities] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverWards, setReceiverWards] = useState([]);

  useEffect(() => {
    // Fetch sender cities
    axios.get(host + '?depth=1').then((response) => {
      setSenderCities(response.data);
    });

    // Fetch receiver cities
    axios.get(host + '?depth=1').then((response) => {
      setReceiverCities(response.data);
    });
  }, []);

  const handleSenderCityChange = (selectedCityId) => {
    // Fetch sender districts
    axios.get(host + `p/${selectedCityId}?depth=2`).then((response) => {
      setSenderDistricts(response.data.districts);
    });
  };

  const handleSenderDistrictChange = (selectedDistrictId) => {
    // Fetch sender wards
    axios.get(host + `d/${selectedDistrictId}?depth=2`).then((response) => {
      setSenderWards(response.data.wards);
    });
  };

  const handleReceiverCityChange = (selectedCityId) => {
    // Fetch receiver districts
    axios.get(host + `p/${selectedCityId}?depth=2`).then((response) => {
      setReceiverDistricts(response.data.districts);
    });
  };

  const handleReceiverDistrictChange = (selectedDistrictId) => {
    // Fetch receiver wards
    axios.get(host + `d/${selectedDistrictId}?depth=2`).then((response) => {
      setReceiverWards(response.data.wards);
    });
  };


// Tổng lượng hàng
  const [items, setItems] = useState<PackageItem[]>([]);
  const [totalMass, setTotalMass] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', mass: '', value: '' }]);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    updateTotals(updatedItems);
  };

  const handleItemChange = (index: number, field: keyof PackageItem, value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    updateTotals(updatedItems);
  };
  const updateTotals = (updatedItems: any[]) => {
    let newTotalMass = 0;
    let newTotalValue = 0;

    updatedItems.forEach((item) => {
      const itemMass = parseFloat(item.mass) || 0;
      const itemValue = parseFloat(item.value) || 0;
      const itemQuantity = parseFloat(item.quantity) || 0;
      newTotalMass += itemQuantity * itemMass;
      newTotalValue += itemQuantity * itemValue;
    });

    setTotalMass(newTotalMass);
    setTotalValue(newTotalValue);
  };
  
// Gửi dữ liệu lên server
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  

  const formData = {
    sender_name: e.currentTarget['sender_full-name']?.value || '',
      sender_phone: e.currentTarget['sender_phone-number']?.value || '',
      sender_location: e.currentTarget['sender_city']?.selectedOptions[0]?.innerText || '',
      receiver_name: e.currentTarget['receiver_full-name']?.value || '',
      receiver_phone: e.currentTarget['receiver_phone_number']?.value || '',
      receiver_location: e.currentTarget['receiver_city']?.selectedOptions[0]?.innerText  || '', 
   
  };
  console.log(formData);
  try {
    const response = await fetch('/api/order/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Order created successfully:', data);
    } else {
      console.error('Failed to create order:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};


  
  return (
  <form onSubmit={(e) => handleSubmit(e)} className="flex  flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
  {/* Nguời gửi */}
   <div className="w-2/5 md:w-100 md:max-w-full   ">
<div className="p-6 border border-gray-300 sm:rounded-md ">

<div className="space-y-12">
  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin người gửi</h2>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
          Họ và tên
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="sender_full-name"
            id="sender_full-name"
            autoComplete="given-name"
            required
            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="sender_phone-number" className="block text-sm font-medium leading-6 text-gray-900">
          Số điện thoại
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="sender_phone-number"
            name="sender_phone-number"
            type="text"
            required
            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="sender_city" className="block text-sm font-medium leading-6 text-gray-900">
          Thành phố
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <select
          onChange={(e) => handleSenderCityChange(e.target.value)}
            id="sender_city"
            name="sender_city"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
              <option value="" selected>
                    Chọn tỉnh thành
                  </option>
                  {senderCities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="sebder_district" className="block text-sm font-medium leading-6 text-gray-900">
          Quận/Huyện
          <span className="text-red-500">*</span>
        </label>
        
        <div className="mt-2">
          <select
          onChange={(e) => handleSenderDistrictChange(e.target.value)}
            id="sender_district"
            name="sender_district"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
             <option value="" selected>
                    Chọn quận huyện
                  </option>
                  {senderDistricts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="sender_ward" className="block text-sm font-medium leading-6 text-gray-900">
          Xã/Phường
          <span className="text-red-500">*</span>
        </label>
        
        <div className="mt-2">
          <select
          
            id="sender_ward"
            name="sender_ward"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="" selected>
                    Chọn phường xã
                  </option>
                  {senderWards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
          Postal code
        </label>
        
        <div className="mt-2">
          <input
            type="text"
            name="sender_postal-code"
            id="sender_postal-code"
            autoComplete="postal-code"
            
            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
          Tên Đường
        </label>
        <span className="text-red-500">*</span>
        <div className="mt-2">
          <input
            type="text"
            name="sender_street-address"
            id="sender_street-address"
            required
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div>
</div>

  </div>

  {/* Người nhận */}
  <div className="p-6 border border-gray-300 sm:rounded-md ">
 
    <div className="space-y-12 ">
      
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin nguời nhận</h2>
       

       
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
             Họ và tên<span className="text-red-500">*</span>
            </label>
            
            <div className="mt-2">
              <input
              required
                type="text"
                name="receiver_full-name"
                id="receiver_full-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        

          <div className="sm:col-span-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Số điện thoại
              <span className="text-red-500">*</span>
            </label>
            
            <div className="mt-2">
              <input
              required
                id="receiver_phone-number"
                name="receiver_phone-number"
                type="phoneNumber"
               
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

         <div className="sm:col-span-3">
        <label htmlFor="receiver_city" className="block text-sm font-medium leading-6 text-gray-900">
          Thành phố
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <select
         onChange={(e) => handleReceiverCityChange(e.target.value)}
            id="receiver_city"
            name="receiver_city"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
             <option value="" selected>
                    Chọn tỉnh thành
                  </option>
                  {receiverCities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="receiver_district" className="block text-sm font-medium leading-6 text-gray-900">
          Quận/Huyện
          <span className="text-red-500">*</span>
        </label>
        
        <div className="mt-2">
          <select
          onChange={(e) => handleReceiverDistrictChange(e.target.value)}
            id="receiver_district"
            name="receiver_district"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
              <option value="" selected>
          Chọn quận huyện
        </option>
        {receiverDistricts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="receiver_ward" className="block text-sm font-medium leading-6 text-gray-900">
          Xã/Phường
          <span className="text-red-500">*</span>
        </label>
        
        <div className="mt-2">
          <select
          
            id="receiver_ward"
            name="receiver_ward"
           
            required
            
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="" selected>
          Chọn phường xã
        </option>
        {receiverWards.map((ward) => (
          <option key={ward.code} value={ward.name}>
            {ward.name}
          </option>
        ))}
          </select>
        </div>
      </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="receiver_postal-code"
                id="receiver_postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
              Tên Đường
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="receiver_street-address"
                id="receiver_street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

   
 
  </div>

  </div>
  <div className="w-3/5 md:w-100 md:max-w-full">
  <div className="p-6 border border-gray-300 sm:rounded-md">
  
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin hàng hóa</h2>

          {items.map((item, index) => (
            <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor={`package-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Tên hàng hóa
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      name={`package-name-${index}`}
                      id={`package-name-${index}`}
                    
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor={`quantity-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Số lượng
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      name={`quantity-${index}`}
                      id={`quantity-${index}`}
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`mass-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Khối lượng (g)
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      name={`mass-${index}`}
                      id={`mass-${index}`}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={item.mass}
                      onChange={(e) => handleItemChange(index, 'mass', e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`value-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Giá trị hàng (VNĐ)
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      name={`value-${index}`}
                      id={`value-${index}`}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={item.value}
                      onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                    />
                  </div>
                </div>
                <button
        className="btn btn-outline btn-primary"
        type="button"
        onClick={() => deleteItem(index)}
      >
        Xóa
      </button>
              </div>
            ))}
          </div>

          <button className="btn btn-outline btn-primary" type="button" onClick={addItem}>
            Thêm mặt hàng mới
          </button>
        </div>
        <div className="mt-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Tổng khối lượng hàng: {totalMass} gam</h2>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Tổng giá trị hàng: {totalValue} VNĐ</h2>
        </div>
        <button type="submit"  value="Gửi ngay" className="btn btn-primary btn-outline">Gửi ngay</button>
      
    </div>
  </div>
  </form>
  
  );
}