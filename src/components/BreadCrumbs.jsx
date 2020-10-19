import React from 'react';
import { Link } from 'react-router-dom';

function BreadCrumbs(props) {
    return (
        <div className="breadcrumbs">
            <div className="container">
                <div className="breadcrumbs-inner">
                    <Link to="/">{props.home}</Link>
                    <span>|</span>
                    <Link to={props.href}><strong>{props.title}</strong></Link>
                    {
                        props.nameProduct ?   <> <span>|</span><Link to="/"><strong>{props.nameProduct}</strong></Link></> : ""
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default BreadCrumbs;