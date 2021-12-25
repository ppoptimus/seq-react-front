import React, { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"

export default function PersonalInfo2({ handleInputChange }) {
	const [titleItem, setTitleItems] = useState([])
	
	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getTitle/?type=2`,
			headers: systemConfig.MasterData.headersList,
		}
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
			<div className='form-row'>
				<div className='form-group mr-2'>
					<select className='form-control form-control-lg' onChange={handleInputChange("title_code")}>
					<option>ประเภทธุรกิจ</option>
						{titleItem.map((item) => (
							<option key={item.title_code} value={item.title_code}>
								{item.title_name}
							</option>
						))}
					</select>
				</div>
				<div className='form-group mr-1'>
					<input
						className='form-control form-control-lg'
						type='text'
						maxLength={13}
						onChange={handleInputChange("refference_id")}
						placeholder='เลขทะเบียนพานิชย์'
					/>
				</div>
				<div className='form-group col-6'>
					<input className='form-control form-control-lg' type='text' maxLength={255} placeholder='ชื่อสถานประกอบการ' onChange={handleInputChange("company_name")} />
				</div>
			</div>
		</>
	)
}
