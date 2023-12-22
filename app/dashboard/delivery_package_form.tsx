'use client'
import React, { useState } from 'react';

interface PackageItem {
    name: string;
    quantity: string;
    mass: string;
    value: string;
  }

export default function DeliveryPackageForm() {
    
  const [items, setItems] = useState<PackageItem[]>([]);
  const [totalMass, setTotalMass] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', mass: '', value: '' }]);
  };

  const handleItemChange = (index: number, field: keyof PackageItem, value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    updateTotals(updatedItems);
  };
  const updateTotals = (updatedItems) => {
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
  return (
    <div className="w-3/5 md:w-100 md:max-w-full">
    <div className="p-6 border border-gray-300 sm:rounded-md">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin hàng hóa</h2>

            {items.map((item, index) => (
              <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor={`package-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Tên hàng hóa
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={`package-name-${index}`}
                        id={`package-name-${index}`}
                      
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor={`quantity-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Số lượng
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={`quantity-${index}`}
                        id={`quantity-${index}`}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={`mass-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Khối lượng
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={`mass-${index}`}
                        id={`mass-${index}`}
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={item.mass}
                        onChange={(e) => handleItemChange(index, 'mass', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={`value-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Giá trị hàng
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={`value-${index}`}
                        id={`value-${index}`}
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={item.value}
                        onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-outline btn-primary" type="button" onClick={addItem}>
              Thêm mặt hàng mới
            </button>
          </div>
          <div className="mt-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Tổng khối lượng hàng: {totalMass}</h2>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Tổng giá trị hàng: {totalValue}</h2>
          </div>
        </form>
      </div>
    </div>
  );
}
