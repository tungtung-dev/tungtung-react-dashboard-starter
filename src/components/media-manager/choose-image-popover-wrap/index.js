import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {autobind} from 'core-decorators';
import Equal from 'deep-equal';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import classnames from 'classnames';
import MediaManager from '../manager_default';
import {Toaster} from '../../layouts';
import "./style.scss";

const Div = ({children, className}) => <div className={className}>{children}</div>
const Span = ({children, className}) => <span className={className}>{children}</span>

export default class ChooseImageWrap extends Component {
    static propTypes = {
        element: PropTypes.oneOf(['div','span']),
        addAlertToast: PropTypes.func,
        onChoose: PropTypes.func,
    }

    state = {
        showFoldersSidebar: false
    }

    shouldComponentUpdate(prevProps, prevState){
        return !Equal(prevProps, this.props) || !Equal(this.state, prevState);
    }

    @autobind
    toggleShowFoldersSidebar(){
        this.setState({showFoldersSidebar: !this.state.showFoldersSidebar});
    }

    @autobind
    chooseMedia(media){
        if(!media.type.match('image/*')){
            Toaster.show({ message: "Invalid image", timeout: 5000, intent: 3});
        }
        else{
            this.props.onChoose(media);
            findDOMNode(this.refs.dismiss).click();
        }
    }

    getWrap(){
        switch (this.props.element){
            case 'span': return Span;
            default: return Div;
        }
    }

    renderToggleFolderSidebar(){
        return <button className="btn btn-transparent" onClick={this.toggleShowFoldersSidebar}>
            <i className={this.state.showFoldersSidebar ? 'fa fa-close' : 'fa fa-folder'}/> {this.state.showFoldersSidebar ? 'Hide' : 'Show'} Folders
        </button>
    }

    renderMediaManager(){
        return <div className="media-manager-popover-container">
            <MediaManager onChooseMedia={this.chooseMedia} customToolbar={this.renderToggleFolderSidebar()}/>
        </div>
    }

    render() {
        const Wrap = this.getWrap();
        return <Wrap className={this.props.className}>
            <button ref="dismiss" className="pt-popover-dismiss" style={{display: 'none'}}>Dissmiss</button>
            <Popover
                content={this.renderMediaManager()}
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName={classnames('pt-popover-content-sizing media-manager-popover',{'show-folder-sidebars': this.state.showFoldersSidebar})}
                position={Position.BOTTOM}
                useSmartPositioning={false}
            >
                {this.props.children}
            </Popover>
        </Wrap>
    }
}