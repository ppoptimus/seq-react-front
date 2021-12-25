import React from 'react'

const ContactInfo = ({ handleInputChange }) => {
	return (
		<form>
			<div className='form-group'>
				<textarea className='form-control form-control-lg' rows={2} type='text' maxLength={255} placeholder='ที่อยู่' onChange={handleInputChange('address')}></textarea>
			</div>

			<div className='form-group'>
				<input className='form-control form-control-lg w-25' type='text' maxLength={5} placeholder='รหัสไปรษณีย์' onChange={handleInputChange('zipcode')}></input>
			</div>
		</form>
	)
}

export default ContactInfo
