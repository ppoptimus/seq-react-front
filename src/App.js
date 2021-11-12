import React, { useState } from "react"
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"

const Navbar = lazy(() => import("./menu/Navbar"))
const Sidebar = lazy(() => import("./menu/Sidebar"))
const Footer = lazy(() => import("./menu/Footer"))
const Dashboard = lazy(() => import("./component/dashboard/GetAllRequest"))
const UploadFile = lazy(() => import("./component/transaction/UploadFile"))
const SaveNewRequest = lazy(() => import("./component/transaction/SaveNewRequest"))
const GetNewRequest = lazy(() => import("./component/transaction/GetNewRequest"))
const ExportManual = lazy(() => import("./component/transaction/ExportManual"))
const ImportFile = lazy(() => import("./component/transaction/ImportFile"))
const ExportHistory = lazy(() => import("./component/transaction/ExportHistory"))

function App() {
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	return (
		<div className='wrapper'>
			<Router>
				{userDetail ? (
					<Suspense
						fallback={
							<div className='spinner-border text-primary' role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
						}>
						<Navbar />
						<Sidebar />
						<div className='content-wrapper p-3'>
							<Switch>
								<Route exact path='/' component={Dashboard} />
								<Route path='/UploadFile' component={UploadFile} />
								<Route path='/SaveNewRequest' component={SaveNewRequest} />
								<Route path='/GetNewRequest' component={GetNewRequest} />
								<Route path='/ExportManual' component={ExportManual} />
								<Route path='/ExportHistory' component={ExportHistory} />
								<Route path='/Import' component={ImportFile} />
							</Switch>
							{/* <UploadFile/> */}
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
