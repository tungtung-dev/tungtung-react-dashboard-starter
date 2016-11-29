import {PropTypes} from 'react';

export const COLUMN_PROPTYPES = {
    header: PropTypes.func.isRequired,
    cell: PropTypes.func,
    showIndex: PropTypes.bool,
    pagination: PropTypes.shape({
        page: PropTypes.number,
        itemPerPage: PropTypes.number
    })
}