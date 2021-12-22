import { useState } from "react"
import { Link } from "react-router-dom"

export default function SideBar2() {
	const [isAdmin, setIsAdmin] = useState(null)
	useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			setIsAdmin(JSON.parse(userData).userlevel_id === "3" ? false : true)
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	return (
		<>
			<aside className='main-sidebar sidebar-light-blue elevation-5 vh-100 text-md'>
				{/* Brand Logo Click to Homepage */}
				<Link to='/' className='brand-link'>
					<img src='dist/img/logo.png' alt='sequester' className='brand-image img-circle elevation-3' style={{ opacity: ".8" }} />
					<span className='brand-text font-weight-light'>SEQUESTER</span>
				</Link>
				{/* Sidebar Menu*/}
				<div className='sidebar'>
					<nav className='mt-2'>
						<ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
							<li className='nav-item'>
								<span className='nav-link' style={{ cursor: "context-menu" }}>
									<i className='nav-icon fas fa-university' />
									<p>ธนาคาร</p>
									<i className='fas fa-angle-left right' />
								</span>
								<ul className='nav nav-treeview ml-4'>
									<li className='nav-item'>
										<Link to='/SaveNewRequest' className='nav-link'>
											<i className='fas fa-plus nav-icon' />
											<p>บันทึกรายการใหม่</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/GetNewRequest' className='nav-link'>
										<i className='fas fa-list-ol nav-icon' />
										 <p>ตรวจสอบรายการใหม่</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/ExportManual' className='nav-link'>
											<i className='fas fa-random nav-icon' />
											<p>ประมวลผล</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/Import' className='nav-link'>
											<i className='fas fa-cloud-upload-alt nav-icon' />
											<p>นำเข้าข้อมูล</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/NewRequest' className='nav-link'>
											<i className='fas fa-search nav-icon' />
											<p>ค้นหารายหาร</p>
										</Link>
									</li>
								</ul>
							</li>
							{isAdmin ? (
								<>
									<li className='nav-item'>
										<span className='nav-link' style={{ cursor: "context-menu" }}>
											<i className='nav-icon fas fa-cog' />
											<p>ตั้งค่า</p>
											<i className='fas fa-angle-left right' />
										</span>
										<ul className='nav nav-treeview ml-4'>
											<li className='nav-item'>
												<Link to='/ExportManual' className='nav-link'>
													<i className='fas fa-edit nav-icon' />
													<p>ข้อมูลธนาคาร</p>
												</Link>
											</li>

											<li className='nav-item'>
												<Link to='/ExportManual' className='nav-link'>
													<i className='fas fa-tasks nav-icon' />
													<p>ข้อมูลหน่วยงาน</p>
												</Link>
											</li>
											<li className='nav-item'>
												<Link to='/ExportHistory' className='nav-link'>
													<i className='fas fa-user-edit nav-icon' />
													<p>ข้อมูลผู้ใช้</p>
												</Link>
											</li>
											<li className='nav-item'>
												<Link to='/ExportHistory' className='nav-link'>
													<i className='fas fa-tools nav-icon' />
													<p>ตั้งค่า Config</p>
												</Link>
											</li>
											<li className='nav-item'>
												<Link to='/ExportHistory' className='nav-link'>
													<i className='fas fa-info-circle nav-icon' />
													<p>ข่าวสาร</p>
												</Link>
											</li>
										</ul>
									</li>
								</>
							) : (
								""
							)}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	)
}
