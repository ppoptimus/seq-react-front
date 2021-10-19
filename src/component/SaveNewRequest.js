import React, { useState } from "react"

import PersonalInfo from "./formStep/Step1PersonalInfo"
import PersonalInfo2 from "./formStep/Step1PersonalInfo2"
import ContactInfo from "./formStep/Step2ContactInfo"

export default function NewRequest() {
	const [isPerson, setIsPerson] = useState(true)

	const [values, setValues] = useState({
		document_no: null,
		document_date: null,
		employer_account: null,
		refference_id: null,
		personal_type: "1",
		is_foreigner: null,
		title_code: null,
		first_name: null,
		last_name: null,
		company_name: null,
		birth_date: null,
		address: null,
		remark: null,
		department_code: null,
		create_by: null,
		ip_address: null,
		is_confirm: 0,
	})
	const [step, setStep] = useState(1)

	const nextStep = () => {
		if (step < 2) {
			setStep(step + 1)
		} else if (step === 2) {
			console.log(values)
		}
	}

	const prevStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	const handleChange = (name) => (e) => {
		if (name === "birth_date" || name === "document_date") {
			e = formatDate(e)
			setValues({ ...values, [name]: e })
		} else {
			if (name === "personal_type") {
				setIsPerson(e.target.value === "1" ? true : false)
			}
			setValues({ ...values, [name]: e.target.value })
		}
		console.log(isPerson)
	}

	return (
		<>
			<div className='bg-light vh-100'>
				<div className='container justify-content-center align-items-center'>
					<div className='form-row align-items-center mt-3'>
						<div className='form-group ml-1'>
							<input
								className='form-control form-control-lg'
								type='text'
								maxLength={20}
								placeholder='เลขที่หนังสือ'
								onChange={handleChange("document_no")}></input>
						</div>
						<div className='form-group ml-1'>
							<input
								className='form-control form-control-lg'
								type='text'
								maxLength={10}
								placeholder='เลขบัญชีนายจ้าง'
								onChange={handleChange("employer_account")}></input>
						</div>
						<div className='form-group ml-1'>
							<select className='form-control form-control-lg' onChange={(handleChange("personal_type"))}>
								{/* <option className='text-bold'>เลือกประเภทบุคคล</option> */}
								<option value={1}>บุคคลธรรมดา</option>
								<option value={2}>นิติบุคคล</option>
							</select>
						</div>
					</div>

					<div className='card p-3 w-75 mt-3'>
						{isPerson
							? {
									1: <PersonalInfo handleChange={handleChange} />,
									2: <ContactInfo handleChange={handleChange} />,
							  }[step]
							: {
									1: <PersonalInfo2 handleChange={handleChange} />,
									2: <ContactInfo handleChange={handleChange} />,
							  }[step]}
						<div className='d-flex justify-content-around px-1'>
							{step > 1 ? (
								<button className='btn btn-lg btn-warning px-4' onClick={prevStep}>
									ย้อนกลับ
								</button>
							) : null}
							<button className='btn btn-lg btn-info px-4' onClick={nextStep}>
								{step === 2 ? "Submit" : "ถัดไป"}
							</button>
						</div>
					</div>

					{/* <div className='card p-3 w-75 mt-3'>
						<div className='form-check'>
							<input type='checkbox' className='form-check-input' id='exampleCheck1' />
							<label className='form-check-label' htmlFor='exampleCheck1'>
								Check me out
							</label>
						</div>
					</div> */}

				</div>
			</div>
		</>
	)
}

const formatDate = (e) => {
	e = new Date(e)
	let dd = String(e.getDate()).padStart(2, "0")
	let mm = String(e.getMonth() + 1).padStart(2, "0")
	let yyyy = e.getFullYear()
	e = dd + "/" + mm + "/" + yyyy

	return e
}
