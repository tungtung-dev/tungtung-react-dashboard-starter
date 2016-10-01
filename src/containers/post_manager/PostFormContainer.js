import React, {Component} from 'react';
import {reduxForm} from 'redux-form'
import {Post} from '../../components/index';

class PostFormContainer extends Component {
    render() {
        return (
            <div>
                <Post.PostForm fields={this.props.fields}/>
            </div>
        )
    }
}

const fields = ['title','description','content']

const form = {
    form: 'postForm',
    fields
}

export default reduxForm(form)(PostFormContainer)
