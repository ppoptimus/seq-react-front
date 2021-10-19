import React from "react"
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Test from "./Test"

const Navbar = lazy(() => import("./menu/Navbar"))
const Sidebar = lazy(() => import("./menu/Sidebar"))
const Footer = lazy(() => import("./menu/Footer"))
const Dashboard = lazy(() => import("./component/Dashboard"))
const UploadFile = lazy(() => import("./component/UploadFile"))
const SaveNewRequest = lazy(() => import("./component/SaveNewRequest"))
const GetNewRequest = lazy(() => import("./component/GetNewRequest"))

function App() {
	return (
		<>
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Navbar />
					<Sidebar />
					<div className='content-wrapper p-3'>
						<Switch>
							<Route exact path='/Dashboard' component={Dashboard} />
							<Route exact path='/UploadFile' component={UploadFile} />
							<Route exact path='/SaveNewRequest' component={SaveNewRequest} />
							<Route exact path='/GetNewRequest' component={GetNewRequest} />
						</Switch>
						<Test/>
						<Footer />
					</div>
				</Suspense>
			</Router>
		</>
	)
}

export default App
