import { useEffect, useState } from "react"
import systemConfig from "../config.json"
import axios from "axios"

export default function GetExportHistory(request_code, user_name) {
	const [data, setData] = useState([])
	useEffect(() => {
		const config = {
			method: "post",
			url: `${systemConfig.MasterData.getTitleUrl}getExporttHistory`,
			headers: systemConfig.MasterData.headersList,
			data: {
				request_code: request_code,
				user_name: user_name,
				ip_address: "",
			},
		}

		axios(config)
			.then(function (response) {
				setData(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])
	return data;
}
