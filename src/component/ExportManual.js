import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function ExportManual() {
  const [requestCode, setRequestCode] = useState(null)
  useEffect(() => {})

  return (
    <>
      <div className='card flex-column'>
        <div className='card-header'>ส่งออกไฟล์เพื่อขอตรวจสอบ</div>
        <div className='card-body'>
          {requestCode ? (
            <>
              <div className='form-group row'>
                <label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>
                  เลขชุดหนังสือ
                </label>
                <input type='text' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
              </div>

              <div className='form-group row'>
                <label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>
                  ทำการส่งออกครั้งละไม่น้อยกว่า
                </label>
                <input type='text' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
                <label className='col-form-label ml-1'>รายการ</label>

                <label className='col-sm-2 col-form-label text-right' htmlFor='request_code'>
                  และไม่เกิน
                </label>
                <input type='text' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
                <label className='col-form-label ml-1'>รายการ</label>
              </div>

              <div className='form-group row'>
                <label className='col-sm-3 col-form-label text-right' htmlFor='request_code'>
                  มีข้อมูลทั้งสิ้น
                </label>
                <input type='text' className='form-control form-control-lg col-sm-2' id='request_code' readOnly />
              </div>
            </>
          ) : (
            <div className='text-center'>
              <p>ไม่มีรายการใหม่</p>
            </div>
          )}
        </div>
        <div className='card-footer text-center'>
          <button className='btn btn-primary' onClick={onSubmit}>
            ตกลง
          </button>
        </div>
      </div>

      <div className='card flex-column text-center'>
        <div className='card-body'>
          <div className='form-group row justify-content-center align-items-center'>
            <label className='col-form-label col-2 text-right' htmlFor='request_code'>
              เลขชุดหนังสือ
            </label>
            <input type='text' className='form-control form-control-lg col-2' id='request_code' />
          </div>
          <div className='form-group row justify-content-center align-items-center'>
            <label className='col-form-label col-2 text-right' htmlFor='request_code'>
              เลขที่ชุดหนังสือ
            </label>
            <input type='text' className='form-control form-control-lg col-2' id='request_code' />
          </div>
          <div className='form-group row justify-content-center align-items-center'>
            <label className='col-form-label col-2 text-right' htmlFor='request_code'>
              วันที่หนังสือ
            </label>
            <input type='date' className='form-control form-control-lg col-2 text-md' required pattern='dd/MM/yyyy' onChange={(e) => console.log(e.target.value)} />
          </div>
        </div>
      </div>
    </>
  )
}
const onSubmit = () => {
  Swal.fire({
    title: 'Generate เลขชุดหนังสือสำเร็จ',
    icon: 'success',
    confirmButtonColor: '#119516',
    confirmButtonText: 'ตกลง',
  }).then((result) => {
    if (result.isConfirmed) {
      refreshPage()
    }
  })
}

const refreshPage = () => {
  window.location.reload(false)
}
