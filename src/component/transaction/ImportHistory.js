import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import Swal from "sweetalert2"
import UserDetail from '../../UserDetail'

export default function ImportHistory() {
  const [userDetail] = useState(UserDetail)
  const [importHistory, setImportHistory] = useState([])
  useEffect(() => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getImportHistory`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: null,
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
	}, [importHistory],[userDetail])
  return (
    <div>
      <div className='card'>
				<div className='card-body'>
          <table className='table'>
            <thead>
              <tr>
                <th>เลขที่ชุด</th>
                <th>เลขที่หนังสือ</th>
                <th>วันที่หนังสือ</th>
                <th>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
    </div>
  )
}
