import React, {Component, PropTypes} from 'react';
import classname from 'classnames';
import './style.scss';

/**
 * Examples
 * Tất cả | Đang xử lý | Đã đặt hàng |
 */
export default class NavbarFilter extends Component {
    constructor() {
        super(...arguments);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e, status_id) {
        e.preventDefault();
        this.props.onChange(status_id);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value || nextProps.filters !== this.props.filters) {
            return true;
        }
        return false;
    }

    render() {
        const {value, filters} = this.props;
        return (
            <ul className="navbar-statuses-filter clearfix">
                <li className={classname({'active': 'all' === value})}>
                    <a onClick={e => this.onClick(e, 'all')}>
                        <span><i className="fa fa-circle" style={{color: '#d35400'}}/> Tất cả</span>
                    </a>
                </li>
                {filters.map((filter, index) =>
                    <li key={index} className={classname({'active': filter.value === value})}>
                        <a onClick={(e) => this.onClick(e, filter.value)}>
                            <span><i className={filter.icon} style={{color: filter.color}}/>{' '} {filter.text}</span>
                        </a>
                    </li>
                )}
            </ul>
        )
    }
}

NavbarFilter.propTypes = {
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}
