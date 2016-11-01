import React, {Component} from 'react';
import {findWithRegex, cleanRegex} from '../utils';
const HANDLE_YOUTUBE = /(\+\+)(.*)(\+\+)/g;

function handleYoutube(contentBlock, callback) {
    findWithRegex(HANDLE_YOUTUBE, contentBlock, callback);
}

const Youtube = (props) => (
    <span className="text-red">{props.children}</span>
)

class YoutubeView extends Component{
    shouldComponentUpdate(prevProps){
        return (this.props.children[0].props.text !== prevProps.children[0].props.text);
    }

    render() {
        let youtube_embed = `https://www.youtube.com/embed/${cleanRegex(this.props.children[0].props.text, '++')}`;
        return <center><iframe width="80%" height="315" src={youtube_embed} frameBorder="0" allowFullScreen=""/></center>
    }
}

export default {
    edit:{
        strategy: handleYoutube,
        component: Youtube
    },
    read: {
        strategy: handleYoutube,
        component: YoutubeView
    }
}