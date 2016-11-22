import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Breadcrumb} from '../../../components/layouts/index';
import {PostAction} from '../../../redux/actions';
import {connect} from '../../../utils/reduxAwait';
import PostForm from '../post-form';

const mapStateToProps = (state, ownProps) => {
    const {current_post} = state.post;
    return {
        post: current_post
    }
}

@connect(mapStateToProps, dispatch => bindActionCreators(PostAction, dispatch))
export default class PostEdit extends Component {
    props : {
        post: PostType
    }

    componentDidMount(){
        const {post_id} = this.props.params;
        this.props.getPost(post_id);
    }

    componentWillUnmount(){
        this.props.clearPost();
    }

    render() {
        const {awaitStatuses: {getPost}} = this.props;
        return <div>
            <Breadcrumb id="edit-post" name={this.props.post.title}/>
            <PostForm isLoading={getPost === 'pending'} initialValues={this.props.post}/>
        </div>
    }
}
PostEdit.propTypes = {}

