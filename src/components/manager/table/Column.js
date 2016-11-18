import React, {PureComponent, PropTypes} from 'react';

export default class Column extends PureComponent{
    render(){
        return <div></div>
    }
}

Column.propTypes = {
    header: PropTypes.func.isRequired,
    cell: PropTypes.func,
    pagination: PropTypes.shape({
        page: PropTypes.number,
        item_per_page: PropTypes.number
    }),
    showIndex: PropTypes.bool
}