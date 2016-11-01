/* eslint-disable */
import React,{Component} from 'react';
import {findWithRegex} from '../utils';
import KatexInline from '../../../katex/KatexInline';
import $ from 'jquery';
import classnames from 'classnames';

export const HANDLE_LATEX = /\m:(.*?):/g;

function handleLatex(contentBlock, callback) {
    findWithRegex(HANDLE_LATEX, contentBlock, callback);
}

export class Latex extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isShow: false,
            action: '',
        }
        this._handleMouseHover = this._handleMouseHover.bind(this);
        this._handleMouseOut = this._handleMouseOut.bind(this);
        this.timeoutShow = ()=> {};
    }

    _handleMouseHover(e) {
        this.setState({isShow: true, action: 'hover'});
        this.updateBoxReviewWithComponent(e);
    }

    _handleMouseOut() {
        this.setState({isShow: false, action: ''});
    }

    toTexNormal(tex) {
        if(tex && tex[0] === 'm') return tex.slice(2, tex.length - 1);
        else if(tex && tex[0] === '$') return tex.slice(1, tex.length - 1);
        return '';
    }

    updateBoxReview() {
        const box = $(this.refs.strategy).find('.box-overreview');
        const height = box.height();
        box.css('top', -(height + 10));
    }

    updateBoxReviewWithComponent(e) {
        const box = $(e.target).closest('.katex-strategy').find('.box-overreview');
        const height = box.height();
        box.css('top', -(height + 10));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.children[0].props.text !== this.props.children[0].props.text) {
            this.setState({isShow: true});
            this.updateBoxReview();
            clearTimeout(this.timeoutShow);
        }
        else if (this.state.isShow && this.state.action !== 'hover') {
            this.timeoutShow = setTimeout(()=> {
                this.setState({isShow: false});
            }, 1500);
        }
    }

    render() {
        let tex = this.props.children[0].props.text;
        return <a href='#' ref="strategy" className="katex-strategy" onMouseOver={this._handleMouseHover}
                  onMouseOut={this._handleMouseOut}>
            {this.props.children}
            <span ref="box_overeview" className={classnames('box-overreview',{active: this.state.isShow})}>
                <KatexInline tex={this.toTexNormal(tex)}/>
            </span>
        </a>
    }
}

export const LatexView = (props) => {
    const cleanRegex = (tex) => {
        if(tex && tex[0] === 'm') return tex.slice(2, tex.length - 1);
        else if(tex && tex[0] === '$') return tex.slice(1, tex.length - 1);
        return '';
    }
    return <KatexInline tex={cleanRegex(props.children[0].props.text)}/>
}

export default {
    edit:{
        strategy: handleLatex,
        component: Latex
    },
    read: {
        strategy: handleLatex,
        component: LatexView
    }
}