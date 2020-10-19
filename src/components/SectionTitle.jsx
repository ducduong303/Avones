import React from 'react';

function SectionTitle(props) {
    return (
        <div className="section-title">
            <h3>{props.title}</h3>
            <span>{props.span}</span>
        </div>
    );
}

export default SectionTitle;