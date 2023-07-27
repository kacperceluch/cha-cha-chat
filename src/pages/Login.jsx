import { useState } from "react";
import Logo from "../images/chachachat-logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(err) {
            console.log(err);
            setErr(true);
        };
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="logo"><img src={Logo} alt="logo"/></div>
                <span className="title">Login!</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;