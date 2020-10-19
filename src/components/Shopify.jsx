import React from 'react';
import SectionTitle from './SectionTitle';
import women from "../assets/image/women.webp";
import men from "../assets/image/men.webp";
import backpack from "../assets/image/backpack.webp";
import sunglasses from "../assets/image/sunglasses.jpg";

function Shopify(props) {
    return (
        <>
            <SectionTitle
                title="Shop The Edit"
                span="The easiest and fastest way to create grid banners.">
            </SectionTitle>
            <div className="shopify">
                <div className="container">
                    <div className="shopify__inner">
                        <div className="shopify__inner-item item-one">
                            <img className="shopify__inner-img" src={women} alt="" />
                            <div className="shopify__inner-small">
                                <span>Women</span>
                            </div>
                        </div>
                        <div className="shopify__inner-item item-two">
                            <img className="shopify__inner-img" src={men} alt="" />
                            <div className="shopify__inner-small">
                                <span>Men</span>
                            </div>
                        </div>
                        <div className="shopify__inner-item item-three ">
                            <div className="shopify__inner-box">
                                <img className="shopify__inner-img" src={backpack} alt="" />
                                <div className="shopify__inner-small">
                                    <span>Backpack</span>
                                </div>
                            </div>
                            <div className="shopify__inner-box">
                                <img className="shopify__inner-img" src={sunglasses} alt="" />
                                <div className="shopify__inner-small">
                                    <span>Accessories</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Shopify;