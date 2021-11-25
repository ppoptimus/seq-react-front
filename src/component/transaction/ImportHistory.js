import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import Swal from "sweetalert2"
import UserDetail from "../../UserDetail"

export default function ImportHistory() {
	const [userDetail] = useState(UserDetail)
	const [importHistory, setImportHistory] = useState([])

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
		console.log(e)
		getImportDetail(e)
	}

	const getImportDetail = (request_code) => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getImportHistoryDetail`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code : request_code,
				user_name: userDetail.username,
				ip_address: "",
			},
		}
		axios(config)
		.then((res) => {
			console.log(res.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}
	return (
		<div>
			<div className='card'>
				<div className='card-body'>
					<table className='table text-center'>
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
										<tr key={i.request_code}>
											<td>{i.request_code}</td>
											<td>{i.document_set}</td>
											<td>{i.import_date}</td>
											<td>
												<button
													className='btn btn-info shadow-sm'
													data-toggle='modal'
													data-target='#historyDetail'
													onClick={() => onClickRow(i.request_code)}>
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
		</div>
	)
}
