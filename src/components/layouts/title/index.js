import React, {PureComponent, PropTypes} from 'react';
import classnames from 'classnames';
import {getStyleFromProps} from '../../../utils/index';
import "./style.scss";

const H1 = (props) => <h1 {...props}>{props.children}</h1>;
const H2 = (props) => <h2 {...props}>{props.children}</h2>;
const H3 = (props) => <h3 {...props}>{props.children}</h3>;
const H4 = (props) => <h4 {...props}>{props.children}</h4>;
const H5 = (props) => <h5 {...props}>{props.children}</h5>;
const H6 = (props) => <h6 {...props}>{props.children}</h6>;

export default class Title extends PureComponent {
    getStyle(){
        return getStyleFromProps(['color', 'fontSize', 'marginTop', 'marginBottom'], this.props);
    }

    getComponentElement(){
        switch (this.props.element){
            case 'h1': return H1;
            case 'h2': return H2;
            case 'h3': return H3;
            case 'h4': return H4;
            case 'h5': return H5;
            case 'h6': return H6;
            default: return H1;
        }
    }

    render() {
        const ElementHeader = this.getComponentElement();
        const className = classnames(
            'tt-title',
            {[`tt-text-color-${this.props.styleColor}`]: this.props.styleColor},
            this.props.className
        )
        return <ElementHeader className={className} style={this.getStyle()}>
            {this.props.children}
        </ElementHeader>
    }
}

Title.defaultProps = {
    marginTop: 0,
    marginBottom: 0
}

Title.propTypes = {
    element: PropTypes.oneOf(['h1','h2','h3','h4','h5','h6']),
    styleColor: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    marginBottom: PropTypes.number,
    marginTop: PropTypes.number
}

