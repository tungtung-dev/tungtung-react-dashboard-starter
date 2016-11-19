/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'reactstrap';
import {reduxForm} from 'redux-form';
import {autobind} from 'core-decorators';
import {
    InputText,
    MDEditor,
    Button,
    Textarea,
    SelectTag,
    SelectImage,
    SelectImagePopover,
    DraftjsEditor,
    Switch,
    Checkbox
} from '../../../components/form/index';
import {Box, Flex, Title, Icon, CenterPaddingBox, SpinnerOverlay, Tabs} from '../../../components/layouts/index';
import {Spinner} from '@blueprintjs/core';

const DRAFTJS_CONTENT_TYPE = 'CONTENT-TYPE/draftjs';
const MARKDOWN_CONTENT_TYPE = 'CONTENT-TYPE/markdown';

const TABS_CONTENT_TYPE = [
    {text: 'Draftjs',value: DRAFTJS_CONTENT_TYPE},
    {text: 'Markdown',value: MARKDOWN_CONTENT_TYPE},
]

const fields = ['title','description','tags','content_type','content','featured_image','secondary_featured_image','is_public']

const form = {
    form: 'postForm',
    fields
}

const mapStateToProps = () => {
    return {}
}

@reduxForm(form, mapStateToProps)
export default class PostForm extends Component {
    static propTypes = {
        isLoading: PropTypes.bool
    }

    state = {
        checked: false
    }

    renderContentType(){
        const {fields: {content_type, content}} = this.props;
        switch (content_type.value){
            case MARKDOWN_CONTENT_TYPE:
                return <MDEditor {...content}/>;
            case DRAFTJS_CONTENT_TYPE:
                return <DraftjsEditor isBorder title="Content" {...content}/>;
            default:
                return <DraftjsEditor isBorder title="Content" {...content}/>;
        }
    }

    renderTabContent(){
        const {fields: {content_type}} = this.props;
        return <div>
            <Tabs tabs={TABS_CONTENT_TYPE} tabSelected={content_type.value ? content_type.value : DRAFTJS_CONTENT_TYPE} onChange={content_type.onChange}/>
            {this.renderContentType()}
        </div>
    }

    renderMainContent(){
        const {fields: {title, description, tags}} = this.props;
        return <div>
            <InputText title="Title" {...title}/>
            <SelectTag title="Tags" {...tags}/>
            <Textarea title="Description" {...description}/>
            {this.renderTabContent()}
        </div>
    }

    @autobind
    handleCheckbox(e){
        this.setState({checked: e.target.checked});
    }

    renderOptions(){
        const {fields: {featured_image, secondary_featured_image, is_public}} = this.props;
        return <div>
            <SelectImage title="Featured image" {...featured_image} media={featured_image.value}/>
            <SelectImagePopover title="Secondary featured image" {...secondary_featured_image} media={secondary_featured_image.value}/>
            <div className="clearfix"/>
            <Switch checked={is_public.value} label="Public" {...is_public}/>
            <Checkbox checked={this.state.checked} label="Public" onChange={this.handleCheckbox}/>
            <Button className="btn-red fill"><Icon name="trash" bluePrintIcon/>Trash post</Button>
        </div>
    }

    render() {
        const {isLoading} = this.props;
        return (
            <CenterPaddingBox>
                <Flex alignItems="center" justifyContent="space-between" marginBottom={10}>
                    <Title element="h2" styleColor="black-white" fontWeight={400}>
                        <Icon name="note"/> Create new post
                    </Title>
                    <Button tooltip={{tooltip: 'Save your post'}} className="btn-default fill">Save your post</Button>
                </Flex>
                <Box>
                    {isLoading && <SpinnerOverlay backgroundColor={"#fff"}/>}
                    <Row>
                        <Col md={9}>
                            {this.renderMainContent()}
                        </Col>
                        <Col md={3}>
                            {this.renderOptions()}
                        </Col>
                    </Row>
                </Box>
            </CenterPaddingBox>
        )
    }
}