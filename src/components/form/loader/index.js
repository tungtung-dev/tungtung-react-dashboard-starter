import React, {Component} from 'react';
import "./index.scss";

export default class Loader extends Component {
    render() {
        return (
            <div className={`loading-wrap ${this.props.className}`}>
                <ul className="loading-circle">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }
}

Loader.propTypes = {}