import React from "react"
import { Link } from "react-router-dom"


export default function Navbar() {
	return (
		<div>
			<nav className='main-header navbar navbar-expand navbar-white navbar-light'>
				{/* Left navbar links */}
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<a className='nav-link' data-widget='pushmenu' href='#' role='button'>
							<i className='fas fa-bars' />
						</a>
					</li>
					<li className='nav-item d-none d-sm-inline-block'>
						<Link to='/NewRequest' className='nav-link'>
							บันทึกรายการใหม่
						</Link>
					</li>
					<li className='nav-item d-none d-sm-inline-block'>
						<a href='#' className='nav-link'>
							ตรวจสอบรายการใหม่
						</a>
					</li>
				</ul>
				{/* Right navbar links */}
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<a className='nav-link' data-widget='fullscreen' href='#' role='button'>
							<i className='fas fa-expand-arrows-alt' />
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' data-widget='control-sidebar' data-slide='true' href='#' role='button'>
							<i className='fas fa-user' />
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}
