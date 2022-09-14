import React from 'react'
import systemConfig from "../../config.json"
import UserDetail from "../../UserDetail"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

export default function ConfigNews() {
	const [userDetail] = useState(UserDetail)
	const [news, setNews] = useState([])
	const [header, setHeader] = useState("")
	const [detail, setDetail] = useState("")

	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getMasterNews`,
			headers: systemConfig.MasterData.headersList,
		}
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					console.log(res.data[0])
					setNews(res.data[0])
					setDetail(res.data[0].news_description)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [])

	const ondetailChange = (e) => {
		console.log(e.target.value)
		setDetail(e.target.value)
	}

	
	const onSubmit = () => {

		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}newsManagement`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				news_status: 1,
				news_description: detail,
				user_name: userDetail.username,
			},
		}

		axios.request(reqOptions)
			.then((res) => {
				console.log(res.data)
				if (res.status === 200) {
					Swal.fire({
						title: "บันทึกสำเร็จ",
						icon: "success",
						confirmButtonColor: "#119516",
						confirmButtonText: "ตกลง",
					}).then((result) => {
						if (result.isConfirmed) {

						}
					})
				}
			})
			.catch((err) => {
				console.log(err)
				Swal.fire({
					icon: "error",
					title: "ผลการบันทึก",
					text: "บันทึกไม่สำเร็จ \n" + err,
				})
			})
	}

	return (
		<>
			<div className='card flex-column'>
				<div className='card-header bg-teal'>บันทึกการแจ้งข้อมูลข่าวสาร</div>
				<div className='card-body'>
					<form>
						<div className='form-group row'>
							<label htmlFor='inputTitle' className='col-2 col-form-label'>
								หัวข้อข่าวสาร
							</label>
							<div className='col-10'>
								<input type='text' maxLength={100} className='form-control' id='inputTitle' />
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='inptuDetail' className='col-2 col-form-label'>
								รายละเอียด
							</label>
							<div className='col-10'>
								<textarea
									type='text'
									rows={2}
									maxLength={1000}
									className='form-control'
									id='inptuDetail'
									value={!!detail ? detail : ""}
									onChange={(e) => ondetailChange(e)}
								/>
							</div>
						</div>
					</form>
				</div>
				<div className='card-footer'>
					<button className='btn btn-primary px-4' onClick={onSubmit}>บันทึก</button>
				</div>
			</div>
		</>
	)
}
