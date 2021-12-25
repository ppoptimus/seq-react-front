import React from 'react'

export default function ConfigNews() {
	return (
		<>
			<div className='card flex-column'>
				<div className='card-header bg-teal'>บันทึกการแจ้งข้อมูลข่าวสาร</div>
				<div className='card-body'>
					<form>
						<div className='form-group row'>
							<label htmlFor='inputTitle' className='col-2 col-form-label'>
								หัวข้อข่าวสาร
							</label>
							<div className='col-10'>
								<input type='text' maxLength={100} className='form-control' id='inputTitle' />
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='inptuDetail' className='col-2 col-form-label'>
								รายละเอียด
							</label>
							<div className='col-10'>
								<textarea type='text' rows={2} maxLength={1000} className='form-control' id='inptuDetail' />
							</div>
						</div>
					</form>
				</div>
				<div className='card-footer'>
					<button className='btn btn-primary px-4'>
						บันทึก
					</button>
				</div>
			</div>
		</>
	)
}
