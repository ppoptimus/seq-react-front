import React, { useEffect, useState } from "react"

export default function ExportManual() {
  const [requestCode, setRequestCode] = useState(null)
  useEffect(()=>{
    
  })
	return (
		<>
			<div className='card flex-column'>
				<div className='card-header'>ส่งออกไฟล์เพื่อขอตรวจสอบ</div>
				<div className='card-body'>
					<div className='form-group row'>
						<label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>เลขชุดหนังสือ</label>
						<input type='test' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
					</div>

          <div className='form-group row'>
						<label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>ทำการส่งออกครั้งละไม่น้อยกว่า</label>
						<input type='test' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />

            <label className='col-sm-2 col-form-label text-right' htmlFor='request_code'>และไม่เกิน</label>
						<input type='test' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
					</div>

          <div className='form-group row'>
						<label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>มีข้อมูลทั้งสิ้น</label>
						<input type='test' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
					</div>
				</div>
        <div className='card-footer text-center'>
          <button className='btn btn-primary'>ตกลง</button>
        </div>
			</div>
		</>
	)
}
