import React from 'react'
import logo from "../../public/images/logo.png";

const LeftCommonSide = () => {
  return (
    <div className='center pl-28 ml-20 leading-[24px] py-32 w-[80%] h-[70%]'>
    <h4 className='text-white text-[16px] mb-3 font-normal uppercase'>Welcome to</h4>
    <img src={logo} className='w-[401.88px]' alt="Logo" />
    <div className='text-[#9f9f9f] mt-10 w-[75%]'>
        <p className='mb-10'>We help you track your organization's metrics as per the ESG Guidelines</p>
        <h5 className='text-white font-normal'>Sounds Interesting? <span className='text-[#4FA556]'>Get in touch</span></h5>
    </div>
</div>
  )
}

export default LeftCommonSide