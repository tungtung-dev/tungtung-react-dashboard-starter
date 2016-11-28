import React, {PureComponent, PropTypes} from 'react';

export default class Column extends PureComponent{
    render(){
        return <div></div>
    }
}

Column.propTypes = {
    header: PropTypes.func.isRequired,
    cell: PropTypes.func,
    checkboxProps: PropTypes.shape({
        keyData: PropTypes.string,
        checkedData: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func
    }),
    pagination: PropTypes.shape({
        page: PropTypes.any,
        item_per_page: PropTypes.number
    }),
    showIndex: PropTypes.bool,
    showCheckbox: PropTypes.bool,
}