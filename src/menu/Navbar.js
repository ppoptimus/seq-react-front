import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetail from '../UserDetail'

export default function Navbar() {
	const [userDetail] = useState(UserDetail)

	const onLogoutClick = () => {
		localStorage.removeItem('userDetail')
		refreshPage()
	}

	function refreshPage() {
		window.location.reload(false)
	}

	return (
		<>
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
							ตรวจสอบรายการใหม่ <span className='right badge badge-danger'>New</span>
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
						<span className='nav-link' data-toggle='dropdown'>
							<i className='fas fa-user' />
						</span>
						<div className='dropdown-menu dropdown-menu-lg dropdown-menu-right p-2'>
							<span className='dropdown-item dropdown-header'>ข้อมูลผู้ใช้งาน</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-user mr-2' />
								ชื่อผู้ใช้ : <b>{userDetail.username}</b>
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-flag mr-2' />
								รหัสสาขา : <b>{userDetail.department_code}</b>
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-shield-alt mr-2' />
								ระดับการเข้าถึง : <b>{userDetail.user_level_name}</b>
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-clipboard mr-2' />
								ชื่อ-สกุล :{' '}
								<b>
									{userDetail.first_name} {userDetail.last_name}
								</b>
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-id-badge mr-2' />
								บัตรประชาชน : <b>{userDetail.personal_id}</b>
							</span>
							<div className='dropdown-divider' />
							<button className='dropdown-item dropdown-footer bg-danger' type='submit' onClick={onLogoutClick}>
								ออกจากระบบ
							</button>
						</div>
					</li>
				</ul>
			</nav>
		</>
	)
}
