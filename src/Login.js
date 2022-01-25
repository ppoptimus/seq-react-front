import React, { useEffect, useState } from "react"
import "./css/Login.css"
import systemConfig from "./config.json"
import axios from "axios"
import Swal from "sweetalert2"
import UserDetail from "./UserDetail"

export default function Login(props) {
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
		let isMounted = true
		axios(config)
			.then(function (res) {
				if (isMounted) {
					setnews(res.data[0])
					console.log(res.data[0])
				}
			})
			.catch(function (error) {
				console.log(error)
			})
		return () => {
			isMounted = false
		}
	}, [userDetail])

	const onSubmitLogin = () => {
		if (userName) {
			const config = {
				method: "post",
				url: `${systemConfig.MasterData.getTitleUrl}ldapLogin`,
				headers: systemConfig.MasterData.headersList,
				data: {
					user_name: userName,
					pwd: password,
				},
			}

			axios(config)
				.then(function (res) {
					if (!res) {
						return (
							<div className='spinner-border text-purple text-lg' role='banner'>
								<span className='sr-only'>Loading...</span>
							</div>
						)
					}
					if (res.status === 200) {
						if (res.data.result === 1) {
							setUserDetail(res.data)
						} else {
							Swal.fire({
								title: "เข้าระบบไม่สำเร็จ!!",
								text: res.data.resultMessage,
								icon: "warning",
								confirmButtonColor: "#da8d0c",
								confirmButtonText: "ตกลง",
							})
						}
					} else {
						Swal.fire({
							title: "เข้าระบบไม่สำเร็จ!!",
							text: res.data.resultMessage,
							icon: "error",
							confirmButtonColor: "#9c1e1e",
							confirmButtonText: "ตกลง",
						})
						setUserDetail(null)
					}
				})
				.catch(function (error) {
					console.log(error)
					Swal.fire({
						title: "เข้าระบบไม่สำเร็จ!!",
						text: error,
						icon: "error",
						confirmButtonColor: "#9c1e1e",
						confirmButtonText: "ตกลง",
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
						<p>{news.news_description ? news.news_description : ""}</p>
					</div>
				</section>
				<section id='right'>
					<img src='dist/img/logo.png' className='img-fluid w-50 mb-2'></img>
					<form onSubmit={onSubmitLogin}>
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
							<button className='btn-block bg-teal text-lg' type='submit' onClick={onSubmitLogin}>
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
