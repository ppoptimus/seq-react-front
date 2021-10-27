import React, {useState} from "react"
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./component/Login"

const Navbar = lazy(() => import("./menu/Navbar"))
const Sidebar = lazy(() => import("./menu/Sidebar"))
const Footer = lazy(() => import("./menu/Footer"))
const Dashboard = lazy(() => import("./component/dashboard/Dashboard"))
const UploadFile = lazy(() => import("./component/UploadFile"))
const SaveNewRequest = lazy(() => import("./component/SaveNewRequest"))
const GetNewRequest = lazy(() => import("./component/GetNewRequest"))

function App() {
	const [userDetail, setUserDetail] = useState(() => {
    const userData = localStorage.getItem('userDetail')
    if(userData) {
      return JSON.parse(userData);
    }
    else{
      return null;
    }
  })
	return (
		<>
			<Router>
				{userDetail ? (<Suspense fallback={<div>Loading...</div>}>
					<Navbar />
					<Sidebar />
					<div className='content-wrapper p-3'>
						<Switch>
							<Route exact path='/' component={Dashboard} userDetail = {userDetail} />
							<Route exact path='/UploadFile' component={UploadFile} />
							<Route exact path='/SaveNewRequest' component={SaveNewRequest} />
							<Route exact path='/GetNewRequest' component={GetNewRequest} />
						</Switch>
						<Footer />
					</div>
				</Suspense>) : (<Login/>)}
				
			</Router>
		</>
	)
}

export default App
