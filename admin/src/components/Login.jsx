import axios from 'axios';
import React from 'react'
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${backendURL}/api/user/admin`,{
                email,
                password
            });
            if(res.data.success){
                setToken(res.data.token);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>Email Address</p>
                    <input onChange={(e)=> setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>Password</p>
                    <input onChange={(e)=> setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='********' required />
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            </form> 
        </div>
    </div>
  )
}

export default Login