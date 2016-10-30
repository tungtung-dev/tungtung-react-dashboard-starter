import React, {Component, PropTypes} from 'react';
import {Table} from 'reactstrap';
import Equal from 'deep-equal';
import {COLUMN_PROPTYPES} from './proptypes';

export default class Row extends Component {
    static propTypes = {
        cells: PropTypes.arrayOf(PropTypes.shape({
            showIndex: PropTypes.bool,
            component: PropTypes.func
        }))
    }

    render(){
        const {cells} = this.props;
        return <tr>
            {cells.map((cell, index) => {
                if(cell.showIndex)
                    return <th scope="row" key={index}>{cell.component}</th>;
                else return <td key={index}>{cell.component}</td>;
            })}
        </tr>
    }
}
