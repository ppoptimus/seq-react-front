import React from "react"
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const Navbar = lazy(() => import("./menu/Navbar"))
const Sidebar = lazy(() => import("./menu/Sidebar"))
const Footer = lazy(() => import("./menu/Footer"))
const Dashboard = lazy(() => import("./component/Dashboard"))
const UploadFile = lazy(() => import("./component/UploadFile"))
const NewRequest = lazy(() => import("./component/NewRequest"))

function App() {
	return (
		<>
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<div className='wrapper'>
						<Navbar />
						<Sidebar />
						<Switch>
							<Route exact path='/Dashboard' component={Dashboard} />
							<Route exact path='/UploadFile' component={UploadFile} />
							<Route exact path='/NewRequest' component={NewRequest} />
						</Switch>
						<Footer />
					</div>
				</Suspense>
			</Router>
		</>
	)
}

export default App
