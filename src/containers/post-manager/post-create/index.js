import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {push} from 'react-router-redux';
import {Breadcrumb, Toaster} from '../../../components/layouts';
import {updateCurrentPost} from '../../../redux/actions/postAction';
import {PostApi} from '../../../api'
import PostForm from '../post-form';

export default class PostCreate extends Component {
    state = {
        isLoading: false
    }

    @autobind
    handleSubmit(dataPost, dispatch){
        this.setState({isLoading: true});

        return new Promise((resolve, reject) => {
            this.setState({isLoading: true});
            PostApi.createPost(dataPost).then(postRes => {
                if(postRes.slug){
                    this.setState({isLoading: false});
                    dispatch(updateCurrentPost(postRes));
                    dispatch(push(`/posts/edit/${postRes.slug}`));
                    Toaster.show({message: 'Created post success', intent: 1})
                    resolve();
                }
                else{
                    reject({title: 'Can\'t create post'});
                }
            })
        });
    }

    render() {
        return <div>
            <Breadcrumb id="new-post" name="New Post"/>
            <PostForm isLoading={this.state.isLoading} onSave={this.handleSubmit}/>
        </div>
    }
}
PostCreate.propTypes = {}

