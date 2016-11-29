import React, {PureComponent, PropTypes} from 'react';
import Select, {Creatable} from 'react-select';
import {autobind} from 'core-decorators';
import ValidateWrapControl from '../validate-wrap-control/index';
import 'react-select/dist/react-select.css';
import Equal from 'deep-equal';
import "./style.scss"

const convertTagsToOptions = (tags) => {
    return tags.map(tag => ({
        label: tag,
        value: tag
    }))
}

export default class SelectTag extends PureComponent {
    constructor(){
        super(...arguments);
        this.state = {
            defaultTags: convertTagsToOptions(this.props.defaultTags)
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

    componentDidUpdate(prevProps){
        if(!Equal(prevProps.defaultTags, this.props.defaultTags)){
            this.setState({defaultTags: convertTagsToOptions(this.props.defaultTags)});
        }
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
