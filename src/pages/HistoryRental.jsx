import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/productService';
import { getRentalItems } from '../services/rentalItem';

const HistoryRental = () => {
  const [products, setProducts] = useState([]);
  
      useEffect(() => {
          getRentalItems().then((res) => setProducts(res))
      }, []);
  
  
      const user = JSON.parse(localStorage.getItem("user"));
  
      const result = useMemo(() => {
          return products.filter(
              (item) => item.customer_id === 1 && item.status === "available" //user.customer_id
          );
      }, [products]);
  
      console.log(products)
      console.log(result)
  
  
      return (
          <div>
              <h1 className='text-2xl font-bold'>สินค้าที่เคยจอง</h1>
              <div className="flex flex-row gap-5 p-5 ">
                  {result.map((items, index) => (
                      <div key={index} className="flex flex-col gap-3 rounded-xl  bg-gray-300 p-5">
                          <img src={items.image_url} alt="" className="w-50 h-50 object-cover rounded-md" />
                          <span className="font-bold text-xl">{items.product_name}</span>
                          <span>ค่าเช่าต่อวัน: {items.price_per_day}</span>
                          <span>วันที่เช่า: {items.rental_date}</span>
                          <span>วันที่ต้องคืน: {items.due_date}</span>
                          <span>ยอดชำระ: {items.subtotal} บาท</span>
                          
                      </div>
                  ))}
              </div>
          </div>
      )
}

export default HistoryRental