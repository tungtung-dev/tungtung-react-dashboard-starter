import React,{Component, PropTypes} from 'react';
import {FormGroup, Col, Label} from 'reactstrap';

export default class ValidateWrapControl extends Component {
    renderControl() {
        const {title, touched, error} = this.props;
        const status = (touched && error) ? 'danger' : null;

        return <FormGroup className={`has-${status}`}>
            {title && <Label className="label" style={{fontWeight: 600}}>
                {this.props.icon && <span><i className={this.props.icon}></i>{' '}</span>}{title}
            </Label>}
            {React.cloneElement(this.props.children, {className: `form-control-${status}`})}
            {touched && error && <div className="form-control-feedback">{error}</div>}
        </FormGroup>
    }

    render() {
        if (this.props.col) return <Col md={this.props.col}>{this.renderControl()}</Col>;
        return this.renderControl();
    }
}

ValidateWrapControl.propTypes = {
    title: PropTypes.any,
    touched: PropTypes.bool,
    error: PropTypes.string
}