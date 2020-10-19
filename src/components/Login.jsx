import React, { useContext, useState } from 'react';
import HeaderTop from './HeaderTop';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { ContextProvider } from '../context/Context';
import BreadCrumbs from './BreadCrumbs';
import YourCart from './YourCart';
import Footer from './Footer';


function Login(props) {
    const { handleLogin } = useContext(ContextProvider);

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const clearInput = () => {
        setInputs({
            email: "",
            password: "",
        })
    }

    const handleInputLogin = (e) =>{
        e.preventDefault();
        if (inputs.email === "" && inputs.password === "") {
            alert("bạn chưa nhập gì")
            return;
        }
        handleLogin(inputs);
        clearInput()
    }
    return (
        <>
            <HeaderTop></HeaderTop>

            <BreadCrumbs home="Home" title="Account" href=""></BreadCrumbs>
            <SectionTitle title="My Account"></SectionTitle>
            <YourCart></YourCart>
            <div className="login">
                <div className="container login__inner">
                    <div className="login__box">
                        <div className="login__item">
                            <div className="login__wrap">
                                <h5>Login</h5>
                                <p>If you have an account with us, please log in.</p>
                                <form onSubmit = {handleInputLogin}>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={inputs.email}
                                        onChange={handleChange}

                                    />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={inputs.password}
                                        onChange={handleChange}
                                    />
                                    <button onClick={handleInputLogin}>Sign in</button>
                                    <p><a href="/">Forgot your password?</a></p>
                                </form>
                            </div>

                        </div>
                        <div className="login__item">
                            <div className="login__wrap">
                                <h5>NEW CUSTOMER?</h5>
                                <p>Registering for this site allows you to access your order status and history. We’ll get a new account set up for you in no time. For this will only ask you for information necessary to make the purchase process faster and easier</p>
                                <Link to="/account/register" className="login__create">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Login;