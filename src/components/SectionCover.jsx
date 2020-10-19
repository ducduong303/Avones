import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
function SectionCover(props) {

    const [sectionCover, setSectionCover] = useState("");


    useEffect(() => {
        db.collection("section-cover").orderBy("create", 'desc').onSnapshot(snap => {
            snap.docs.map(doc => {
               return setSectionCover(doc.data().section)
            })
        })
    }, [])


    return (
        <div className="sectionCover">
            <div className="container sectionCover-inner ">
                <div className="row">
                    {
                        sectionCover && sectionCover.map((item, index) => {
                            return (
                                <div key={index} className="sectionCover-item col-lg-3 col-md-6">
                                    <img src={item.url} className="sectionCover-img" alt=""></img>
                                    <div className="sectionCover-text">
                                        <h5>{item.title}</h5>
                                        <span>{item.desc}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default SectionCover;