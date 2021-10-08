import React from "react"

export default function Sidebar() {
	return (
		<div>
			<aside className='main-sidebar sidebar-dark-primary elevation-4 vh-100'>
				{/* Brand Logo */}
				<a href='index3.html' className='brand-link'>
					<img src='dist/img/logo.png' alt='sequester' className='brand-image img-circle elevation-3' style={{ opacity: ".8" }} />
					<span className='brand-text font-weight-light'>SEQUESTER</span>
				</a>
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
								<a href='#' className='nav-link active'>
									<i className='nav-icon fas fa-tachometer-alt' />
									<p>
										Dashboard
									</p>
								</a>
							</li>
							<li className='nav-item'>
								<a href='pages/widgets.html' className='nav-link'>
									<i className='nav-icon fas fa-th' />
									<p>
										New Request
										<span className='right badge badge-danger'>New</span>
									</p>
								</a>
							</li>
							<li className='nav-item'>
								<a href='#' className='nav-link'>
									<i className='nav-icon fas fa-copy' />
									<p>
										Save Document set
									</p>
								</a>
								
							</li>
							<li className='nav-item'>
								<a href='#' className='nav-link'>
									<i className='nav-icon fas fa-chart-pie' />
									<p>
										Export File
									</p>
								</a>
								
							</li>
							<li className='nav-item'>
								<a href='#' className='nav-link'>
									<i className='nav-icon fas fa-tree' />
									<p>
										Import File
									</p>
								</a>
							</li>
							<li className='nav-item'>
								<a href='#' className='nav-link'>
									<i className='nav-icon fas fa-edit' />
									<p>
										Master Data
										<i className='fas fa-angle-left right' />
									</p>
								</a>
								<ul className='nav nav-treeview'>
									<li className='nav-item'>
										<a href='pages/forms/general.html' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master User</p>
										</a>
									</li>
									<li className='nav-item'>
										<a href='pages/forms/advanced.html' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master UserLevel</p>
										</a>
									</li>
									<li className='nav-item'>
										<a href='pages/forms/editors.html' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Department</p>
										</a>
									</li>
									<li className='nav-item'>
										<a href='pages/forms/validation.html' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Bank</p>
										</a>
									</li>
									<li className='nav-item'>
										<a href='pages/forms/validation.html' className='nav-link'>
											<i className='far fa-circle nav-icon' />
											<p>Master Title</p>
										</a>
									</li>
								
								</ul>
							</li>
							<li className='nav-item'>
								<a href='#' className='nav-link'>
									<i className='nav-icon fas fa-table' />
									<p>
										System Config
									</p>
								</a>
								
							</li>
							
						</ul>
					</nav>
					{/* /.sidebar-menu */}
				</div>
				{/* /.sidebar */}
			</aside>
		</div>
	)
}
