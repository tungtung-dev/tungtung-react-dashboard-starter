import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {ValidateWrapControl} from 'components/form';
import {restructureCategories} from '../utils';


const convertCategoriesToOptions = (categories = [], exceptValues = [], showNoParent = true) => {
    let defaultOptions = showNoParent ? [{value: 0, label: 'No parent'}] : '';
    let customCategories = restructureCategories(categories)
        .filter(category => exceptValues.indexOf(category.id) === -1)
        .map((category) => ({
            value: category.id,
            label: category.nameWithLine
        }));

    return [
        ...defaultOptions,
        ...customCategories
    ]
}

@connect((state, ownProps) => {
    return {
        options: convertCategoriesToOptions(state.defaultLoad.categories, ownProps.exceptValues, ownProps.showNoParent)
    }
})
export default class CategorySelect extends Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    render() {
        return <ValidateWrapControl {...this.props}>
            <Select
                name="form-field-name"
                placeholder="Select parent category"
                value={this.props.value ? this.props.value : 0}
                options={this.props.options}
                onChange={this.props.onChange}
            />
        </ValidateWrapControl>
    }
}
CategorySelect.propTypes = {}