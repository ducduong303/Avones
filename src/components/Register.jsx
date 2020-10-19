import React, { useState, useContext } from 'react';
import HeaderTop from './HeaderTop';
import SectionTitle from './SectionTitle';
import { ContextProvider } from '../context/Context';
import BreadCrumbs from './BreadCrumbs';
import YourCart from './YourCart';
import Footer from './Footer';
function Register(props) {

    const { handleRegister } = useContext(ContextProvider);


    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })

    // xử lý clear Input
    const clearInput = () => {
        setInputs({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        })
    }
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleInputRegister = (e) => {
        e.preventDefault();

        if (inputs.firstname === "") {
            alert("Bạn chưa nhập firstname");
            return;
        } else if (inputs.lastname === "") {
            alert("Bạn chưa nhập lastname");
            return;
        } else if (inputs.email === "") {
            alert("Bạn chưa nhập email");
            return;
        }
        else if (inputs.password === "") {
            alert("Bạn chưa nhập password");
            return;
        }
        else if (inputs.firstname.length < 10 && inputs.lastname.length < 10) {
            handleRegister(inputs);
            clearInput();
        }
        else {
            alert("firstname and lastname không được quá 15 ký tự")
        }
    }

    return (
        <>
            <HeaderTop></HeaderTop>
            <BreadCrumbs
                home="home"
                title="Create Account"
                href="/account/register"
            />
            <SectionTitle title="Create an Account"></SectionTitle>
            <YourCart></YourCart>
            <div className="register">
                <div className="container register__inner">
                    <div className="register__box">
                        <form>
                            <input
                                type="text"
                                name="firstname"
                                value={inputs.firstname}
                                placeholder="First Name"
                                onChange={handleChange} />
                            <input
                                name="lastname"
                                onChange={handleChange}
                                value={inputs.lastname}
                                type="text"
                                placeholder="Last Name" />
                            <input
                                name="email"
                                onChange={handleChange}
                                value={inputs.email}
                                type="email"
                                placeholder="Email" />
                            <input
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                                type="password"
                                placeholder="Password" />
                            <button onClick={handleInputRegister}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Register;