import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Welcome to Vami Trends, where contemporary fashion meets timeless elegance. We believe that clothing is more than just fabric; it's a form of self-expression, a way to tell your unique story to the world. Our brand was born from a passion for empowering individuals to feel confident and beautiful in their own skin. Every piece in our collection is designed not just to follow trends, but to set them, offering you a wardrobe that is both modern and enduringly chic.</p>
            <p>At Vami Trends, we are committed to sustainability and ethical practices. We carefully select our materials and work with artisans who share our values, ensuring that every garment is made with care and respect for the environment. Join us on this journey towards a more sustainable future, where fashion is not just about looking good, but also about doing good.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>We are committed to sustainability and ethical practices. We carefully select our materials and work with artisans who share our values, ensuring that every garment is made with care and respect for the environment. Join us on this journey towards a more sustainable future, where fashion is not just about looking good, but also about doing good.</p>
          </div>
        </div>
        <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance</b>
            <p className='text-gray-600'>At Vami Trends, quality is not an afterthought; it is the foundation of our design and we keep this in mind.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience</b>
            <p className='text-gray-600'>At Vami Trends, we believe that convenience is the ultimate luxury. We understand that your life is dynamic and demanding.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service</b>
            <p className='text-gray-600'>At Vami Trends, we believe that exceptional customer service is the ultimate luxury. We understand that your life is dynamic and demanding.</p>
          </div>
        </div>

        <NewsletterBox />
    </div>
  )
}

export default About