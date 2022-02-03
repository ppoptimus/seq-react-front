import React, { useState } from "react"
import UserDetail from "../UserDetail"
import { useHistory } from "react-router-dom";

export default function Navbar() {
	const [userDetail] = useState(UserDetail)
	const history = useHistory();

	const onLogoutClick = () => {
		localStorage.removeItem("userDetail")
		history.push("/");
		refreshPage()
	}

	function refreshPage() {
		window.location.reload(false)
	}

	return (
		<>
			<nav className='main-header navbar navbar-expand navbar-white navbar-light fixed-top'>
				{/* Left navbar links */}
				<ul className='navbar-nav text-lg'>
					<li className='nav-item'>
						<span
							className='nav-link'
							data-widget='pushmenu'
							data-bs-toggle='tooltip'
							data-bs-placement='left'
							title='เปิด/ปิด เมนู'>
							<i className='fas fa-bars' />
						</span>
					</li>
				</ul>
				{/* Right navbar links */}
				<ul className='navbar-nav ml-auto text-lg'>
					<li className='nav-item'>
						<span
							className='nav-link'
							data-widget='fullscreen'
							role='button'
							data-bs-toggle='tooltip'
							data-bs-placement='left'
							title='ขยายเต็มจอ'>
							<i className='fas fa-expand-arrows-alt' />
						</span>
					</li>

					<li className='nav-item dropdown'>
						<span
							className='nav-link'
							data-toggle='dropdown'
							role='button'
							data-bs-toggle='tooltip'
							data-bs-placement='left'
							title='ข้อมูลผู้ใช้งาน'>
							<i className='fas fa-user' />
						</span>
						<div className='dropdown-menu dropdown-menu-lg dropdown-menu-right p-2'>
							<span className='dropdown-item dropdown-header text-md'>ข้อมูลผู้ใช้งาน</span>
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
								ชื่อ-สกุล :{" "}
								<b>
									{userDetail.first_name} {userDetail.last_name}
								</b>
							</span>
							<div className='dropdown-divider' />
							<span className='dropdown-item'>
								<i className='fas fa-id-badge mr-2' />
								บัตรประชาชน : <b>{userDetail.personal_id}</b>
							</span>
						</div>
					</li>

					<li className='nav-item'>
						<span
							className='nav-link'
							role='button'
							data-bs-toggle='tooltip'
							data-bs-placement='left'
							title='ออกจากระบบ'
							onClick={onLogoutClick}>
							<i className='fas fa-sign-out-alt' />
						</span>
					</li>
				</ul>
			</nav>
		</>
	)
}
