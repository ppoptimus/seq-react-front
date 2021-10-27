import React, { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"

export default function PersonalInfo2({ handleInputChange }) {
	const [titleItem, setTitleItems] = useState([])
	const config = {
		method: "get",
		url: `${systemConfig.MasterData.getTitleUrl}getTitle/?type=2`,
		headers: systemConfig.MasterData.headersList,
	}

	useEffect(() => {
		axios(config)
			.then(function (response) {
				setTitleItems(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	},[])

	return (
		<>
			<div className='container align-items-center'>
				<div className='form-group'>
					<select className='form-control form-control-lg'>
						{titleItem.map((item) => (
							<option key={item.title_code} value={item.title_code}>
								{item.title_name}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<input className='form-control form-control-lg' type='text' placeholder='ชื่อ' />
				</div>
				<div className='form-group'>
					<input className='form-control form-control-lg' type='text' placeholder='นามสกุล' />
				</div>
			</div>
		</>
	)
}
