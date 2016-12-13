import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {CenterPaddingBox, Box} from 'components/layouts';
import {CardDragSortable} from 'components/form';

const menuItems = [
    {id: 'id',name: 'Good'},
    {id: 'id2',name: 'Good'},
]

const Item = ({id, name}) => {
    return <div>
        {id} vs {name}
    </div>
}

export default class MenuLists extends Component {
    state = {
        menuItems
    }

    @autobind
    handleChange(menuItems){
        this.setState({menuItems});
    }

    render() {
        return <CenterPaddingBox>
            <Box>
                <h4>Good job</h4>
                <CardDragSortable
                    cards={this.state.menuItems}
                    cardComponent={Item}
                    onChange={this.handleChange}
                />
            </Box>
        </CenterPaddingBox>
    }
}
MenuLists.propTypes = {}

