import { useContext } from "react"
import { SignUpContext } from "../../contexts/SignUpContext/SignUpContext"
import { api } from '../../api/api'
import bcrypt from 'bcryptjs'

export const RegisterForm = () => {
    const { name, email, password, setName, setEmail, setPassword } = useContext(SignUpContext)

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const passwordCript = await bcrypt.hash(password, 10)
        const newUser = { name, email, password: passwordCript }

        if (emailExists(email)) {
            alert('Este email já está cadastrado!')
            return
        }

        const response = await api.post('/users', newUser)

        if (response.status === 201) {
            alert('Usuário criado com sucesso!')
        } else {
            alert('Erro ao criar o usuário')
        }

    }

    return (
        <>
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <label htmlFor="name" >Name:
                    <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="email">Email:
                    <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">Password:
                    <input required type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" >Register</button>
            </form>
        </>
    )
}

const emailExists = async (email) => {
    const response = await api.get(`/users?email=${email}`)
    if (response.status === 200) {
        if (response.data.length > 0) {
            return true
        }
    }
    return false
}



