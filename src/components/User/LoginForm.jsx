import { useContext } from "react"
import { SignUpContext } from "../../contexts/SignUpContext/SignUpContext"
import api from "../../api/api"
import bcrypt from 'bcryptjs'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const LoginForm = () => {
    const { email, password, setEmail, setPassword } = useContext(SignUpContext)
    const history = useHistory()


    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const response = await api.get(`/users?email=${email}`)

        if (response.data.length === 0) {
            alert('Email or password invalid!')
            return
        }

        const user = response.data[0]
        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            localStorage.setItem('userId', user.id)
            history.push('/home')
        } else {
            alert('Email or password invalid!')
        }
    }
    return (
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
            <label htmlFor="email">Email:
                <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">Password:
                <input required type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}