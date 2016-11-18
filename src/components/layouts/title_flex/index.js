import React, {PureComponent} from 'react';
import "./style.scss";

export default class TitleFlex extends PureComponent{
    render(){
        return <div className="tt-title-flex">
            <div className="title">
                {this.props.title}
            </div>
            <div className="actions">
                {this.props.actions}
            </div>
        </div>
    }
}