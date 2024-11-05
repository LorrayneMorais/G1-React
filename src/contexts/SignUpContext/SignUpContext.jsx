import { createContext, useState } from "react";

const SignUpContext = createContext({})

const SignupProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (

        <SignUpContext.Provider value={{
            name,
            email,
            password,
            setName,
            setEmail,
            setPassword
        }
        }>
            {children}
        </SignUpContext.Provider>
    )
}

export { SignupProvider, SignUpContext }