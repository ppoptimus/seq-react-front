import React, { useEffect, useState } from 'react'
import axios from 'axios'
import systemConfig from '../../config.json'

export default function GetAllRequest() {
  const [allRequest, setAllRequest] = useState([])
  const [allRequestCount, setAllRequestCount] = useState(0)
  const [newRequestCount, setNewRequestCount] = useState(0)
  const [userDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})
  const fetchData = async () => {
    const config = {
      method: 'get',
      url: `${systemConfig.MasterData.getTitleUrl}getAllRequest`,
      headers: systemConfig.MasterData.headersList,
    }
    let res = await axios(config)
    setAllRequest(res.data)
    setAllRequestCount(res.data.length)
  }

  const fetchDataNewRequest = async () => {
    let reqOptions = {
      url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
      method: 'POST',
      headers: systemConfig.MasterData.headersList,
      data: {
        request_detail_id: null,
        department_code: userDetail.userlevel_id === '3' ? userDetail.department_code : null,
        user_name: userDetail.username,
        ip_address: '',
      },
    }
    let res = await axios(reqOptions)
    setNewRequestCount(res.data.length)
  }

  useEffect(() => {
    fetchData()
    fetchDataNewRequest()
  }, [])

  return (
    <>
      <div className='row'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>
              <h5>ข้อมูลการทำรายการ</h5>
              <div className='card-tools'></div>
            </div>
            <div className='card-body p-0'>
              <table className='table'>
                <thead>
                  <tr>
                    <th style={{ width: 12 }}>Code</th>
                    <th>เลขที่ชุดหนังสือ</th>
                    <th>วันที่ออกเลขชุดหนังสือ</th>
                    <th>วันที่ทำรายการ</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequest ? (
                    allRequest.map((i) => (
                      <tr key={i.id}>
                        <td>{i.request_code}</td>
                        <td>{i.document_set_no}</td>
                        <td>{i.document_set_date}</td>
                        <td>{i.create_date}</td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='info-box mb-3'>
            <span className='info-box-icon bg-info elevation-1'>
              <i className='fas fa-list-ol' />
            </span>
            <div className='info-box-content'>
              <span className='info-box-text'>จำนวนทำรายการแล้ว</span>
              <span className='info-box-number h4'>{(allRequestCount)?allRequestCount:''}</span>
            </div>
          </div>

          <div className='info-box mb-3'>
            <span className='info-box-icon bg-warning elevation-1'>
              <i className='fas fa-plus-square' />
            </span>
            <div className='info-box-content'>
              <span className='info-box-text'>จำนวนรายการใหม่</span>
              <span className='info-box-number h4'>{(newRequestCount)?newRequestCount:''}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
