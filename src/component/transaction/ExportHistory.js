import { useState } from "react"
import GetExportHistory from "../../api/getExporttHistory"

export default function ExportHistory() {
	const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
	const data = GetExportHistory(null, userDetail.username)
	console.log(data)
	return (
		<>
			<div className='container'>
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
							<label className='col-form-label col2' htmlFor='requestCode'>
								ชุดหนังสือ
							</label>
							<input className='form-control-lg col-5 mx-2' id='requestCode'></input>
							<button className='btn-lg btn-secondary shadow-none'>ค้นหา</button>
						</div>
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
												<span style={{ cursor: "pointer" }} data-toggle='modal' data-target='#popupEdit'>
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
			<div
				className='modal fade'
				id='popupEdit'
				// data-backdrop='static'
				data-keyboard='false'
				tabIndex={-1}
				aria-labelledby='popupEditLabel'
				aria-hidden='true'>
				<div className='modal-dialog' style={{ maxWidth: "500px" }}>
					<div className='modal-content py-4'>
						<div className='form-group row justify-content-center align-items-center'>
							<label className='col-form-label col-3 text-right' htmlFor='request_code'>
								ชุดหนังสือ
							</label>
							<input type='text' className='form-control form-control-lg col-5' id='request_code' />
						</div>
						<div className='form-group row justify-content-center align-items-center'>
							<label className='col-form-label col-3 text-right' htmlFor='request_code'>
								วันที่ประมวลผล
							</label>
							<input type='text' className='form-control form-control-lg col-5 text-md' />
						</div>
						<div className='form-group row justify-content-center align-items-center'>
							<label className='col-form-label col-3 text-right' htmlFor='request_code'>
								เลขที่หนังสือ
							</label>
							<input type='text' className='form-control form-control-lg col-5' id='request_code' />
						</div>
						<div className='form-group row justify-content-center align-items-center'>
							<label className='col-form-label col-3 text-right' htmlFor='request_code'>
								วันที่ประมวลผล
							</label>
							<input
								type='date'
								className='form-control form-control-lg col-5 text-md'
								required
								pattern='dd/MM/yyyy'
								onChange={(e) => console.log(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label className='form-control form-control'>xxxx</label>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
