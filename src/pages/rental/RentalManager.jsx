import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import { getRentals, returnRental } from "../../services/rentalService";
import { getRentalItems } from "../../services/rentalItem";
import { getProducts } from "../../services/productService";
import { getProductItems } from '../../services/productItemService';

const RentalManager = () => {
    const [productsItems, setProductsItems] = useState([]);
    const [rentalItems, setRentalItems] = useState([]);

    useEffect(() => {
        getRentals().then((res) => setProductsItems(res));
    }, []);

    useEffect(() => {
        getProductItems().then((res) => setProductsItems(res));
    }, []);

    useEffect(() => {
        getRentalItems().then((res) => setRentalItems(res));
    } ,[])

    const { id } = useParams();

    const ReRental = (rentalId) => {
        try {
            returnRental(rentalId)
            alert("คืนสำเร็จ")
        } catch (error) {
            alert(error)
        }
    }

    const filterRebtItem = useMemo(() => {
        return rentalItems.filter(
            (item) => item.product_id === Number(id) && item.return_date === null
        );
    }, [productsItems, id]);
    
    console.log(filterRebtItem)

    return (
        <div className='flex flex-row gap-10'>
            {filterRebtItem.map((item, index) => (
                <div key={index} className='flex flex-col p-7 bg-gray-300 rounded-xl gap-3'>
                    <span className='text-xl font-bold'>ชื่อสินค้า: {item.product_name}</span>
                    <span>เช่าโดย: {item.customer_name}</span>
                    <span>ให้เช่าโดย Admin: {item.admin_name ?? "ไม่มีข้อมูล"}</span>
                    <span>วันที่เช่า: {item.rental_date}</span>
                    <span>วันที่นัดคืน: {item.due_date}</span>
                    <span>เงินที่ต้องจ่าย: {item.subtotal} บาท</span>

                    <button onClick={() => ReRental(item.rental_id)} className='mt-3 p-3 bg-gray-500 text-white rounded-xl hover:cursor-pointer'>คืนสินค้า</button>

                </div>
            ))}
        </div>
    )
}

export default RentalManager