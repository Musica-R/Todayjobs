import React from 'react'
import "../styles/Footer.css"

const Footer = () => {
  return (
    <div className='footer-main'>
      <div className='footer1'>
        <div className='fochil1'>
          <h1>Today Jobs</h1>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <p>© 2025 TodayJobs. All rights reserved.</p>
      </div>
      <div className='footer1'>
        <h1>Quick Links</h1>
        <ul className='fochil2'>
          <li>Home</li>
          <li>Browse Jobs</li>
          <li>Companies</li>
          <li>About us</li>
        </ul>
      </div>
      <div className='footer1'>
        <h1>Contact Us</h1>
        <div className='fochil3'>
          <div className='fochil4'>
            <img src="/assets/Frame (4).png" alt="" />
            <p>Todayjobs.office@gmail.com</p>
          </div>
          <div className='fochil4'>
            <img src="/assets/Frame (5).png" alt="" />
            <p>+91 9876543210</p>
          </div>
        </div>
        <div className='fochil5'>
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
          <p>How Google use Data</p>
        </div>
      </div>
    </div>
  )
}

export default Footer