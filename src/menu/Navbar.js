import React from "react"
import { Link } from "react-router-dom"


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
						<Link to='/' className='nav-link'>
							ตรวจสอบรายการใหม่
						</Link>
					</li>
				</ul>
				{/* Right navbar links */}
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<Link to='/' className='nav-link' data-widget='fullscreen' role='button'>
							<i className='fas fa-expand-arrows-alt' />
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/' className='nav-link' data-widget='control-sidebar' data-slide='true' role='button'>
							<i className='fas fa-user' />
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
