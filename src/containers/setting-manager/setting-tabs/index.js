import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import {Tabs, CenterPaddingBox, Box, Flex, Title, Toaster} from 'components/layouts';
import {InputText, Textarea, SelectImagePopover, Button} from 'components/form';
import {Tab, TabList, TabPanel} from '@blueprintjs/core';

import settingAction from 'redux/actions/settingAction';

const fields = [
    'general.logo','general.title','general.description'
]

const formConfig = {
    form : 'settingForm',
    fields
}

@reduxForm(formConfig, (state) => ({
    initialValues: state.setting
}), dispatch => bindActionCreators(settingAction, dispatch))
export default class SettingTabs extends Component {
    renderGeneral(){
        const  {general: {logo, title, description}} = this.props.fields;
        return <div>
            <SelectImagePopover title="Logo" {...logo} media={logo.value}/>
            <InputText title="Title" {...title}/>
            <Textarea title="Description" {...description}/>
        </div>
    }

    renderBankAccount(){
        return <div>
            <InputText title="Bank account"/>
        </div>
    }

    @autobind
    onSubmit(dataValues){
        this.props.updateSettings(dataValues);
        Toaster.show({message: 'Update successfully', intent: 1});
    }

    render() {
        const {handleSubmit} = this.props;
        return <CenterPaddingBox>
            <Flex alignItems="center" justifyContent="space-between" marginBottom={10}>
                <Title element="h2" styleColor="black-white" fontWeight={600}>
                    Setting
                </Title>
                <Button className="btn-default" onClick={handleSubmit(this.onSubmit)}>Cập nhật</Button>
            </Flex>
            <Box>
                <Tabs>
                    <TabList>
                        <Tab>General</Tab>
                        <Tab>Bank account</Tab>
                    </TabList>
                    <TabPanel>
                        {this.renderGeneral()}
                    </TabPanel>
                    <TabPanel>
                        {this.renderBankAccount()}
                    </TabPanel>
                </Tabs>
            </Box>
        </CenterPaddingBox>
    }
}

SettingTabs.propTypes = {}
