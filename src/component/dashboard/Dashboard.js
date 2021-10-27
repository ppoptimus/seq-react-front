import React from "react"
import GetAllRequest from "./GetAllRequest"

export default function Dashboard(userDetail) {
	return (
		<div>
			
					<GetAllRequest userDetail={userDetail} />
			
		</div>
	)
}
