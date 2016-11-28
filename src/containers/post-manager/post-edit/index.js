import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {autobind} from 'core-decorators';
import {Breadcrumb} from '../../../components/layouts/index';
import {getPost, updateCurrentPost, clearPost} from '../../../redux/actions/postAction';
import {connect} from '../../../utils/reduxAwait';
import {PostApi} from '../../../api';
import PostForm from '../post-form';

const mapStateToProps = (state, ownProps) => {
    const {currentPost} = state.post;
    return {
        currentPost
    }
}

@connect(mapStateToProps, dispatch => bindActionCreators({getPost, updateCurrentPost, clearPost}, dispatch))
export default class PostEdit extends Component {
    props : {
        currentPost: PostType
    }
    state = {
        isLoading: false
    }

    componentDidMount(){
        const {params: {postSlug}, currentPost} = this.props;
        if(currentPost.slug !== postSlug){
            this.props.getPost(postSlug);
        }
    }

    @autobind
    handleSubmit(dataPost, dispatch){
        const {slug} = this.props.currentPost;
        return new Promise((resolve, reject) => {
            this.setState({isLoading: true});
            PostApi.updatePost(slug, dataPost).then(postRes => {
                if(postRes.slug){
                    this.setState({isLoading: false});
                    dispatch(updateCurrentPost(postRes));
                    resolve();
                }
                else{
                    reject({title: 'Can\'t update post'});
                }
            });
        });
    }

    render() {
        const {awaitStatuses: {getPost}, currentPost} = this.props;
        return <div>
            <Breadcrumb id="edit-post" name={currentPost.title}/>
            <PostForm
                isLoading={getPost === 'pending' || this.state.isLoading}
                onSave={this.handleSubmit}
                initialValues={currentPost}
                slug={currentPost.slug}
                editable
            />
        </div>
    }
}
PostEdit.propTypes = {}

