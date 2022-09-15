import React from 'react'
import Styles from "./not-found.styles"

const NotFound = () => {
    return (
        <Styles>
            <div className='container'>
                <div className="err">4</div>
                <i className="far fa-question-circle fa-spin"></i>
                <div className="err2">4</div>
                <div className="msg">
                    <h1>Page Not Found</h1>
                    <p>Let's go <a href="#">home</a> and try from there.</p>
                </div>
            </div>
        </Styles>
    )
}

export default NotFound
