/* eslint-disable */
import React, {Component} from 'react';
import {CenterPaddingBox, Tabs, Box, Flex, Title} from '../../../components/layouts';
import {Button, MediumEditor} from '../../../components/form';
// import MediumEditor2 from '../../../components/form/medium-editor/index2';
// import MediumEditor3 from '../../../components/form/medium-editor-base/example2';
// import MediumEditor4 from '../../../components/form/medium-editor-base/example';
import {ChooseImagePopoverWrap} from '../../../components/media-manager';
import {Tab, TabList, TabPanel} from '@blueprintjs/core';

import {
    ImageSideButton,
    Block,
    addNewBlock,
    createEditorState,
    Editor,
} from 'medium-draft';


class CustomImageSideButton extends ImageSideButton {

    /*
     We will only check for first file and also whether
     it is an image or not.
     */
    onChange(media) {
        this.props.setEditorState(addNewBlock(
            this.props.getEditorState(),
            Block.IMAGE,
            {
                src: media.originalUrl,
            }
        ));
        this.props.close();
    }

    render() {
        return (
        <ChooseImagePopoverWrap onChoose={this.onChange}>
            <button
                className="md-sb-button md-sb-img-button"
                type="button"
                title="Add an Image"
            >
                <i className="fa fa-image" />
                <input
                    type="file"
                    ref={(c) => { this.input = c; }}
                    onChange={this.onChange}
                    style={{ display: 'none' }}
                />
            </button>
        </ChooseImagePopoverWrap>
        );
    }

}

export default class PageTabs extends Component {
    constructor(props) {
        super(props);

        this.sideButtons = [{
            title: 'Title',
            component: CustomImageSideButton
        }]

        this.state = {
            editorState: createEditorState(), // for empty content
        };

    }
    render() {
        return <CenterPaddingBox paddingTop={30}>
            <Flex marginBottom={10} alignItems="center" justifyContent="space-between">
                <Title styleColor="black-white" element="h2">
                    Post title lorem
                </Title>
                <Button className="btn-default">Edit</Button>
            </Flex>
            <Box sm>
                <Tabs>
                    <TabList>
                        <Tab>By draftjs</Tab>
                        <Tab>By markdown</Tab>
                    </TabList>
                    <TabPanel>
                        <h4>By markdown</h4>
                        <MediumEditor/>
                    </TabPanel>
                    <TabPanel>
                        <h4>Regular</h4>
                        <p>Regular man</p>
                    </TabPanel>
                </Tabs>
            </Box>
        </CenterPaddingBox>
    }
}
PageTabs.propTypes = {}