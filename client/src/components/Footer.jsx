import React from 'react'
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='text-center p-5 flex flex-col gap-2 lg:flex-row lg:justify-between '>
        <p>© All rights reserved 2024</p>
        <div className='flex items-center gap-4 justify-center text-2xl '>
          <a href='' className='hover:text-primary-200'><FaFacebook /></a>
          <a href='' className='hover:text-primary-100'><FaInstagram /></a>
          <a href='' className='hover:text-primary-100'><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer