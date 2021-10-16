import React, { useState } from "react"

import PersonalInfo from "../formStep/Step1PersonalInfo"
import ContactInfo from "../formStep/Step2ContactInfo"
import LocationInfo from "../formStep/LocationInfo"

export default function NewRequest() {
	
	const [values, setValues] = useState({
		employer_number: "",
		personal_type: 1,
		title: "",
		first_name: "",
		last_name: "",
		citizen_id: "",
		birth_date: "",
		address: "",
		zipcode: "",
		remark: "",
	})
	const [step, setStep] = useState(1)

	const nextStep = () => {
		if (step < 3) {
			setStep(step + 1)
		} else if (step === 3) {
			console.log(values)
		}
	}

	const prevStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value })
	}

	console.log(values)
	return (
		<>
			<div className='bg-light vh-100'>
				<div className='container justify-content-center align-items-center'>

					<div className='form-row align-items-center mt-3'>
						<div className='col-auto'>
							<select className='custom-select' onChange={handleChange("personal_type")}>
								<option value={1}>บุคคลธรรมดา</option>
								<option value={2}>นิติบุคคล</option>
							</select>
						</div>
						<div>
							<input
								className='form-control form-control-lg'
								type='text'
								placeholder='เลขบัญชีนายจ้าง'
								onChange={handleChange("employer_number")}></input>
						</div>
					</div>

					<div className='card p-3 w-75 mt-3'>
						{
							{
								1: <PersonalInfo handleChange={handleChange} />,
								2: <ContactInfo handleChange={handleChange} />,
								3: <LocationInfo handleChange={handleChange} />,
							}[step]
						}
						<div className='d-flex justify-content-around px-1'>
							{step > 1 ? (
								<button className='btn btn-lg btn-warning px-4' onClick={prevStep}>
									Back
								</button>
							) : null}
							<button className='btn btn-lg btn-info px-4' onClick={nextStep}>
								{step === 3 ? "Submit" : "Next"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
