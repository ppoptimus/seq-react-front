import React from "react"
import Dashboard from "./component/Dashboard"
import Footer from "./menu/Footer"
import Navbar from "./menu/Navbar"
import Sidebar from "./menu/Sidebar"

function App() {
	return (
		<>
			<div>
				<Sidebar />

				<Navbar />
				<Dashboard />
				<Footer />
			</div>
		</>
	)
}

export default App
