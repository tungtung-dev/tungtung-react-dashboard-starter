import React, {Component} from 'react';
import {Breadcrumb} from '../../../components/layouts/index';
import PostForm from '../post-form';

export default class PostCreate extends Component {
    render() {
        return <div>
            <Breadcrumb id="new-post" name="New Post"/>
            <PostForm/>
        </div>
    }
}
PostCreate.propTypes = {}

