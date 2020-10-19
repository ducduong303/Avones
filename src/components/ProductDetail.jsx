import React, { useState, useContext, useEffect, useRef } from 'react';
import moment from 'moment';
import HeaderTop from './HeaderTop';
import BreadCrumbs from './BreadCrumbs';

import { BsHeart, BsQuestionCircle } from 'react-icons/bs';
import { IoMdPaperPlane } from 'react-icons/io';
import { AiOutlineMail, AiOutlineSync } from 'react-icons/ai';
import { FiTruck, FiClock } from 'react-icons/fi';

import { ContextProvider } from '../context/Context';
import ProductRelated from './ProductRelated ';
import YourCart from './YourCart';

function ProductDetail(props) {
    const { products, addToCart, user } = useContext(ContextProvider);

    const imgMouse = useRef();
    const [product, setProduct] = useState([]);
    const [count, setCount] = useState(1)
    // handle Size and Img 
    const [indexImg, setIndex] = useState(0);
    const [indexSize, setIndexSize] = useState(0);
    const [size, setSize] = useState("M")
    // Xử lý product Detail lấy id
    const getProduct = () => {
        if (props.match.params.id) {
            const data = products && products.filter(item => {
                return item.id == props.match.params.id
            })
            setProduct(data);
        }
    }
    useEffect(() => {
        getProduct();
    }, [props.match.params.id])

    // handle nameProduct
    const nameTitle = product.map((item) => item.title);

    const handleSize = (sizeItem, index) => {
        setSize(sizeItem);
        setIndexSize(index)
    }

    // handle Zoom
    const handleMouse = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 200
        const y = (e.pageY - top) / height * 100
        imgMouse.current.style.backgroundPosition = `${x}% ${y}%`
    }





    return (
        <>
            <HeaderTop></HeaderTop>
            <BreadCrumbs
                home="Home"
                href="/"
                title="Products"
                nameProduct={nameTitle}

            ></BreadCrumbs>

            <YourCart></YourCart>
            {
                product && product.map((item, index) => {
                    return (


                        <div key={index} className="product-detail">
                            <div className="container">
                                <div className="product-detail__box">
                                    <div className="product-detail__right col-lg-6">
                                        <div className="col-lg-2 product-detail__imgsamll">
                                            {
                                                item.image.map((img, i) => {
                                                    return (
                                                        <img key={i} className="col-lg-12" alt="" style={{ opacity: indexImg === i ? "0.5" : "" }} src={img} onClick={() => setIndex(i)}></img>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="col-lg-10 product-detail__imgbig"
                                            style={{ backgroundImage: `url("${item.image[indexImg]}")` }}
                                            onMouseMove={handleMouse}
                                            ref={imgMouse}
                                            onMouseLeave={() => imgMouse.current.style.backgroundPosition = `center`}
                                        >
                                        </div>
                                    </div>
                                    <div className="product-detail__desc col-lg-6">
                                        <p>Amyra</p>
                                        <h1>{item.title}</h1>
                                        <div className="product-detail__desc-info">
                                            <span>4 review </span>
                                            <p className="instock">In Stock</p>
                                            <p>SKU: AV01-D-32</p>
                                        </div>
                                        <p className="product-detail__desc-price">${item.price}</p>
                                        <p className="product-detail__desc-p">{item.desc}</p>
                                        <div className="product-detail__desc-size">
                                            <p><span>SIZE:</span> <strong>{size}</strong> </p>
                                            {
                                                item.size.map((itemSize, index) => {
                                                    return (
                                                        <button key={index} style={{ border: indexSize === index ? "1px solid #f77575" : "" }} onClick={() => handleSize(itemSize, index)}>{itemSize}</button>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="product-detail__desc-infolink">
                                            <a href="/"><BsHeart />Add to Wishlist</a>
                                            <a href="/"><IoMdPaperPlane /> Delivery & Returns</a>
                                            <a href="/"><AiOutlineMail /> Enquiry</a>
                                        </div>
                                        <div className="product-detail__desc-action">
                                            <div className="product-detail__desc-quantity">
                                                <button onClick={count > 1 ? () => setCount(currCount => currCount - 1) : ""}>-</button>
                                                <span>{count}</span>
                                                <button onClick={() => setCount(currCount => currCount + 1)}>+</button>
                                            </div>
                                            <div className="product-detail__desc-add">
                                                <button className="btn-add" onClick={() => addToCart(item, count, size, user.uid)}>ADD To CART</button>
                                            </div>
                                        </div>
                                        <p className="product-detail__desc-time"><FiTruck size={18} /> <b>Congratulations! </b>You have got <b>FREE Shipping</b> </p>
                                        <p className="product-detail__desc-time"><FiClock size={18} /> Estimated delivery between <b>{moment(Date.now()).format("MMM Do YY")}</b> </p>

                                        <div className="product-detail__desc-storeFeatures">
                                            <p><FiTruck size={18} />Free Shipping & Return</p>
                                            <p><AiOutlineSync size={18} />Money back guarantee</p>
                                            <p><BsQuestionCircle size={18} />Fast & reliable support</p>
                                        </div>
                                        <p><span>Type : </span> Dress</p>
                                        <p className="product-detail__desc-option"><span>Collections :</span>
                                            <a href="/">All Products,</a>
                                            <a href="/">Beachwear,</a>
                                            <a href="/">Hot Collection,</a>
                                            <a href="/">New Arrivals,</a>
                                            <a href="/">Women</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
            <ProductRelated />
        </>
    );
}

export default ProductDetail;
