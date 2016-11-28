import React, {PureComponent, PropTypes} from 'react';
import Select, {Creatable} from 'react-select';
import {autobind} from 'core-decorators';
import ValidateWrapControl from '../validate-wrap-control/index';
import 'react-select/dist/react-select.css';
import "./style.scss"

export default class SelectTag extends PureComponent {
    constructor(){
        super(...arguments);
        this.state = {
            defaultTags: this.props.defaultTags.map(tag => ({
                label: tag,
                value: tag
            }))
        }
    }

    getValue() {
        if (Array.isArray(this.props.value)) {
            return this.props.value.join(',')
        }
        return this.props.value;
    }

    @autobind
    handleChange(items){
        this.props.onChange(
            items.map((item) => item.value)
        );
    }

    getComponent(){
        if(this.props.createable) return Creatable;
        else return Select;
    }

    render() {
        const Component = this.getComponent();
        return (
            <ValidateWrapControl {...this.props}>
                <Component multi
                            {...this.props}
                           options={this.state.defaultTags}
                           value={this.getValue()}
                           onChange={this.handleChange}
                           onBlur={()=>{this.props.onBlur(this.props.value)}}
                />
            </ValidateWrapControl>
        )
    }
}

SelectTag.defaultProps = {
    defaultTags: [],
    createable: false
}
SelectTag.propTypes = {
    defaultTags: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    createable: PropTypes.bool
}
