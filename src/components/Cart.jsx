import React, { useContext } from 'react';
import { ContextProvider } from '../context/Context';
import HeaderTop from './HeaderTop';
import BreadCrumbs from './BreadCrumbs';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';
import YourCart from './YourCart';
function Cart(props) {
    const {decrement, increment, removeProduct , handleCheckUser,cartUser,total} = useContext(ContextProvider);

    return (
        <>
            <HeaderTop></HeaderTop>
            <BreadCrumbs
                home="Home"
                href="/"
                title="Your Cart"

            ></BreadCrumbs>
            <YourCart></YourCart>
    
            
            {
               cartUser.length === 0 ?
                    <>
                        <div className="cart-empty">
                            <div className="cart-empty__box">
                                <p className="cart-empty__text">You don't have any items in your cart.</p>
                                <Link to="/" className="cart-empty__btn"> Continue shopping <AiOutlineArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </>
                    :
                    <div className="cart">
                        <div className="container">
                            <SectionTitle title="Your Cart">
                            </SectionTitle>
                            <div className="cart__inner">
                                <div className="cart__head">
                                    <div className="col_item col_1">Ảnh Sản Phẩm</div>
                                    <div className="col_item col_2">Tên sản phẩm</div>
                                    <div className="col_item col_3">Đơn giá</div>
                                    <div className="col_item col_4">Số lượng</div>
                                    <div className="col_item col_5">Thành tiền</div>
                                    <div className="col_item col_6">Xóa</div>
                                </div>
                                <div className="cart__body">

                                    {
                                        cartUser.map((item, index) => {
                                            return (
                                                <div className="cart__item" key={index}>
                                                    <div className="col_item col_1">
                                                        <img className="cart__item-img" src={item.url} alt="" />
                                                    </div>
                                                    <div className="col_item col_2">
                                                        <div className="cart__item-info">
                                                            <div className="title-product">
                                                                {item.title}
                                                            </div>
                                                            <div className="size-product">
                                                                Size: <strong>{item.size}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col_item col_3">
                                                        <span className="cart__item-price">
                                                            {item.price}$
                                                        </span>
                                                    </div>
                                                    <div className="col_item col_4">
                                                        <div className="cart__item-quantity">
                                                            <button className="btn-quantity" onClick={() => decrement(item)}>-</button>
                                                            <button>{item.count}</button>
                                                            <button className="btn-quantity" onClick={() => increment(item)}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="col_item col_5">
                                                        <span>
                                                            {item.price * item.count}$
                                                        </span>
                                                    </div>
                                                    <div className="col_item col_6">
                                                        <p className="cart__item-remove" onClick={() => removeProduct(item)}><AiOutlineDelete size={20} /></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="cart__check">
                                <div className="cart__check-inner">
                                    <div className="cart__check-item">
                                        <div className="cart__check-title">
                                            <h2>SUBTOTAL</h2>
                                            <p>{total} $</p>
                                        </div>
                                        <p><FiTruck size={18} /><b>Congratulations!</b>You have gotb <b>FREE Shipping</b></p>
                                        <p>Shipping & taxes calculated at checkout</p>
                                        <button className="cart__check-btn" onClick={ handleCheckUser}>
                                            Proceed to Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

            }


        </>
    );
}

export default Cart;


{/* <table class="table table-bordered">
<thead>
    <tr>
        <th scope="col" className="text-center" >Remove</th>
        <th scope="col" className="text-center">Image Product</th>
        <th scope="col" className="text-center">Name Product</th>
        <th scope="col" className="text-center">Price</th>
        <th scope="col" className="text-center">Quantity</th>
        <th scope="col" className="text-center">Total</th>
    </tr>
</thead>
<tbody>
    {
        cart.map((item, index) => {
            return (

                <tr>
                    <th className="text-center"><p className="cart__remove" onClick={() => removeProduct(item)}><AiOutlineDelete size={20} /></p></th>
                    <th scope="row" className="text-center">
                        <div className="cart__img">
                            <img src={item.url} style={{ width: "60px", height: "70px" }}></img>
                        </div>
                    </th>
                    <th>
                        <div className="cart__title">
                            <span>{item.title}</span>
                            <p className="cart__title-size"><a className="cart__title-sizeSamll">Size:</a>{item.size}</p>
                        </div>
                    </th>
                    <th scope="row" className="text-center cart__price">{item.price}</th>
                    <th scope="row" className="text-center">
                        <div className="cart__quantity-btn">
                            <button onClick={() => decrement(item)}>-</button><button className="quantity-count">{item.count}</button><button onClick={() => increment(item)}>+</button>
                        </div>
                    </th>
                    <th scope="row" className="text-center">${item.price * item.count}</th>
                </tr>
            )
        })
    }
    <tr >
        <th className="text-center">Tổng</th>
        <th className="text-center" colspan="5"><h3>${total}</h3></th>
    </tr>
</tbody>

</table> */}

   // <div key={index}>
                                            //     <img src={item.url} style={{ width: "50px" }}></img>
                                            //     <h1>Tên sản phẩm {item.title}</h1>
                                            //     <h3>số lượng  <button onClick={() => decrement(item)}>-</button>{item.count} <button onClick={() => increment(item)}>+</button> x {item.price} =  ${item.price * item.count}</h3>
                                            //     <h4>Size :{item.size}</h4>
                                            //     <button onClick={() => removeProduct(item)}>Xóa</button>
                                            // </div>