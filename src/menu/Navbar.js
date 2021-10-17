import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <div>
      <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
        {/* Left navbar links */}
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <span className='nav-link' data-widget='pushmenu' role='button'>
              <i className='fas fa-bars' />
            </span>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link to='/NewRequest' className='nav-link'>
              บันทึกรายการใหม่
            </Link>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link to='/GetNewRequest' className='nav-link'>
              ตรวจสอบรายการใหม่{' '}
              <span className='right badge badge-danger'>New</span>
            </Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <span className='nav-link' data-widget='fullscreen' role='button'>
              <i className='fas fa-expand-arrows-alt' />
            </span>
          </li>
          <li className='nav-item'>
            <span className='nav-link' data-widget='control-sidebar' role='button'>
              <i className='fas fa-user' />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
