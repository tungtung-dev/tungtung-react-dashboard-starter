import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {reduxForm} from 'redux-form';
import update from 'react/lib/update';
import {convertData} from 'common-helper';
import {CenterPaddingBox, Flex, Box, Row, Col, Title, Icon} from 'components/layouts';
import {InputText, Button} from 'components/form';
import {getDeepObject} from 'utils';
import MenuDragSortable from './menu-drag-sortable';
import MenuWidget from '../menu-widget';
import fakeData from './fakeData';
import "./style.scss";

const fields = ['name', 'key', 'description', 'data'];
const form = {
    form: 'menuSortableForm',
    fields
}

@reduxForm(form)
export default class MenuSortableManager extends Component {
    @autobind
    handleAddMenu(menuData) {
        const {data} = this.props.fields;
        data.onChange(update(getDeepObject(data, [], 'value'), {
            $push: [menuData]
        }));
    }

    @autobind
    onSubmit(values, dispatch) {
        const menuData = convertData(values, {
            name: {$get: true},
            description: {$get: true},
            key: {$get: true},
            data: {
                $get: true, $default: []
            }
        });
        this.props.onSave(menuData, dispatch);
    }

    renderFormDescription() {
        const {fields: {name, key, description}, handleSubmit} = this.props;
        return <Flex alignItems="center" justifyContent="space-between">
            <InputText marginRight={10} title="Name" size="lg" placeholder="Name your menu" {...name}/>
            <InputText marginRight={10} title="Key" size="lg" placeholder="Key unique" {...key}/>
            <InputText marginRight={10} title="Desciption" size="lg" placeholder="Description" {...description}/>
            <div>
                <Button onClick={handleSubmit(this.onSubmit)} className="btn-default btn-lg">Save</Button>
            </div>
        </Flex>
    }

    render() {
        return <CenterPaddingBox>
            {this.renderFormDescription()}
            <Row>
                <Col md={4}>
                    <MenuWidget onSubmit={this.handleAddMenu}/>
                </Col>
                <Col md={8}>
                    <Box>
                        <MenuDragSortable
                            treeData={this.props.fields.data.value}
                            onChange={this.props.fields.data.onChange}
                        />
                    </Box>
                </Col>
            </Row>
            <div></div>
        </CenterPaddingBox>
    }
}
MenuSortableManager.propTypes = {}

