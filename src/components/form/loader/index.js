import React from 'react';
import "./index.scss";

export default ({className}) => (
    <div className={`loading-wrap ${className}`}>
        <ul className="loading-circle">
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
)

