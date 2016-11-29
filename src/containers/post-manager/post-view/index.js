import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import marked from 'marked';
import {Link} from 'react-router';
import {Tab, TabList, TabPanel} from '@blueprintjs/core';
import {CenterPaddingBox, Tabs, Box, Flex, Title, SpinnerOverlay, Breadcrumb} from '../../../components/layouts';
import {connect} from '../../../utils/reduxAwait';
import {toShortString} from '../../../utils';
import {Button, ButtonGroupDropdown} from '../../../components/form';
import {getPost, clearPost} from '../../../redux/actions/postAction';

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
        const {params:{postSlug}, currentPost} = this.props;
        if(currentPost.slug !== postSlug){
            this.props.getPost(postSlug);
        }
    }

    render() {
        const {currentPost: {title, slug, content}, awaitStatuses} = this.props;
        return <CenterPaddingBox paddingTop={30}>
            <Breadcrumb id="post_view_title" name={toShortString(title, 10, 20)}/>
            {awaitStatuses.getPost === 'pending' && <SpinnerOverlay backgroundColor="rgba(255,255,255,.7)" fixed/>}
            <Flex marginBottom={10} alignItems="center" justifyContent="space-between">
                <Title styleColor="black-white" element="h2">
                    {title}
                </Title>
                <Link to={`/posts/edit/${slug}`} className="btn btn-default">
                    Edit
                </Link>
            </Flex>
            <Box sm>
                <Tabs>
                    <TabList>
                        <Tab>By markdown</Tab>
                        <Tab>By draftjs</Tab>
                    </TabList>
                    <TabPanel>
                        {content && <div className="tt-post-view" dangerouslySetInnerHTML={{__html: marked(content)}}/>}
                    </TabPanel>
                    <TabPanel>
                        <h4>No content</h4>
                    </TabPanel>
                </Tabs>
            </Box>
        </CenterPaddingBox>
    }
}
