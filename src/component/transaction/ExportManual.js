import React, { useEffect, useState, lazy } from 'react'
import Swal from 'sweetalert2'
import systemConfig from '../../config.json'
import axios from 'axios'

const ExportHistory = lazy(() => import("./ExportHistory"))

export default function ExportManual() {
	const [totalCount, settotalCount] = useState(0)
	const [data, setData] = useState([])
	useEffect(() => {
		const config = {
			method: 'get',
			url: `${systemConfig.MasterData.getTitleUrl}getWaitingGenerate`,
			headers: systemConfig.MasterData.headersList,
		}
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					setData(res.data)
					settotalCount(res.data.total_count)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [data])

	const onSubmitGenerate = () => {
		const config = {
			method: 'get',
			url: `${systemConfig.MasterData.getTitleUrl}autoGenerateCode`,
			headers: systemConfig.MasterData.headersList,
		}

		axios(config)
			.then(function (res) {
				console.log(res)
				onSubmited('success')
			})
			.catch(function (err) {
				console.log(err)
				onSubmited(err)
			})
	}

	return (
		<>
			<div className='card flex-column'>
				<div className='card-header bg-purple'>ส่งออกไฟล์เพื่อขอตรวจสอบ</div>
				{totalCount ? (
					<>
						<div className='card-body'>
							<div className='form-group row'>
								<label className='col-form-label col-2 text-right' htmlFor='request_code'>
									ชุดหนังสือ
								</label>
								<input type='text' className='form-control form-control-lg col-2' value={data.request_code} id='request_code' readOnly />
							</div>
							<div className='form-group row'>
								<label className='col-form-label col-2 text-right' htmlFor='total_count'>
									จำนวน
								</label>
								<input type='text' className='form-control form-control-lg col-2' value={data.total_count} id='total_count' readOnly />
								<label className='col-form-label col-2' htmlFor='total_count'>
									รายการ
								</label>
							</div>
						</div>
						<div className='card-footer'>
							<button className='btn btn-primary px-4' onClick={onSubmitGenerate}>
								สร้าง
							</button>
						</div>
					</>
				) : (
					<div className='container py-3'>ไม่มีรายการใหม่</div>
				)}
			</div>
			<ExportHistory/>
		</>
	)
}
const onSubmited = (result) => {
	if (result === 'success') {
		Swal.fire({
			title: 'สร้างเลขชุดหนังสือสำเร็จ',
			icon: 'success',
			confirmButtonColor: '#119516',
			confirmButtonText: 'ตกลง',
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	} else {
		Swal.fire({
			title: 'สร้างเลขชุดหนังสือไม่สำเร็จ!!',
			text: result,
			icon: 'error',
			confirmButtonColor: '#9c1e1e',
			confirmButtonText: 'ตกลง',
		}).then((result) => {
			if (result.isConfirmed) {
				refreshPage()
			}
		})
	}
}

const refreshPage = () => {
	window.location.reload(false)
}
