import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Title, Box, Flex, Icon} from 'components/layouts'
import {InputText, Button, Link} from 'components/form'
import {Collapse} from 'reactstrap';
import {getDeepObject} from 'utils';

export default class Widget extends Component {
    getDefaultState(props) {
        return {
            name: getDeepObject(props, '', 'name'),
            slug: getDeepObject(props, '', 'slug'),
            data: getDeepObject(props, {}, 'data'),
            error: ''
        }
    }

    getConfig() {
        return {
            slug: true,
            name: true
        }
    }

    getIcon(){
        return null;
    }

    getTitle() {
        return 'Widget Menu';
    }

    getEditTitle(){
        return 'Edit Widget Menu';
    }

    constructor() {
        super(...arguments);
        this.state = {
            ...this.getDefaultState(this.props),
        };
        this.config = this.getConfig();
    }


    @autobind
    handleChangeKey(key, e) {
        this.setState({[key]: e.target.value});
    }

    @autobind
    handleChangeData(data) {
        let newState = {
            data
        }
        newState.slug = data.slug;
        if (!this.state.name) {
            newState.name = data.name;
        }
        this.setState(newState);
    }

    @autobind
    toggleForm() {
        if(!this.state.isOpen){
            this.props.onOpen();
        }
        this.setState({isOpen: !this.state.isOpen});
    }

    @autobind
    toggleHide(){
        this.setState({isOpen: false});
    }

    checkValidate(customValidate = () => true) {
        let error = false;
        if(this.config.name && !this.state.name) error = true;
        if(this.config.slug && !this.state.slug) error = true;
        if(!customValidate()){
            error = true;
        }
        if(error){
            this.setState({error: 'Please fill all field'});
            return false;
        }
        return true;
    }

    resetData(customReset = () => {}) {
        if(this.props.isEdit) return ;
        this.setState({
            name: '',
            slug: '',
            data: {},
            error: ''
        });
        customReset();
    }

    handleSubmit() {

    }

    renderFormInput() {
        return <div>
            {this.config.name && <InputText title="Name" value={this.state.name} onChange={this.handleChangeKey.bind(this, 'name')}/>}
            {this.config.slug && <InputText title="Slug" value={this.state.slug} onChange={this.handleChangeKey.bind(this, 'slug')}/>}
        </div>
    }

    renderCustomData() {
        return null;
    }

    render() {
        const {isEdit} = this.props;
        return <Box
            boxShadow={isEdit ? 'none' : ''}
            paddingLeft={25}
            paddingRight={25}
            paddingTop={15}
            paddingBottom={15}
            marginBottom={10}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Title element="h4" fontSize={14} fontWeight={600}>
                    {this.getIcon()} {isEdit ? this.getEditTitle() : this.getTitle()}
                </Title>
                {!isEdit && <Link styleColor="black-white" onClick={this.toggleForm}>
                    <Icon name='caret-down' fontAwesome/>
                </Link>}
            </Flex>
            <Collapse isOpen={isEdit ? isEdit : this.state.isOpen} className="margin-top-10">
                {this.state.error && <p className="tt-text-color-red">
                    {this.state.error}
                </p>}
                {this.renderFormInput()}
                {this.renderCustomData()}
                <Flex alignItems="center" justifyContent="space-between">
                    <Button className="btn-default" onClick={this.handleSubmit}>
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                    {isEdit && <Link to="#" styleColor="red" onClick={this.props.onDelete}>
                        Xóa
                    </Link>}
                </Flex>

            </Collapse>
        </Box>
    }
}

Widget.propTypes = {
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    onOpen: PropTypes.func,
    isEdit: PropTypes.bool
}

