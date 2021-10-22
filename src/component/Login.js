import React, { useEffect, useState } from "react"
import "../component/css/Login.css"
import systemConfig from "../config.json"
import axios from "axios"

export default function Login() {
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [userDetail, setUserDetail] = useState(() => {
		const userData = localStorage.getItem("userDetail")
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	})

	const config = {
		method: "post",
		url: `${systemConfig.MasterData.getTitleUrl}ldapLogin`,
		headers: systemConfig.MasterData.headersList,
		data: {
			user_name: userName,
			pwd: "xxx",
		},
	}

	useEffect(() => {
		localStorage.setItem("userDetail", JSON.stringify(userDetail))
	}, [userDetail])

	const onSubmitLogin = (e) => {
	
		axios(config)
			.then(function (response) {

				setUserDetail(response.data)
				refreshPage()
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	function refreshPage() {
    window.location.reload(false);
  }

	return (
		<div className='body vh-100'>
			<div className='container px-4 py-5 mx-auto'>
				<div className=' card0' style={{ background: "center"}}>
					<div className='d-flex flex-lg-row flex-column-reverse'>
						<div className='card card1'>
							<div className='row justify-content-center my-auto'>
								<div className='col-md-8 col-10 my-5'>
									<div className='row justify-content-center px-3 mb-3'>
										<img id='logo' src='dist/img/logo.png' />
									</div>
									<h3 className='mb-5 text-center heading'>SEQUESTER</h3>
									<form>
										<div className='form-group'>
											<input
												type='text'
												name='user_name'
												placeholder='ชื่อผู้ใช้'
												className='form-control input'
												onChange={(e) => setUserName(e.target.value)}
												value={userName}
											/>
										</div>
										<div className='form-group'>
											<input
												type='password'
												name='psw'
												placeholder='รหัสผ่าน'
												className='form-control input'
												onChange={(e) => setPassword(e.target.value)}
												value={password}
											/>
										</div>
										<div className='row justify-content-center my-3 px-3'>
											<button className='btn-block btn-color' type='button' onClick={onSubmitLogin}>
												เข้าระบบ
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className='card card2'>
							<div className='my-auto mx-md-5 px-md-5 right'>
								<h3 className='text-white'>ข่าวประชาสัมพันธ์</h3>
								<p className='text-white'>
									โดยที่ถึงแม้สถานการณ์การแพร่ระบาดของโรคติดเชื้อไวรัสโคโรนา ๒๐๑๙ ในประเทศไทย จะปรากฏแนวโน้มที่ดีขึ้นแล้วก็ตาม
									แต่สถานการณ์การแพร่ระบาดของโรคดังกล่าวในต่างประเทศ ก็ยังปรากฏมีอยู่ในปัจจุบัน ดังนั้น
									เพื่อมิให้ส่งผลกระทบต่อสุขภาพของบุคลากรของศาลปกครอง และสำนักงานศาลปกครอง ซึ่งจะส่งผลต่อการบริหารราชการศาลปกครองและสำนักงานศาลปกครอง
									อันอาจก่อให้เกิดความเสียหายแก่ราชการในที่สุด
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}