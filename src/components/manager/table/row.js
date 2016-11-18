import React, {PureComponent, PropTypes} from 'react';

export default class Row extends PureComponent{
    render(){
        const {cells} = this.props;
        return <tr>
            {cells.map((cell, index) => {
                if (cell.showIndex)
                    return <th scope="row" key={index}>{cell.component}</th>;
                else return <td key={index} style={cell.style} className={cell.className}>{cell.component}</td>;
            })}
        </tr>
    }
}

Row.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.shape({
        showIndex: PropTypes.bool,
        component: PropTypes.func
    }))
}
