/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';
import emojione from 'emojione';
if(!process.env.SERVER_RENDER){
    require('./style.scss');
}

emojione.imageType = 'svg';
emojione.sprites = true;
emojione.imagePathSVGSprites = '/svg/emojione.sprites.svg';

var encodedStr = (rawStr) => {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
}

export default class EmojioneDisplay extends PureComponent {
    render() {
        const {content} = this.props;
        return (
            <div className={`emojione-paragraph ${this.props.className}`} dangerouslySetInnerHTML={{__html: emojione.toImage(encodedStr(content))}}/>
        )
    }
}

EmojioneDisplay.propTypes = {
    content: PropTypes.string
}
