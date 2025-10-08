import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='text gray-600 font-semibold text-xl'>Our Store</p>
            <p className='text gray-500'>123 Fashion St. <br /> Los Angeles, CA 90001</p>
            <p className='text gray-500'> Phone: (123) 456-7890 <br />Email: info@vamitrends.com</p>
            <p className='text gray-600 font-semibold text-xl'>Careers at Vamitrends</p>
            <p className='text gray-500'>Learn more about our teams and job openings</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
        </div>
        <NewsletterBox />
    </div>
  )
}

export default Contact