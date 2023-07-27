import { useState } from "react";
import Add from "../images/add.svg"
import Logo from "../images/chachachat-logo.svg";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);
        
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try{
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
        
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch(err) {
                        console.log(err);
                        setErr(true);
                    }
                });
            });
        } catch(err) {
            console.log(err)
            setErr(true);
        };
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
               <div className="logo"><img src={Logo} alt="logo" /></div>
                <span className="title">Register!</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Your name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <div className="add-icon">
                            <img src={Add} alt="add" />
                        </div>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Do You have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;