import { useEffect, useState } from "react"
import systemConfig from "../../config.json"
import axios from "axios"
import Swal from "sweetalert2"

export default function ConfigRequest() {
	const [dataConfig, setDataConfig] = useState([])
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(0)

	useEffect(() => {
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getMasterConfig`,
			headers: systemConfig.MasterData.headersList,
		}
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					setDataConfig(res.data[0])
					setMinValue(res.data[0].config_min_value)
					setMaxValue(res.data[0].config_max_value)
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [])

	const onMinChange = (e) => {
		setMinValue(e.target.value)
		console.log(e.target.value)
	}

	const onMaxChange = (e) => {
		setMaxValue(e.target.value)
		console.log(e.target.value)
	}

	const onSubmit = () => {
		console.log(minValue, ",", maxValue)
		console.log(dataConfig.config_min_value)

		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}configManagement`,
			method: "POST",
			headers: systemConfig.MasterData.headersList,
			data: {
				min_value: minValue,
				max_value: maxValue,
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
			<div className='card'>
				<div className='card-header bg-teal justify-content-between'>
					<h3 className='card-title'>ตั้งค่า Config จำนวนรายการตรวจสอบ</h3>
				</div>
				<div className='card-body'>
					<form>
						<div className='form-group row'>
							<label htmlFor='min' className='col-3 col-form-label'>
								จำนวนรายการตวจสอบไม่น้อยกว่า
							</label>
							<div className='col-2'>
								<input
									type='number'
									className='form-control'
									id='min'
									value={!!minValue ? minValue : 0}
									onChange={(e) => onMinChange(e)}></input>
							</div>
							<label htmlFor='min' className='col-3 col-form-label'>
								รายการ
							</label>
						</div>
						<div className='form-group row'>
							<label htmlFor='max' className='col-3 col-form-label'>
								และไม่เกิน
							</label>
							<div className='col-2'>
								<input
									type='number'
									className='form-control'
									id='max'
									value={!!maxValue ? maxValue : 0}
									onChange={(e) => onMaxChange(e)}></input>
							</div>
							<label htmlFor='max' className='col-3 col-form-label'>
								รายการ
							</label>
						</div>
					</form>
				</div>
				<div className='card-footer'>
					<button className='btn btn-primary px-4' onClick={onSubmit}>
						บันทึก
					</button>
				</div>
			</div>
		</>
	)
}
