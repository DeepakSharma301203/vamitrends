import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const {navigate, backendUrl, token , cartItems, setCartItems, getCartAmount, delivery_fees, products} = useContext(ShopContext);


  const [formData, setFromData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    zipcode:'',
    country:'',
    phone:'',
    state:''
  })

  const onChangeHandler = (event) => {
    const name  = event.target.name;
    const val = event.target.value;

    setFromData(data => ({...data,[name]:val}))

  }

  const initPay = (order) => {
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description:"Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);

        try {
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', res, {headers:{token}})
          if(data.success) {
            navigate('/orders');
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
              const itemInfo = structuredClone(products.find(product => product._id === items));            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fees
      }


      switch(method){
        //api calls for COD
        case 'cod':
          const res = await axios.post(backendUrl + '/api/order/place',orderData, {headers:{token}});          
          if(res.data.success){
            setCartItems({});
            navigate('/orders')
          }
          else{
            toast.error(res.data.message)
          }
          break;

        case 'razorpay':
          const resRazorpay = await axios.post(backendUrl+'/api/order/razorpay', orderData, {headers:{token}})       
          if(resRazorpay.data.success){
            initPay(resRazorpay.data.order);
          }
          break;

        default:
          break;

      }
    } catch (error) {
      console.error("API call failed:", error);
      toast.error("Something went wrong. Please try again."); // Also notify the user
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstname' value={formData.firstname} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
            <input required onChange={onChangeHandler} name='lastname' value={formData.lastname} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address'/>
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
            <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
          </div>
          <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
        </div>

        {/* Right Side */}
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>
          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-blue-500' : 'bg-transparent'}`}></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div>
              <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-blue-500' : 'bg-transparent'}`}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-500' : 'bg-transparent'}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white py-3 px-16 text-sm'>PLACE ORDER</button>
            </div>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder