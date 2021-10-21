import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

export default function Navbar() {
	
	let history = useHistory()
	const [userDetail, setUserDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	
  const onLogoutClick = (e) => {
    localStorage.removeItem('userDetail')
		history.push('/')
    refreshPage()
  }

  function refreshPage() {
    window.location.reload(false);
  }

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
						<Link to='/SaveNewRequest' className='nav-link'>
							บันทึกรายการใหม่
						</Link>
					</li>
					<li className='nav-item d-none d-sm-inline-block'>
						<Link to='/GetNewRequest' className='nav-link'>
							ตรวจสอบรายการใหม่ {' '}
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
					
					<li className='nav-item dropdown'>
						<a className='nav-link' data-toggle='dropdown' href='#'>
							<i className='fas fa-user' />
						</a>
						<div className='dropdown-menu dropdown-menu-lg dropdown-menu-right'>
							<span className='dropdown-item dropdown-header'>ข้อมูลผู้ใช้งาน</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-user mr-2' />
								ชื่อผู้ใช้ : {userDetail.username}
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-flag mr-2' />
								รหัสสาขา : {userDetail.department_code}
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-shield-alt mr-2' />
								ระดับการเข้าถึง : {userDetail.user_level_name}
							</span>
              <div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-clipboard mr-2' />
								ชื่อ-สกุล : {userDetail.first_name} {userDetail.last_name}
							</span>
              <div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-id-badge mr-2' />
								บัตรประชาชน : {userDetail.personal_id}
							</span>
							<div className='dropdown-divider' />
							<button className='dropdown-item dropdown-footer bg-danger' role='button' type='submit' onClick={onLogoutClick}>
								ออกจากระบบ
							</button>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	)
}
