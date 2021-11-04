import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"

export default function ExportHistory() {
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	const [data, setData] = useState([])
	const [bindData, setBindData] = useState([])
	useEffect(() => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getExporttHistory`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: null,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		let isMounted = true
		axios(config)
			.then(function (response) {
				if (isMounted) {
					setData(response.data)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [userDetail])

	const onClickRow = (i) => {
		setBindData(i)
	}
	const onHandleChange = () => {
		console.log(bindData)
	}
	return (
		<>
			<div className='card'>
				<div className='card-header bg-purple'>
					<h3 className='card-title'>ประวัติการส่งออกไฟล์เพื่อขอตรวจสอบบัญชีเงินฝาก</h3>
					<div className='card-tools'>
						<button
							type='button'
							className='btn btn-tool'
							data-card-widget='card-refresh'
							data-source='widgets.html'
							data-source-selector='#card-refresh-content'>
							<i className='fas fa-sync-alt' />
						</button>
					</div>
				</div>
				<div className='card-body flex-column text-center'>
					<div className='form-group text-center align-item-center'>
						<label className='col-form-label col2'>ชุดหนังสือ</label>
						<input className='form-control-lg col-4 mx-2'></input>
						<button className='btn-lg btn-primary'>ค้นหา</button>
					</div>
				</div>
			</div>

			<div className='card'>
				<div className='card-body'>
					<table className='table'>
						<thead>
							<tr>
								<th>เลขที่ชุด</th>
								<th>เลขที่หนังสือ</th>
								<th>วันที่หนังสือ</th>
								<th>วันเวลาที่ส่งออก</th>
								<th>รายการ</th>
							</tr>
						</thead>
						<tbody>
							{data
								? data.map((i) => (
										<tr key={i.request_code}>
											<td className='text-primary'>
												<span style={{ cursor: "pointer" }} data-toggle='modal' data-target='#popupEdit' onClick={() => onClickRow(i)}>
													{i.request_code}
												</span>
											</td>
											<td>{i.document_set_no}</td>
											<td>{i.document_set_date}</td>
											<td>{i.export_date}</td>
											<td>
												<button className='btn btn-info shadow-sm'>
													<i className='fas fa-list'></i>
												</button>
											</td>
										</tr>
								  ))
								: ""}
						</tbody>
					</table>
				</div>
			</div>
			{data.map((i) => (
				<div
					className='modal fade shadow-lg'
					id='popupEdit'
					data-backdrop='static'
					data-keyboard='false'
					tabIndex={-1}
					aria-labelledby='popupEditLabel'
					aria-hidden='true'
					key={i.request_code}>
					<div className='modal-dialog w-auto' style={{ maxWidth: "570px" }}>
						<div className='modal-content'>
							<div className='modal-body pt-5'>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>ชุดหนังสือ</label>
									<input
										readOnly
										type='text'
										className='form-control form-control-lg col-5'
										value={bindData.request_code ? bindData.request_code : ""}
										onChange={onHandleChange}
									/>
								</div>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>วันที่ประมวลผล</label>
									<input
										readOnly
										type='text'
										className='form-control form-control-lg col-5'
										value={bindData.export_date ? bindData.export_date : ""}
										onChange={onHandleChange}
									/>
								</div>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>เลขที่หนังสือ</label>
									<input type='text' className='form-control form-control-lg col-5' value='รง0625/ว.0' onChange={onHandleChange} />
								</div>
								<div className='form-group row justify-content-center align-items-center'>
									<label className='col-form-label col-4 text-right'>วันที่หนังสือ</label>
									<input
										type='date'
										className='form-control form-control-lg col-5 text-md'
										required
										pattern='dd/MM/yyyy'
										onChange={(e) => console.log(e.target.value)}
									/>
								</div>

								<button className='btn bg-gradient-white my-2'>
									สามารถดาวน์โหลดไฟล์ได้ที่นี่ {"  "}
									<i className='fas fa-download text-fuchsia' />
								</button>
								<button className='btn bg-gradient-white'>
								ทำการส่งออกไฟล์เรียบร้อย สามารถดาวน์โหลดไฟล์ เพื่อส่งธนาคารได้ที่นี่ {"  "}
									<i className='fas fa-download text-fuchsia' />
								</button>
							</div>
							
							<div className='modal-footer'>
								<div className='form-group'>
									<button type='button' className='btn btn-success mr-3 px-4'>
										บันทึก
									</button>
									<button type='button' className='btn btn-secondary' data-dismiss='modal'>
										ย้อนกลับ
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
