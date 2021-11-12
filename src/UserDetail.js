export default function UserDetail() {
	const userData = localStorage.getItem('userDetail')
	if (userData) {
		return JSON.parse(userData)
	} else {
		return null
	}
}
