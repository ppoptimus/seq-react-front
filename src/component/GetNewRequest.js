import React, { useEffect, useState } from 'react'
import axios from "axios";
import Data from '../config.json'

export default function GetNewRequest(prop) {
  const [data, setData] = useState([])
  const [id, setId] = useState(null)
  const [titleName, setTitleName] = useState(null)
  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [department, setDepartment] = useState(null)

  useEffect(() => {
    setData(Data.TestData)
    const getData = []
    for (let id in data) {
      getData.push({ id, ...data[id] })
    }
  }, [])

  const OpenEdit = (id) => {
      let item = data[id-1]
      setId(item.id)
      setTitleName(item.title_name)
      setName(item.name)
      setAddress(item.address)
      setDepartment(item.department)
    console.log(item)
  }
  return (
    <>
      <table className='table'>
        <thead className='thead-purple'>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>name</th>
            <th>address</th>
            <th>department</th>
            <th></th>
          </tr>
        </thead>
        {data ? (
          data.map((i) => (
            <tbody key={i.id}>
              <tr>
                <th>{i.id}</th>
                <td>{i.title_name}</td>
                <td>{i.name}</td>
                <td>{i.address}</td>
                <td>{i.department}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => OpenEdit(i.id)}>Edit</button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <p>"Loading.."</p>
        )}
      </table>
    </>
  )
}
