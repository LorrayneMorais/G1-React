import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { RegisterForm } from "../../components/User/RegisterForm"

export const Signup = () => {
    const history = useHistory()

    return (
        <>
            <RegisterForm />
        </>
    )
}




