import React, {PureComponent, PropTypes} from 'react';

export default class Row extends PureComponent{
    renderCellIndexNumber(cell, index){
        return <th scope="row" key={index}>{cell.component}</th>;
    }

    renderCellComponent(cell, index){
        return <td key={index} style={cell.style} className={cell.className}>
            {cell.component}
        </td>
    }

    render(){
        const {cells} = this.props;
        return <tr>
            {cells.map((cell, index) => {
                if (cell.showIndex)
                    return this.renderCellIndexNumber(cell, index);
                return this.renderCellComponent(cell, index);
            })}
        </tr>
    }
}

Row.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({
        showIndex: PropTypes.bool,
        showCheckbox: PropTypes.bool,
        component: PropTypes.any
    })),
    tableProps: PropTypes.object
}
