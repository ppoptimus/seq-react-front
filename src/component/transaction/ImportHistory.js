import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import UserDetail from "../../UserDetail"

export default function ImportHistory() {
	const [userDetail] = useState(UserDetail)
	const [importHistory, setImportHistory] = useState([])
	const [importHistoryDetail, setImportHistoryDetail] = useState([])
	const [requestCode, getRequestCode] = useState(null)

	useEffect(
		() => {
			const config = {
				method: "post",
				url: `${systemConfig.MasterData.getTitleUrl}getImportHistory`,
				headers: systemConfig.MasterData.headersList,
				data: {
					user_name: userDetail.username,
					ip_address: "",
				},
			}
			let isMounted = true
			axios(config)
				.then(function (res) {
					if (isMounted) {
						setImportHistory(res.data)
					}
				})
				.catch(function (error) {
					console.log(error)
				})
			return () => {
				isMounted = false
			}
		},
		[importHistory],
		[userDetail],
	)

	const onClickRow = (e) => {
		getImportDetail(e)
	}

	const getImportDetail = (request_code) => {
		getRequestCode(request_code)
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getImportHistoryDetail`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: request_code,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		axios(config)
			.then((res) => {
				setImportHistoryDetail(res.data)
				console.log(res.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div>
			<div className='card'>
			<div className='card-header bg-teal'>
					<h3 className='card-title'>ประวัติการนำเข้าผลตรวจสอบบัญชีเงินฝากธนาคาร</h3>
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
				<div className='card-body'>
					<table className='table text-center table-hover'>
						<thead>
							<tr>
								<th>เลขที่ชุด</th>
								<th>เลขที่หนังสือ</th>
								<th>วันที่หนังสือ</th>
								<th>รายละเอียด</th>
							</tr>
						</thead>
						<tbody>
							{importHistory
								? importHistory.map((i) => (
										<tr
											key={i.request_code}
											style={{ cursor: "context-menu" }}
											>
											<td>{i.request_code}</td>
											<td>{i.document_set}</td>
											<td>{i.import_date}</td>
											<td>
												<button
													className='btn btn-teal shadow-sm'
													onClick={() => onClickRow(i.request_code)}
													data-toggle='modal'
													data-target='#exampleModal'>
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
			{requestCode ? (
				<div className='modal fade' id='exampleModal' tabIndex={-1} role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>{requestCode}</div>
							<div className='modal-body'>
								{importHistoryDetail
									? importHistoryDetail.map((i) => (
											<div key={i.bank_code}>
												{i.bank_code} | {i.bank_name}
											</div>
									  ))
									: ""}
							</div>
							<div className='modal-footer'>footer</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	)
}
