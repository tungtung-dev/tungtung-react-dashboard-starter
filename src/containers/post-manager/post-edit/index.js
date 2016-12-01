import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {autobind} from 'core-decorators';
import {Breadcrumb, Toaster} from 'components/layouts';
import {getPost, updateCurrentPost, clearPost} from 'redux/actions/postAction';
import {connect} from 'utils/reduxAwait';
import {toShortString} from 'utils';
import {PostApi} from 'api';
import PostForm from '../post-form';

const mapStateToProps = (state, ownProps) => {
    const {currentPost} = state.post;
    return {
        currentPost
    }
}

@connect(mapStateToProps, dispatch => bindActionCreators({getPost, updateCurrentPost, clearPost, push}, dispatch))
export default class PostEdit extends Component {
    props: {
        currentPost: PostType
    }
    state = {
        isUpdating: false
    }

    componentDidMount() {
        const {params: {postSlug}, currentPost} = this.props;
        // if (currentPost.slug !== postSlug) {
            this.props.getPost(postSlug);
        //}
    }

    componentDidUpdate(){
        if(this.props.currentPost.success === false){
            this.props.push('/posts');
            Toaster.show({message:'Your post haven\'t exists', intent: 2});
        }
    }

    @autobind
    handleSubmit(dataPost, dispatch) {
        const {slug} = this.props.currentPost;
        return new Promise((resolve, reject) => {
            this.setState({isUpdating: true});
            PostApi.updatePost(slug, dataPost).then(postRes => {
                if (postRes.slug) {
                    this.setState({isUpdating: false});
                    dispatch(updateCurrentPost(postRes));
                    Toaster.show({message:'Update post successfully', intent: 1});
                    resolve();
                }
                else {
                    reject({title: 'Can\'t update post'});
                }
            });
        });
    }

    @autobind
    handleDelete(){
        const {params: {postSlug}} = this.props;
        return PostApi.deletePost(postSlug);
    }

    render() {
        const {awaitStatuses: {getPost}, currentPost} = this.props;
        return <div>
            <Breadcrumb id="edit-post" name={toShortString(currentPost.title, 10, 20)}/>
            <PostForm
                isLoading={getPost === 'pending'}
                isUpdating={this.state.isUpdating}
                onSave={this.handleSubmit}
                onTrash={this.handleTrash}
                onDelete={this.handleDelete}
                initialValues={currentPost}
                post={currentPost}
                editable
            />
        </div>
    }
}
PostEdit.propTypes = {}

