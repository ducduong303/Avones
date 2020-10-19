import React, { useContext, useState, useEffect } from 'react';

// Img
import logo from "../assets/image/avon-logo.svg";
import bar from "../assets/image/bar.svg";
import time from "../assets/image/time.png";
import avataruser from "../assets/image/user.svg";

// Icon
import { GiShoppingCart } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';


import { db } from '../config/firebase';
import { ContextProvider } from '../context/Context';


function HeaderTop(props) {

    const { handClickBar, clickBar, user, handleLogout,handleYourCart, cartUser} = useContext(ContextProvider);
    const classname = clickBar ? "header__top-nav" : "header__top-nav active"
    const [nav, setNav] = useState("");
    useEffect(() => {
        db.collection("navs").orderBy("create", 'desc').onSnapshot(snap => {
            snap.docs.map(doc => {
                return setNav(doc.data().nav)
            })
        })
    }, [])

    useEffect(() => {
        const listMenu = document.querySelector('.header__top')
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                listMenu.classList.add('active')
            } else {
                listMenu.classList.remove('active')
            }
        })
    }, [])




    
  
    return (
        <div className="header__top">
            <div className="container header__top-inner">
                <div className="header__top-left">
                    {
                        clickBar ? <img src={bar} onClick={handClickBar} alt="" className="header__top-bar"></img> :
                            <img src={time} onClick={handClickBar} alt="" className="header__top-bar"></img>
                    }
                    <Link to="/"><img src={logo} alt="" className="header__top-logo"></img></Link>
                </div>
                <ul className={classname}>
                    {
                        nav && nav.map((item, index) => {
                            return (
                                <li key={index}><Link to={item.href} className={item.class}>{item.item}</Link></li>
                            )
                        })
                    }
                </ul>
                <div className="header__top-right">
                    <ul className="header__top-navRight">
                        {
                            user && user ?
                                <li className="header__top-user">
                                    <Link to="/"><img src={avataruser} alt=""></img></Link>
                                    <div className="header__top-option">
                                        <ul>
                                            <li><h5>User: {user.displayName}</h5></li>
                                            <li><h5>Account Information</h5></li>
                                            <li><h5 onClick={handleLogout}>LogOut <FiLogOut></FiLogOut></h5></li>
                                        </ul>
                                    </div>
                                </li>
                                :
                                <li>
                                    <Link to="/account/register">resgister</Link><span>/</span> <Link to="/account/login">login</Link>
                                </li>
                        }
                        <li>
                            { 
                            user ? <p onClick={handleYourCart}><GiShoppingCart size={25}></GiShoppingCart>({cartUser.length})</p> : <p onClick={handleYourCart}><GiShoppingCart size={25}></GiShoppingCart>(0)</p>
                            }
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
}

export default HeaderTop;