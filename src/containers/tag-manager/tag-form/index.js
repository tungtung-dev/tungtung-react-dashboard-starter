import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {InputText, Button} from 'components/form';

const fields = ['name'];

const validate = (values) => {
    let errors = {};
    if(!values.name) errors.name = 'Please fill name';
    return errors;
}

const form = {
    form: 'tagForm',
    fields,
    validate
}

@reduxForm(form)
export default class TagForm extends Component {
    render() {
        const {fields: {name}, handleSubmit, onSubmitTag} = this.props;
        return <form className="form" onSubmit={handleSubmit(onSubmitTag)}>
            <InputText title="Tag name" {...name}/>
            <Button className="btn-default">{this.props.editable ? 'Update' : 'Create'}</Button>
        </form>
    }
}
TagForm.defaultProps = {
    onSubmitTag: PropTypes.func
}
TagForm.propTypes = {
    onSubmitTag: PropTypes.func,
    editable: PropTypes.bool
}


