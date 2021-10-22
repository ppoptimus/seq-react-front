import React, { useEffect, useState } from 'react'
import axios from "axios";


export default function GetNewRequest() {
  useEffect(() => {
    getNewRequest()
  },[])
  const getNewRequest = () => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json" 
     }
     
     let reqOptions = {
       url: "http://localhost:3000/api/getNewRequest",
       method: "POST",
       headers: headersList,
       data: "{\n  \"department_code\": null,\n  \"user_name\": \"optimus\",\n  \"ip_address\": \"182.232.62.244\"\n}",
     }
     
     axios.request(reqOptions).then(function (response) {
       console.log(response.data);
     })
  }
  return (
    <>
      
    </>
  )
}
