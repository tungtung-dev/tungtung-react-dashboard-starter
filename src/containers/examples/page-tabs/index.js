import React, {Component} from 'react';
import {CenterPaddingBox, Tabs, Box, Flex, Title} from '../../../components/layouts';
import {Button} from '../../../components/form';
import {Tab, TabList, TabPanel} from '@blueprintjs/core';

export default class PageTabs extends Component {
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
                        <p>Content by draftjs</p>
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