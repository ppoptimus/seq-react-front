import React from "react"

const ContactInfo = ({ handleInputChange }) => {
	return (
		<div className='container'>
			<form>
				<div className='form-group'>
					<textarea
						className='form-control form-control-lg'
						rows={2}
						type='text'
						maxLength={100}
						placeholder='ที่อยู่'
						onChange={handleInputChange("address")}></textarea>
				</div>
				<div className='form-group'>
					<input
						className='form-control form-control-lg w-25 text-md'
						type='text'
						maxLength={5}
						placeholder='รหัสไปรษณีย์'
						onChange={handleInputChange("zipcode")}></input>
				</div>
			</form>
		</div>
	)
}

export default ContactInfo
