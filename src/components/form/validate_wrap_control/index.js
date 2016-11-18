import React,{PureComponent, PropTypes} from 'react';
import {FormGroup, Col, Label} from 'reactstrap';
import classnames from 'classnames';
import "./style.scss";

export default class ValidateWrapControl extends PureComponent {
    renderLabel(){
        const {icon, title, rightComponent} = this.props;
        return <div className="flex align-center justify-space-between">
            {title && <Label className="label tt-form-label" style={{fontWeight: 600}}>
                {icon && <span><i className={icon}></i>{' '}</span>}{title}
            </Label>}
            {rightComponent && <span>{rightComponent}</span>}
        </div>
    }

    renderError(){
        const {touched, error} = this.props;
        if(touched && error)
            return <div className="form-control-feedback">
                {error}
            </div>
        return null;
    }

    renderControl() {
        const {touched, error} = this.props;
        const status = (touched && error) ? 'danger' : null;

        const controlClone = React.cloneElement(
            this.props.children,
            {
                className: classnames(
                    this.props.children.props.className,
                    status ? `form-control-${status}` : ''
                )
            }
        )

        let style = {};
        if(this.props.noBottom){
            style = {marginBottom: 0}
        }

        return <FormGroup className={`has-${status}`} style={style}>
            {this.renderLabel()}
            {controlClone}
            {this.renderError()}
        </FormGroup>
    }

    render() {
        if (this.props.col) return <Col md={this.props.col}>{this.renderControl()}</Col>;
        return this.renderControl();
    }
}

ValidateWrapControl.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.any,
    touched: PropTypes.bool,
    error: PropTypes.string,
    col: PropTypes.number,
    rightComponent: PropTypes.func,
    noBottom: PropTypes.bool
}