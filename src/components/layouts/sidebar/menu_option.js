import React, {Component, PropTypes} from 'react';

export default class MenuOption extends Component {
    render() {
        const {icon, name} = this.props;
        const isOptionName = icon || name;
        const isChildrenArray = Array.isArray(this.props.children);
        return (
            <div className="menu-option">
                {isOptionName && <div className="option-name">
                    <div className="line"></div>
                    <span className="name"><i className={icon}/> {name}</span>
                </div>}
                <ul className="lists">
                    {!isChildrenArray && React.cloneElement(this.props.children, {
                        currentPath: this.props.currentPath
                    })}
                    {isChildrenArray && this.props.children.map((children, index) => {
                        if (children.type === 'hr') return children;
                        return React.cloneElement(children, {
                            currentPath: this.props.currentPath,
                            key: index
                        });
                    })}
                </ul>
            </div>
        )
    }
}

MenuOption.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string
}
