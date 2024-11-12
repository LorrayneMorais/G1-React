import { useContext } from "react"
import { SignUpContext } from "../../contexts/SignUpContext/SignUpContext"
import api from '../../api/api'
import bcrypt from 'bcryptjs'
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./RegisterForm.css"
import Logo from "../../assets/images/Logo.png"


export const RegisterForm = () => {
    const { name, email, password, setName, setEmail, setPassword } = useContext(SignUpContext)

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const passwordCript = await bcrypt.hash(password, 10)
        const newUser = { name, email, password: passwordCript }

        if (await emailExists(email)) {
            alert('This email is already registered!')
            return
        }

        const response = await api.post('/users', newUser)

        if (response.status === 201) {
            alert('User created successfully!')
        } else {
            alert('Error creating user')
        }

    }

    return (
        <div className="cadastro">
            <div className="register-container">
                <header>
                    <img src={Logo} alt="Logo" className="logo" />
                    <Link to="/login" className="back-button">Entrar</Link>
                </header>
                <form onSubmit={handleRegisterSubmit} className="register-form">
                    <h2>Cadastro</h2>
                    <label htmlFor="name">Nome:
                        <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label htmlFor="email">Email:
                        <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="password">Senha:
                        <input required type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" className="botaoCadastro">Cadastre-se</button>
                    <Link to="/login" className="login-link">Entrar</Link>
                </form>
            </div>
        </div>
    );
};
const emailExists = async (email) => {
    const response = await api.get(`/users?email=${email}`)
    return response.data.length > 0 ? true : false
}
