import React, { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function PersonalInfo({ handleChange }) {
	const [birthDate, setBirthDate] = useState(null)
	const [titleItem, setTitleItems] = useState([])
	const config = {
		method: "get",
		url: `${systemConfig.MasterData.getTitleUrl}getTitle/?type=1`,
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
	}, [])

	return (
		<>
			<div className='container align-items-center'>
			<div className='form-row align-items-center'>

				<div className='form-group'>
					<select className='form-control form-control-lg' onChange={handleChange("is_foreigner")}>
					<option value={0}>กรุณาเลือก</option>
						<option value={0}>บุคคลธรรมดาในประเทศ</option>
						<option value={1}>บุคคลธรรมดาต่างประเทศ</option>
					</select>
				</div>
				<div className='form-group ml-2'>
					<select className='form-control form-control-lg' onChange={handleChange("title_code")}>
						<option>คำนำหน้าชื่อ</option>
						{titleItem.map((item) => (
							<option key={item.title_code} value={item.title_code}>
								{item.title_name}
							</option>
						))}
					</select>
				</div>
			</div>
				<div className='form-group'>
					<input className='form-control form-control-lg' maxLength={50} type='text' onChange={handleChange("first_name")} placeholder='ชื่อ' />
				</div>
				<div className='form-group'>
					<input className='form-control form-control-lg' maxLength={50} type='text' onChange={handleChange("last_name")} placeholder='นามสกุล' />
				</div>
				<div className='form-group'>
					<input
						className='form-control form-control-lg'
						maxLength={13}
						type='text'
						onChange={handleChange("refference_id")}
						placeholder='เลขที่บัตรประชาชน'
					/>
				</div>
				<div className='form-group'>
					<DatePicker
						className='form-control form-control-lg w-50'
						onChange={(e) => setBirthDate(e)}
						onSelect={(new Date(), handleChange("birth_date"))}
						selected={birthDate}
						dateFormat='dd/MM/yyyy'
						locale='en-GB'
						placeholderText='วันเกิด'
					/>
				</div>
			</div>
		</>
	)
}
