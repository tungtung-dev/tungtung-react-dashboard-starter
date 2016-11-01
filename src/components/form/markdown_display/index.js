import React, {Component, PropTypes} from 'react';
import marked from '../../../utils/marked';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    emoji: true
});

export default class MarkdownDisplay extends Component{
    render(){
        return <div dangerouslySetInnerHTML={{__html: marked(this.props.content)}} className={this.props.className}/>
    }
}
MarkdownDisplay.propTypes = {
    content: PropTypes.string
}

