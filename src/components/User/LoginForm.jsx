import { useContext } from "react"
import { SignUpContext } from "../../contexts/SignUpContext/SignUpContext"
import api from "../../api/api"
import bcrypt from 'bcryptjs'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./LoginForm.css"
import Logo from "../../assets/images/Logo.png"

export const LoginForm = () => {
    const { email, password, setEmail, setPassword, setLogged, setUserId } = useContext(SignUpContext)
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
            setLogged(true)
            setUserId(user.id)
            history.push('/')
        } else {
            alert('Email or password invalid!')
        }
    }
    return (
        <div className="loginpage">
            <div className="login-container">
                <div className="login-box">
                    <div className="form-section">
                        <h2>FAÇA SEU LOGIN.</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Senha</label>
                            <input
                                required
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="botaoLogin" type="submit">Entrar</button>
                            <Link to="/signup"><p className="createc">Criar conta</p></Link>
                        </form>
                    </div>
                    <div className="logoimg">
                        <img src={Logo} alt="Hora da Leitura Logo" />
                    </div>
                </div>
            </div>
        </div>
    );
};