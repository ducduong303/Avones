import React, { useEffect } from 'react';
import HeaderTop from './HeaderTop';
import Banner from './Banner';
import SectionCover from './SectionCover';
import Shopify from './Shopify';
import Products from './Products';
import YourCart from './YourCart';
import Blog from './Blog';
import Footer from './Footer';
import { BiUpArrow } from 'react-icons/bi';


function Home(props) {
    useEffect(() => {
        const onTop = document.querySelector('.onTop')
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                onTop.classList.add('active')
            } else {
                onTop.classList.remove('active')
            }
        })
    }, [])
    return (
        <div className="home" id="home">
            <YourCart></YourCart>
            <HeaderTop></HeaderTop>
            <Banner></Banner>
            <SectionCover></SectionCover>
            <Shopify></Shopify>
            <Products></Products>
            <Blog></Blog>
            <Footer></Footer>
            <a href="#home" className="onTop"><BiUpArrow size={18}/></a>

        </div>
    );
}

export default Home;