import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
	return (
		<>
			<aside className='main-sidebar sidebar-dark-primary elevation-4 vh-100'>
				{/* Brand Logo */}
				<Link to='/' className='brand-link'>
					<img src='dist/img/logo.png' alt='sequester' className='brand-image img-circle elevation-3' style={{ opacity: ".8" }} />
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
									<i className='fas fa-search fa-fw' />
								</button>
							</div>
						</div>
					</div>
					{/* Sidebar Menu */}
					<nav className='mt-2'>
						<ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
							<li className='nav-item menu-open'>
								<Link to='/' className='nav-link active'>
									<i className='nav-icon fas fa-tachometer-alt' />
									<p>
										Dashboard
									</p>
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-th' />
									<p>
										New Request
										<span className='right badge badge-danger'>New</span>
									</p>
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-copy' />
									<p>
										Save Document set
									</p>
								</Link>
								
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-chart-pie' />
									<p>
										Export File
									</p>
								</Link>
								
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-tree' />
									<p>
										Import File
									</p>
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-edit' />
									<p>
										Master Data
										<i className='fas fa-angle-left right' />
									</p>
								</Link>
								<ul className='nav nav-treeview'>
									<li className='nav-item'>
										<Link to='/' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master User</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master UserLevel</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Department</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Bank</p>
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Title</p>
										</Link>
									</li>
								
								</ul>
							</li>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='nav-icon fas fa-table' />
									<p>
										System Config
									</p>
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
