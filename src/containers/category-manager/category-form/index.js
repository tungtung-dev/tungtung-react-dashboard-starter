import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {autobind} from 'core-decorators';
import {InputText, Button} from 'components/form';
import SelectCategory from '../select-category';

const fields = ['name', 'parentId'];

const validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = 'Please fill name';
    return errors;
}

const form = {
    form: 'categoryForm',
    fields,
    validate
}

@reduxForm(form, () => ({
    ref: 'categoryFormDeep'
}))
export default class CategoryForm extends Component {
    @autobind
    handleSubmitCategory(values, dispatch) {
        return this.props.onSubmitCategory(values, dispatch, this.props.resetForm);
    }

    render() {
        const {fields: {name, parentId}, handleSubmit} = this.props;
        return <form className="form" onSubmit={handleSubmit(this.handleSubmitCategory)}>
            <InputText title="Category name" {...name}/>
            <SelectCategory
                title="Parent"
                exceptValues={[this.props.currentCategory.id]}
                {...parentId}
            />
            <Button className="btn-default">{this.props.editable ? 'Update' : 'Create'}</Button>
        </form>
    }
}
CategoryForm.defaultProps = {
    onSubmitCategory: PropTypes.func
}
CategoryForm.propTypes = {
    onSubmitCategory: PropTypes.func,
    editable: PropTypes.bool
}


