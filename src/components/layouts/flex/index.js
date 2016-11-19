import React, {PureComponent, PropTypes} from 'react';
import {getStyleFromProps} from '../../../utils/index';
import {cleanProps} from '../../../utils/index';

const props_clean = ['alignItems','justifyContent','flex','flexDirection','flexWrap','marginBottom','marginTop'];

export default class Flex extends PureComponent {
    render() {
        const style = {
            ...getStyleFromProps(['alignItems','justifyContent','flex','flexDirection','flexWrap','marginBottom','marginTop','width','height'], this.props),
            display: 'flex'
        }
        return <div {...cleanProps(props_clean, this.props)} style={style}>
            {this.props.children}
        </div>
    }
}

Flex.propTypes = {
    alignItems: PropTypes.oneOf(['center','baseline','flex-start','flex-end']),
    justifyContent: PropTypes.oneOf(['space-between','center','space-around','flex-start','flex-end']),
    flex: PropTypes.number,
    flexDirection: PropTypes.oneOf(['column','row']),
    flexWrap: PropTypes.oneOf(['wrap','no-wrap','wrap-inverse']),
    marginBottom: PropTypes.number,
    marginTop: PropTypes.number,
    width: PropTypes.any,
    height: PropTypes.any
}

