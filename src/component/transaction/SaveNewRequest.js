import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import systemConfig from '../../config.json'
import PersonalInfo from '../formStep/Step1PersonalInfo'
import PersonalInfo2 from '../formStep/Step1PersonalInfo2'
import ContactInfo from '../formStep/Step2ContactInfo'
import UserDetail from '../../UserDetail'

export default function NewRequest() {
	let history = useHistory()
	const [isPerson, setIsPerson] = useState(true)

	const [userDetail] = useState(UserDetail)

	const [newRequestValue, setNewRequestValue] = useState({
		document_no: null,
		document_date: formatDate(new Date()),
		employer_account: null,
		refference_id: null,
		personal_type: '1',
		is_foreigner: null,
		title_code: null,
		first_name: null,
		last_name: null,
		company_name: null,
		birth_date: null,
		address: null,
		remark: null,
		department_code: userDetail.department_code,
		create_by: userDetail.username,
		ip_address: null,
		is_confirm: 0,
	})
	const [step, setStep] = useState(1)

	const nextStep = () => {
		if (step < 2) {
			setStep(step + 1)
		} else if (step === 2) {
			postNewRequest()
		}
	}

	const prevStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	const handleInputChange = (name) => (e) => {
		if (name === 'birth_date' || name === 'document_date') {
			e = formatDate(e)
			setNewRequestValue({ ...newRequestValue, [name]: e })
		} else {
			if (name === 'personal_type') {
				setIsPerson(e.target.value === '1' ? true : false)
			}
			setNewRequestValue({ ...newRequestValue, [name]: e.target.value })
		}
	}

	const postNewRequest = () => {
		let reqOptions = {
			url: `${systemConfig.MasterData.getTitleUrl}saveNewRequest`,
			method: 'POST',
			headers: systemConfig.MasterData.headersList,
			data: newRequestValue,
		}

		axios
			.request(reqOptions)
			.then((res) => {
				console.log(res.status)
				if (res.status === 204) {
					Swal.fire({
						title: 'บันทึกสำเร็จ',
						icon: 'success',
						confirmButtonColor: '#119516',
						confirmButtonText: 'ตกลง',
					}).then((result) => {
						if (result.isConfirmed) {
							history.push('/GetNewRequest')
						}
					})
				}

				if (res.data.result === 'exists') {
					Swal.fire({
						title: 'ผลการบันทึก',
						text: 'รายการนี้เคยมีการบันทึกไปแล้ว คุณต้องการบันทึกซ้ำหรือไม่',
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#119516',
						cancelButtonColor: '#d33',
						confirmButtonText: 'ตกลง',
						cancelButtonText: 'ไม่บันทึก',
					}).then((result) => {
						if (result.isConfirmed) {
							newRequestValue.is_confirm = 1
							postNewRequest()
						}
					})
				}
			})
			.catch((err) => {
				console.log(err)
				Swal.fire({
					icon: 'error',
					title: 'ผลการบันทึก',
					text: 'บันทึกไม่สำเร็จ \n' + err,
				})
			})
	}

	return (
		<>
			<div className='card flex-column pb-3'>
				<div className='card-header bg-teal mb-3'>บันทึกรายการใหม่</div>
				<div className='container'>
					<div className='form-group'>
						<p className='h5'>วันที่ทำเอกสาร : {getShowDateFormat()} </p>
					</div>
					<div className='form-row align-items-center mt-3'>
						<div className='form-group mr-2'>
							<input className='form-control form-control-lg' type='text' maxLength={20} placeholder='เลขที่หนังสือ' onChange={handleInputChange('document_no')} required></input>
						</div>
						<div className='form-group mr-2'>
							<input className='form-control form-control-lg' type='text' maxLength={10} placeholder='เลขบัญชีนายจ้าง' onChange={handleInputChange('employer_account')}></input>
						</div>
						<div className='form-group'>
							<select className='form-control form-control-lg' onChange={handleInputChange('personal_type')}>
								<option value={1}>บุคคลธรรมดา</option>
								<option value={2}>นิติบุคคล</option>
							</select>
						</div>
					</div>

					{isPerson
						? {
								1: <PersonalInfo handleInputChange={handleInputChange} />,
								2: <ContactInfo handleInputChange={handleInputChange} />,
						  }[step]
						: {
								1: <PersonalInfo2 handleInputChange={handleInputChange} />,
								2: <ContactInfo handleInputChange={handleInputChange} />,
						  }[step]}

				</div>
			</div>
					<div className='d-flex justify-content-start'>
						{step > 1 ? (
							<button className='btn btn-lg btn-warning px-4 mr-2' onClick={prevStep}>
								ย้อนกลับ
							</button>
						) : null}
						<button className='btn btn-lg btn-primary px-4' onClick={nextStep}>
							{step === 2 ? 'บันทึก' : 'ถัดไป'}
						</button>
					</div>
		</>
	)
}

const formatDate = (e) => {
	e = new Date(e)
	let dd = String(e.getDate()).padStart(2, '0')
	let mm = String(e.getMonth() + 1).padStart(2, '0')
	let yyyy = e.getFullYear()
	e = dd + '/' + mm + '/' + yyyy

	return e
}

const getShowDateFormat = () => {
	let dateNow = new Date()
	let date = dateNow.getDate()
	let month = dateNow.getMonth()
	let year = dateNow.getFullYear() + 543
	let monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

	return date + ' ' + monthNames[month] + ' ' + year
}
