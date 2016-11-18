import React, {PureComponent, PropTypes} from 'react';
import {getStyleFromProps} from '../../../utils/index';

export default class Flex extends PureComponent {
    render() {
        const style = {
            ...getStyleFromProps(['alignItems','justifyContent','flex','flexDirection','flexWrap','marginBottom','marginTop'], this.props),
            display: 'flex'
        }
        return <div style={style}>
            {this.props.children}
        </div>
    }
}

Flex.propTypes = {
    alignItems: PropTypes.oneOf(['center','baseline','flex-start','flex-end']),
    justifyContent: PropTypes.oneOf(['space-between','space-around','flex-start','flex-end']),
    flex: PropTypes.number,
    flexDirection: PropTypes.oneOf(['column','row']),
    flexWrap: PropTypes.oneOf(['wrap','no-wrap','wrap-inverse']),
    marginBottom: PropTypes.number,
    marginTop: PropTypes.number
}

