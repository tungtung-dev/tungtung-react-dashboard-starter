import React, {Component, PropTypes} from 'react';

export default class MenuBar extends Component {
    render() {
        return (
            <div className="menu-bar">
                <a href="#" onClick={(e)=>{
                        e.preventDefault();
                        this.props.onClick();
                    }}>
                    <i className={this.props.showSidebar ? 'fa fa-close' : 'fa fa-bars'} ></i> Danh mục quản lý
                </a>
            </div>
        )
    }
}

MenuBar.propTypes = {
    showSidebar: PropTypes.bool,
    onClick: PropTypes.func
}
