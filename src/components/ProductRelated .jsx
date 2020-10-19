import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ContextProvider } from '../context/Context';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

function ProductRelated (props) {
    const { products } = useContext(ContextProvider);
    const [product,setProduct] = useState([])
    

    const getRelatedProduct = () =>{
        const relatedProduct = products.slice(0,4)
        setProduct(relatedProduct)
    } 
    
    useEffect(() =>{
        getRelatedProduct()
    },[])

  
    
    
    return (
        <>
            <SectionTitle title="Related Products"
                span="You can stop autoplay, increase/decrease aniamtion speed and number of grid to show and products from store admin.">
            </SectionTitle>
            <div className="products ">
                <div className="container">
                    <div className="products__box row">
                        {
                            product && product.map((item, index) => {
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
                                            <button  className="products__item-right">Buy</button>
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

export default ProductRelated ;