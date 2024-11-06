import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const NotLogged = () => {
    const history = useHistory()
    return (
        <div>
            <h1>Error 401: Unauthorized</h1>
            <button onClick={() => { history.push('/signup') }}>Go to SignUp</button>
            <button onClick={() => { history.push('/') }}>Go to LogIn</button>

        </div>
    )
}   