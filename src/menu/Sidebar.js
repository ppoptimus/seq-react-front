import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
	return (
    <>
      <aside className='main-sidebar sidebar-light-blue elevation-5 vh-100'>
        {/* Brand Logo */}
        <Link to='/' className='brand-link'>
          <img src='dist/img/logo.png' alt='sequester' className='brand-image img-circle elevation-3' style={{ opacity: '.8' }} />
          <span className='brand-text font-weight-light'>SEQUESTER</span>
        </Link>
        {/* Sidebar */}
        <div className='sidebar'>
          {/* SidebarSearch Form */}
          <div className='form-inline'>
            <div className='input-group' data-widget='sidebar-search'>
              <input className='form-control form-control-sidebar' type='search' placeholder='Search' aria-label='Search' />
              <div className='input-group-append'>
                <button className='btn btn-sidebar'>
                  <i className='fas fa-search-location fa-fw' />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className='mt-2'>
            <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
              <li className='nav-item'>
                <Link to='/' className='nav-link active'>
                  <i className='nav-icon fas fa-table' />
                  <p>หน้าหลัก</p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/NewRequest' className='nav-link'>
                  <i className='nav-icon fas fa-search' />
                  <p>
                    ค้นหารายการ
                    
                  </p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-paste' />
                  <p>Save Document set</p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-file-export' />
                  <p>Export File</p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-cloud-upload-alt' />
                  <p>Import File</p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  {/* <i className='nav-icon fas fa-angle-right' /> */}
                  <p>
                    Master Data
                    <i className='fas fa-angle-left right' />
                  </p>
                </Link>
                <ul className='nav nav-treeview ml-4'>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                      <i className='fas fa-user-edit nav-icon' />
                      <p>Master User</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                      <i className='fas fa-user-shield nav-icon' />
                      <p>Master UserLevel</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                      <i className='fas fa-flag nav-icon' />
                      <p>Master Department</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                      <i className='fas fa-building nav-icon' />
                      <p>Master Bank</p>
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                      <i className='fas fa-heading nav-icon' />
                      <p>Master Title</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-cog' />
                  <p>System Config</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  )
}
