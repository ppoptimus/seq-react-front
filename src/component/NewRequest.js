import React, { useState } from "react"

import PersonalInfo from "../formStep/Step1PersonalInfo"
import ContactInfo from "../formStep/ContactInfo"
import LocationInfo from "../formStep/LocationInfo"


export default function NewRequest() {
	const [values, setValues] = useState({
		employer_number: "",
		personal_type: "",
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

	return (
		<>
			<div className='bg-light vh-100'>
				<div className='container d-flex justify-content-center align-items-center'>
					<div className='card p-3 w-50 mt-5'>
						{
							{
								1: <PersonalInfo handleChange={handleChange} />,
								2: <ContactInfo handleChange={handleChange} />,
								3: <LocationInfo handleChange={handleChange} />,
							}[step]
						}
						<div className='d-flex justify-content-around px-1'>
							{step > 1 ? (
								<button className='btn btn-warning' onClick={prevStep}>
									Back
								</button>
							) : null}
							<button className='btn btn-lg btn-info' onClick={nextStep}>
								{step === 3 ? "Submit" : "Next"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
