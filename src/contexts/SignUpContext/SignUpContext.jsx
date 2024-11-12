import { createContext, useState } from "react";

const SignUpContext = createContext({})

const SignupProvider = ({ children }) => {
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    return (

        <SignUpContext.Provider value={{
            userId,
            setUserId,
            name,
            email,
            password,
            setName,
            setEmail,
            setPassword,
            logged,
            setLogged
        }
        }>
            {children}
        </SignUpContext.Provider>
    )
}

export { SignupProvider, SignUpContext }