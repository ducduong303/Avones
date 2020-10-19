import React, { useContext} from 'react';
import { ContextProvider } from '../context/Context';
import time from "../assets/image/time.png";
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FiTruck } from 'react-icons/fi';

function YourCart(props) {
    const { removeProduct, openCart, handleYourCart ,handleCheckUser,cartUser,total} = useContext(ContextProvider);
    const classname = openCart ? "your-cart" : "your-cart active"
    return (
        <div className={classname}>
            <div className="container">
                <div className="your-cart__box">
                    <div className="your-cart__head">
                        <h3>Your-cart</h3>
                        <img src={time} alt="" onClick={handleYourCart} />
                    </div>
                    <div className="your-cart__body">
                        {
                           cartUser.length === 0 ?
                                <>
                                    <h5>You don't have any items in your cart.</h5>
                                </>
                                :
                                <>
                                    {
                                       cartUser.map((item, index) => {
                                            return (
                                                <div className="your-cart__item" key={index}>
                                                    <div className="your-cart__item-img">
                                                        <img src={item.url} alt="" />
                                                    </div>
                                                    <div className="your-cart__item-desc">
                                                        <a href="/">{item.title}</a>
                                                        <p>Size: <b>{item.size}</b></p>
                                                        <p>${item.price} x {item.count}</p>
                                                    </div>
                                                    <p className="your-cart__item-btn" onClick={() => removeProduct(item)}><AiOutlineDelete size={16} /></p>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="your-cart__total">
                                        <h4>SUBTOTAL:</h4>
                                        <h3>{total}$</h3>
                                    </div>
                                    <div className="your-cart__desc">
                                        <p className="your-cart__desc-free"><FiTruck size={18} /> <b>Congratulations! </b>You have got <b>FREE Shipping</b></p>
                                        <div className="your-cart__desc-check">
                                            <input type="checkbox" />
                                            <p>I agree with the terms and conditions</p>
                                        </div>
                                    </div>
                                    <div className="your-cart__view">
                                        <Link to="/cart" onClick={handleYourCart}>View Cart</Link>
                                    </div>
                                    <div className="your-cart__proceed">
                                        <p onClick={handleCheckUser}>Proceed to Checkout</p>
                                    </div>

                                </>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default YourCart;