import React from "react"
import '../../css/Waing.css'

export default function Waiting() {
	return (
		<>
			<div className='container1'>
				<div className='loader'>
					<div className='rocket'>
						<i className='fas fa-rocket' />
						<i className='fas fa-cloud' />
						<i className='fas fa-cloud' />
						<i className='fas fa-cloud' />
						<i className='fas fa-cloud' />
					</div>
					<span>
						<i />
					</span>
				</div>
			</div>
		</>
	)
}
