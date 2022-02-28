import React, { useEffect, useState } from "react"
import "./css/Login.css"
import systemConfig from "./config.json"
import axios from "axios"
import Swal from "sweetalert2"
import UserDetail from "./UserDetail"

export default function Login() {
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [userDetail, setUserDetail] = useState(UserDetail)
	const [news, setnews] = useState([])

	useEffect(() => {
		localStorage.setItem("userDetail", JSON.stringify(userDetail))
		const config = {
			method: "get",
			url: `${systemConfig.MasterData.getTitleUrl}getMasterNews`,
			headers: systemConfig.MasterData.headersList,
		}
		axios(config)
			.then(function (res) {
				if (res.data.length > 0) {
					setnews(res.data[0])
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [userDetail])

	const onSubmitLogin = () => {
		if (userName) {
			const config = {
				method: "POST",
				url: `${systemConfig.MasterData.getTitleUrl}ldapLogin`,
				headers: systemConfig.MasterData.headersList,
				data: {
					user_name: userName,
					pwd: password,
				},
			}

			axios.post(`${systemConfig.MasterData.getTitleUrl}ldapLogin`, config.data)
				.then((res) => {
					if (res.status === 200) {
						if (res.data.result === 1) {
							setUserDetail(res.data)
							refreshPage()
						} else {
							Swal.fire({
								title: "เข้าระบบไม่สำเร็จ!!",
								text: res.data.resultMessage,
								icon: "warning",
								confirmButtonColor: "#da8d0c",
								confirmButtonText: "ตกลง",
							})
						}
					} else if (res.status === 203) {
						Swal.fire({
							title: "เข้าระบบไม่สำเร็จ!!",
							text: res.data.resultMessage,
							icon: "error",
							confirmButtonColor: "#e74c3c",
							confirmButtonText: "ตกลง",
						})
					}
				})
				.catch((err) => {
					Swal.fire({
						title: "เข้าระบบไม่สำเร็จ!!",
						text: err,
						icon: "error",
						confirmButtonColor: "#9c1e1e",
						confirmButtonText: "ตกลง",
					}).then((result) => {
						if (result.isConfirmed) {
							refreshPage()
						}
					})
				})
		}
	}

	return (
		<div className='body vh-100'>
			<main id='main'>
				<section id='left'>
					<div id='head'>
						<h3 className='mb-2'>ข่าวประกาศ</h3>
						{news ? <p>{news.news_description ? news.news_description : ""}</p> : ""}
					</div>
				</section>
				<section id='right'>
					<img src='dist/img/logo.png' className='img-fluid w-50 mb-2' alt=''></img>
					<form>
						<div className='form-group'>
							<input
								type='text'
								name='user'
								placeholder='ชื่อผู้ใช้'
								className='form-control input'
								onChange={(e) => setUserName(e.target.value)}
								value={userName}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								placeholder='รหัสผ่าน'
								className='form-control input'
								autoComplete=''
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</div>
						<div className='row justify-content-center my-3 px-3'>
							<button className='btn btn-block bg-teal text-lg' type='button' onClick={onSubmitLogin}>
								เข้าระบบ
							</button>
						</div>
					</form>
				</section>
			</main>
			<div className='bubbles'>
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
			</div>
		</div>
	)
}

const refreshPage = () => {
	window.location.reload(false)
}
