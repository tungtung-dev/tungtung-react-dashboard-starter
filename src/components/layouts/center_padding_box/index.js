import React, {PureComponent} from 'react';
import "./style.scss";

export default class CenterPaddingBox extends PureComponent{
    render(){
        return <div className="tt-layout-center-padding-box">
            {this.props.children}
        </div>
    }
}
