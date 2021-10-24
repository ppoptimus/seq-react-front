const editNewRequest = () => {
  let reqOptions = {
    url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
    method: "POST",
    headers: systemConfig.MasterData.headersList,
    data: {
      request_detail_id: null,
      department_code: userDetail.userlevel_id === "3" ? userDetail.department_code : null,
      user_name: userDetail.username,
      ip_address: "",
    },
  }

  axios
    .request(reqOptions)
    .then((res) => {
      setAllNewRequest(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

const editNewReqestAdmin = () => {
  let reqOptions = {
    url: `${systemConfig.MasterData.getTitleUrl}getNewRequest`,
    method: "POST",
    headers: systemConfig.MasterData.headersList,
    data: {
      request_detail_id: null,
      department_code: userDetail.userlevel_id === "3" ? userDetail.department_code : null,
      user_name: userDetail.username,
      ip_address: "",
    },
  }

  axios
    .request(reqOptions)
    .then((res) => {
      setAllNewRequest(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default {editNewRequest, editNewReqestAdmin}