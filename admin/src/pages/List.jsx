import React from 'react'
import { useEffect, useState } from 'react';
import { backendURL } from '../App';
import axios from 'axios';
import { currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';  


const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      
      const res = await axios.get(backendURL+'/api/product/list',{headers:{token}});
      if(res.data.success){
        setList(res.data.products)
      }
      else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const res = await axios.post(backendURL + '/api/product/remove', {id}, {headers:{token}})

      if(res.data.success){
        toast.success(res.data.message)
        await fetchList();
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(()=> {
    if(token){
      fetchList()
    }
  },[token])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-centerpy-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center '>Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item,index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12'  src={(item.images && item.images.length > 0) ? item.images[0] : assets.placeholder_image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
               <p
                  // 4. Add the onClick handler to remove the product
                  onClick={()=>removeProduct(item._id)}
                  className='text-right md:text-center cursor-pointer text-lg'
                >
                  &times;
              </p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List