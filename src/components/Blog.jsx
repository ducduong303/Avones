import React, { useContext } from 'react';
import SectionTitle from './SectionTitle';
import { ContextProvider } from '../context/Context';

function Blog(props) {
    const { blog } = useContext(ContextProvider);
    return (
        <>
            <SectionTitle title="Fresh From Our Blog"
                span="You are going to love this amazing shopify theme.">
            </SectionTitle>
            <div className="blog">
                <div className="container">
                    <div className="row">
                        {
                            blog.map((item, index) => {
                                return (
                                    <div key={index} className="blog__item col-lg-4 col-md-6 col-sm-12">
                                        <img src={item.url} alt="" />
                                        <div className="blog__item-text">
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
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

export default Blog;