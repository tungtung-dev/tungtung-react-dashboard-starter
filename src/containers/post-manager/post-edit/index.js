import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Breadcrumb} from '../../../components/layouts/index';
import {PostAction} from '../../../redux/actions';
import {connect} from '../../../utils/reduxAwait';
import PostForm from '../post-form';

const mapStateToProps = (state, ownProps) => {
    const post = state.post.lists.data.find(post => post.id === ownProps.params.post_id);
    return {
        post
    }
}

@connect(mapStateToProps, dispatch => bindActionCreators(PostAction, dispatch))
export default class PostEdit extends Component {
    props : {
        post: PostType
    }
    render() {
        return <div>
            <Breadcrumb id="edit-post" name={this.props.post.title}/>
            <PostForm initialValues={this.props.post}/>
        </div>
    }
}
PostEdit.propTypes = {}

