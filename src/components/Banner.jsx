import React, { useState, useEffect } from 'react';
// Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from '../config/firebase';
function Banner(props) {
    const [photoUrls, setPhotoUrls] = useState("");
    useEffect(() => {
        db.collection("banner").orderBy("create", 'desc').onSnapshot(snap => {
            snap.docs.map(doc => {
               return setPhotoUrls(doc.data().photo)
            })
        })
    }, [])
    var settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: "slides",
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <Slider {...settings}>
            {
                photoUrls && photoUrls.map((item, index) => {
                    const styleBanner = {
                        backgroundImage: "url(" + item.url + ")"
                    }
                    return (
                        <div className="banner__item" key={item}>
                            <div className="banner__item-img" style={styleBanner} ></div>
                            <div className={`${index === 0 ? "banner__item-title item1" : "banner__item-title item2"}`}>
                                <div className="banner__item-box">
                                    <p className="small-title">{item.small_title}</p>
                                    <h2><b>{item.title}</b></h2>
                                    <span className="small">{item.small}</span>
                                    <button className="banner__item-btn">Shop Now</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Slider>

    );
}

export default Banner;