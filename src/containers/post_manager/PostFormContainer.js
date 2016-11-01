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

const mapStateToProps = () => {
    return {
        initialValues: {
            title: 'Good job man',
            description: 'Mọi người làm việc tốt lắm :smile: \n good job man',
            content: `Cool, we can have all sorts of Emojis here. 🙌
🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`
        }
    }
}

export default reduxForm(form, mapStateToProps)(PostFormContainer)
