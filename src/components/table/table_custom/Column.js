import React, {Component, PropTypes} from 'react';

export default class Column extends Component {
    render() {
        return <div>

        </div>
    }
}

Column.propTypes = {
    header: PropTypes.func.isRequired,
    cell: PropTypes.func,
    showIndex: PropTypes.bool,
    pagination: PropTypes.shape({
        page: PropTypes.number,
        item_per_page: PropTypes.number
    })
}