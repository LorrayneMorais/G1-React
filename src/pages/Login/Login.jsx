import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { LoginForm } from "../../components/User/LoginForm"

export const Login = () => {
    const history = useHistory()
    return (
        <>
            <LoginForm />
        </>
    )
}