import React, { useState, createContext, useEffect, useRef, } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/firebase';
import data from "../data/data.json";
import dataBlog from "../data/blog.json";
export const ContextProvider = createContext();

function Context(props) {
    const history = useHistory('');
    // Trạng thái CLick
    const [clickBar, setClickBar] = useState(true) 
    const [openCart, setOpenCart] = useState(true);
    // User đăng nhập
    const [user, setUser] = useState([]);
    // Product
    const [products, setProducts] = useState(data)
    // Giỏ hàng tổng
    const [cart, setCart] = useState([]);
    // Giỏ hàng của User
    const [cartUser, SetCartUser] = useState([])
    // Blog
    const [blog,setBlog] = useState(dataBlog)

    // Xử lý Click
    const handClickBar = () => {
        setClickBar(!clickBar)
    }

    // Xử lý tác vụ Đăng ký
    const handleRegister = (data) => {
        const { firstname, lastname, email, password } = data
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth.user) {
                    auth.user.updateProfile({
                        displayName: `${firstname} ${lastname}`,
                    }).then((s) => {
                        history.push("/")
                    })
                }
            })
            .catch((e) => {
                if (e.message === "The email address is already in use by another account.") {
                    alert("Email này đã được đăng ký ở một tài khoản khác")
                }
                else {
                    alert(e.message);
                }
            })
    }
    // Lắng nghe thay đổi 
    auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser)
        } else {
            setUser(false);
        }
    })

    // Xử lý tác vụ Đăng Nhập
    const handleLogin = async (data) => {
        const { email, password } = data
        await auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push("/");
                // alert("Đăng Nhập Thành Công")
            })
            .catch((e) => {
                if (
                    e.message ===
                    "The password is invalid or the user does not have a password."
                ) {
                    alert("Bạn hãy check lại mật khẩu hoặc tài khoản ");
                } else if (
                    e.message ===
                    "There is no user record corresponding to this identifier. The user may have been deleted."
                ) {
                    history.push("/account/register");
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    alert(e.message);
                }

            })
    }
    
    // Xử lý tác vụ Đăng Xuất
    const handleLogout = (event) => {
        event.preventDefault();
        auth.signOut();
        history.push("/");
    }

    // Xử lý tác vụ Thêm Vào giỏ hàng
    const addToCart = (product, count, size, idUser) => {
        if (user) {
            const cartItem = cart.slice();
            let statusInCart = false;
            // Nếu trong Cart có item thì kiểm tra 
            if (statusInCart === false) {
                cartItem.forEach(item => {
                    if (item.id === product.id) {
                        // Nếu Cùng id cùng size tăng count lên
                        if (item.size === size) {
                            item.count += count;
                            item.size = size;
                            item.idUser = idUser
                            statusInCart = true
                        }
                    } else if (item.id === product.id) {
                        // Nếu cùng id không cùng size xét item mới 
                        if (item.size !== size) {
                            cartItem.push({ ...product, count: count, size: size, idUser: idUser })
                            statusInCart = true
                        }
                    }
                });
            }
            // Nếu trong cart chưa có item thì thêm vào Cart statusInCart == true
            if (!statusInCart) {
                cartItem.push({ ...product, count: count, size: size, idUser: idUser })
                statusInCart = true;
                setCart(cartItem)
            }


            setOpenCart(!openCart);
            setTimeout(() => {
                setOpenCart(false)
            }, 500)
        } else {
            history.push("/account/login")
            alert("Làm phiền bạn đăng nhập ")
        }

    }

    // Tăng count
    const increment = (product) => {
        const cartItem = cart.slice();
        cartItem.forEach((item) => {
            if (item === product) {
                item.count += 1
            }
        })
        setCart(cartItem);
    }

    // Giảm Count
    const decrement = (product) => {
        const cartItem = cart.slice();
        cartItem.forEach(item => {
            if (item === product) {
                if (item.count === 1) {
                    item.count = 1
                } else {
                    item.count -= 1
                }
            }
        })
        setCart(cartItem)
    }

    // Xóa Product
    const removeProduct = (product) => {
        const cartItem = cart.slice();
        cartItem.forEach((item, index) => {
            if (item === product) {
                cartItem.splice(index, 1)
            }
        })
        setCart(cartItem)

    }

    // Xử lý trạng thái đóng mở Your Cart
    const handleYourCart = () => {
        setOpenCart(!openCart)
    }

    // Check thanh toán
    const handleCheckUser = () => {
        if (!user) {
            history.push("/account/login")
        } else {
            alert("Xin lỗi vì chức năng này chưa hoàn thiện")
        }
    }

    // Xử lý Filter Các sản phẩm đã mua của User
    const handleCartUser = () => {
        const cartItem = cart.slice();
        const CartOfMe = cartItem.filter((item, index) => {
            return item.idUser === user.uid;
        })
        SetCartUser(CartOfMe)
    }
    useEffect(() => {
        handleCartUser()
    }, [cart, user])

    // Xử lý tính tổng các sản phẩm của User đã mua 
    const [total, setTotal] = useState(0)
    const getTotal = () => {
        const sum = cartUser.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        setTotal(sum)
    }
    useEffect(() => {
        getTotal()
    }, [getTotal])

    // Xử lý lưu trữ dữ liệu tránh reload mất
    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            const dataCart = JSON.parse(localStorage.getItem('dataCart'));
            if (dataCart) {
                setCart(dataCart)
            }
            mounted.current = true;
        } else {
            localStorage.setItem('dataCart', JSON.stringify(cart));

            // do componentDidUpdate logic
        }
    });


    return (
        <ContextProvider.Provider value={
            {
                user: user,
                clickBar: clickBar,
                openCart: openCart,
                handClickBar: handClickBar,
                handleRegister: handleRegister,
                handleLogin: handleLogin,
                handleLogout: handleLogout,
                products: products,
                addToCart: addToCart,
                cart: cart,
                decrement: decrement,
                increment: increment,
                removeProduct: removeProduct,
                handleYourCart: handleYourCart,
                handleCheckUser: handleCheckUser,
                cartUser: cartUser,
                total:total,
                blog:blog

            }
        }>
            {props.children}
        </ContextProvider.Provider>
    );
}

export default Context;