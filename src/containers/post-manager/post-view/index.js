import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import marked from 'marked';
import {Link} from 'react-router';
import {CenterPaddingBox, Box, Flex, Title, SpinnerOverlay, Breadcrumb, Col, Row} from 'components/layouts';
import  MediumEditor from 'components/form/medium-editor';
import {getPost, clearPost} from 'redux/actions/postAction';
import {connect} from 'utils/reduxAwait';
import {toShortString} from 'utils';

import {DRAFTJS_CONTENT_TYPE, MARKDOWN_CONTENT_TYPE} from '../constants';

import "./style.scss";

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

@connect((state) => ({
    currentPost: state.post.currentPost
}), dispatch => bindActionCreators({getPost, clearPost}, dispatch))
export default class PostView extends Component {
    props: {
        currentPost: PostType
    }

    static PropTypes = {
        currentPost: PropTypes.object
    }

    componentDidMount() {
        const {params:{postKey}, currentPost} = this.props;
        if (currentPost.slug !== postKey) {
            this.props.getPost(postKey);
        }
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    render() {
        const {currentPost: {title, slug, content, customField: {contentType, markdownContent}}, awaitStatuses} = this.props;
        return <CenterPaddingBox paddingTop={30}>
            <Breadcrumb id="post_view_title" name={toShortString(title, 10, 20)}/>
            {awaitStatuses.getPost === 'pending' && <SpinnerOverlay backgroundColor="rgba(255,255,255,.7)" fixed/>}
            <Box>
                <Flex alignItems="center" justifyContent="flex-end">
                    <Link to={`/posts/edit/${slug}`} className="btn btn-default">
                        Edit
                    </Link>
                </Flex>
                <Row>
                    <Col md={{size: 8, offset: 2}}>
                        <Flex marginBottom={10} alignItems="center" justifyContent="space-between">
                            <Title element="h1">
                                {title}
                            </Title>
                        </Flex>
                        <div className="tt-post-view">
                            {contentType === MARKDOWN_CONTENT_TYPE && markdownContent &&
                            <div dangerouslySetInnerHTML={{__html: marked(markdownContent)}}/>
                            }
                            {contentType === DRAFTJS_CONTENT_TYPE && typeof content === 'object' &&
                            <MediumEditor onChange={() => {}} defaultValue={content} readOnly/>
                            }
                        </div>
                    </Col>
                </Row>
            </Box>
        </CenterPaddingBox>
    }
}
