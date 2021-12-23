import React, { useState } from "react"
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Waiting from "./component/options/Waiting"
import Login from "./Login"
import UserDetail from './UserDetail'

const Navbar = lazy(() => import("./menu/Navbar"))
const Sidebar = lazy(() => import("./menu/Sidebar"))
const Sidebar2 = lazy(() => import("./menu/SideBar2"))
const Footer = lazy(() => import("./menu/Footer"))
const Dashboard = lazy(() => import("./component/dashboard/GetAllRequest"))
const SaveNewRequest = lazy(() => import("./component/transaction/SaveNewRequest"))
const GetNewRequest = lazy(() => import("./component/transaction/GetNewRequest"))
const ExportManual = lazy(() => import("./component/transaction/ExportManual"))
const ExportHistory = lazy(() => import("./component/transaction/ExportHistory"))
const ImportFile = lazy(() => import("./component/transaction/ImportFile"))
const ImportHistory = lazy(() => import("./component/transaction/ImportHistory"))

const MasterBank = lazy(() => import("./component/configData/MasterBank"))
const MasterDepartment = lazy(() => import("./component/configData/MasterDepartment"))
const MasterUser = lazy(() => import("./component/configData/MasterUser"))
const ConfigRequest = lazy(() => import("./component/configData/ConfigRequest"))
const ConfigNews = lazy(() => import("./component/configData/ConfigNews"))

function App() {
	const [userDetail] = useState(UserDetail)
	return (
		<div className='wrapper'>
			<Router>
				{userDetail ? (
					<Suspense
						fallback={
							// <div className='spinner-border text-purple text-lg' role='banner'>
							// 	<span className='sr-only'>Loading...</span>
							// </div>
							<Waiting/>
						}>
						<Navbar />
						<Sidebar2 />
						<div className='content-wrapper p-3'>
							<Switch>
								<Route exact path='/' component={Dashboard} />
								<Route path='/SaveNewRequest' component={SaveNewRequest} />
								<Route path='/GetNewRequest' component={GetNewRequest} />
								<Route path='/ExportManual' component={ExportManual} />
								<Route path='/ExportHistory' component={ExportHistory} />
								<Route path='/Import' component={ImportFile} />
								<Route path='/ImportHistory' component={ImportHistory} />

								<Route path='/MasterBank' component={MasterBank} />
								<Route path='/MasterDepartment' component={MasterDepartment} />
								<Route path='/MasterUser' component={MasterUser} />
								<Route path='/ConfigRequest' component={ConfigRequest} />
								<Route path='/ConfigNews' component={ConfigNews} />
							</Switch>
						
							<Footer />
						</div>
					</Suspense>
				) : (
					<Login />
				)}
			</Router>
		</div>
	)
}

export default App
