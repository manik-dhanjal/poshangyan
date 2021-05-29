import React from 'react'
import Styles from "./not-found.styles"

const NotFound = () => {
    return (
        <Styles>
            <div className='container'>
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
                <div class="msg">
                    <h1>Page Not Found</h1>
                    <p>Let's go <a href="#">home</a> and try from there.</p>
                </div>
            </div>
        </Styles>
    )
}

export default NotFound
