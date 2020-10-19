import React, { useContext, useState } from 'react';
import SectionTitle from './SectionTitle';
import { ContextProvider } from '../context/Context';
import { Link } from 'react-router-dom';

function Products(props) {
    const { products, addToCart ,user} = useContext(ContextProvider);
    const [count,setCount] = useState(1)
    return (
        <>
            <SectionTitle title="Editor's Pick"
                span="Shop our Editor's Picks for outfit inspiration and must-have looks">
            </SectionTitle>

            <div className="products">
                <div className="container">
                    <div className="products__box row">
                        {
                            products && products.map((item, index) => {
                                return (
                                    <div className="products__item col-lg-3 col-md-6 col-sm-12" key={index}>
                                        <div className="products__item-img">
                                            <Link to={`/product/${item.id}`}>  <img src={item.url} alt="" /></Link>
                                            {
                                                item.status ? <small className="products__item-picker">{item.status}</small> : null
                                            }
                                        </div>
                                        <div className="products__item-text">
                                            <div className="products__item-left">
                                                <p className="products__item-title">{item.title}</p>
                                                <span className="products__item-price">From ${item.price}</span>
                                            </div>
                                            {/* <div className="">
                                              
                                            </div> */}
                                            <button className="products__item-right" onClick={() => addToCart(item,count,item.size[0],user.uid)}>Buy</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;